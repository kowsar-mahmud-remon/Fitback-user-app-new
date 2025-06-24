import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Dimensions, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, StatusBar, Pressable, Text, ScrollView, TextInput, Image, Linking,
  Button,
  TouchableOpacity, Alert, AppState
} from 'react-native';

import colors from '../config/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// Add these imports at the top
import * as Notifications from 'expo-notifications';

import {
  collection,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import { UserContext } from '../../components/CredintailsContext';

import AntDesign from '@expo/vector-icons/AntDesign';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserChat({ navigation, route }) {
  const { testCredentials, setTestCredentials } = useContext(UserContext);

  const [lan, setLan] = useState(true);
  const [userDetails, setUserDetails] = useState("");

  const userName = route.params.userName;
  const user_FUId = route.params.user_FUId;
  const image = route.params.image;

  // Chat states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const conversationId = user_FUId;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const scrollViewRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const messageRefs = useRef([]);

  // console.log("userChatData", userName, user_FUId, image);

  const loadData = async () => {
    try {
      const allData = await AsyncStorage.getItem("healthTrackingData");

      if (allData !== null) {
        setUserDetails(JSON.parse(allData));
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };


  useEffect(() => {
    loadData();
  }, [route.params]);


  // Handle notifications setup
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted for notifications');
      }
    };
    setupNotifications();
  }, []);

  // Improved message listener with proper notification handling
  useEffect(() => {
    let previousMessagesLength = 0;
    let isMounted = true;

    const unsubscribe = onSnapshot(
      doc(db, "conversations", conversationId),
      (docSnapshot) => {
        if (!isMounted) return;

        if (docSnapshot.exists()) {
          const newMessages = docSnapshot.data().messages || [];
          const pinnedMsgs = docSnapshot.data().pinnedMessages || [];

          // Update states
          setMessages(newMessages);
          setPinnedMessages(pinnedMsgs);

          // Notification logic
          if (newMessages.length > previousMessagesLength) {
            const lastMessage = newMessages[newMessages.length - 1];

            // Only notify if:
            // 1. Message is from other user
            // 2. App is in background
            // 3. Message isn't already seen
            if (lastMessage.senderId !== user_FUId &&
              AppState.currentState !== 'active' &&
              !lastMessage.seen) {
              showNotification(lastMessage);
            }
          }

          previousMessagesLength = newMessages.length;
        } else {
          console.error("Conversation does not exist.");
        }
      },
      (error) => {
        console.error("Error fetching messages: ", error);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [conversationId, user_FUId]);

  const showNotification = async (message) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${message.senderName}`,
          body: message.text || (message.fileUrl ? "Sent an attachment" : "New message"),
          data: {
            conversationId,
            userName,
            user_FUId,
            image
          },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          threadId: `chat_${conversationId}` // Prevent notification grouping
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  };


  // Add this function to show notifications
  const showLocalNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `New message from ${message.senderName}`,
        body: message.text || "Sent an attachment",
        data: {
          conversationId,
          userName: message.senderName,
          user_FUId: message.senderId,
          image: message.senderImg
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Send immediately
    });
  };

  useEffect(() => {
    const markMessagesAsSeen = async () => {
      try {
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationSnap = await getDoc(conversationRef);

        if (conversationSnap.exists()) {
          const messages = conversationSnap.data().messages || [];

          // Filter messages that are from the other user and not seen
          console.log("testCredentials?.user_FUId", testCredentials?.user_FUId);

          const messagesToUpdate = messages.filter(
            msg => msg.senderId !== testCredentials?.user_FUId && !msg.seen
          );

          console.log("messagesToUpdatemessagesToUpdate", messagesToUpdate);

          if (messagesToUpdate.length > 0) {
            // Update all unseen messages from the other user
            const updatedMessages = messages.map(msg => {
              if (msg.senderId !== testCredentials?.user_FUId && !msg.seen) {
                return { ...msg, seen: true };
              }
              return msg;
            });

            await updateDoc(conversationRef, {
              messages: updatedMessages
            });
          }
        }
      } catch (error) {
        console.error("Error marking messages as seen:", error);
      }
    };

    // Mark messages as seen when component mounts
    markMessagesAsSeen();

    // Also mark messages as seen when app comes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        markMessagesAsSeen();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [conversationId, user_FUId]);

  const sendMessage = async (fileUrl = null, fileType = null) => {
    if (newMessage.trim() === "" && !fileUrl) return;

    setIsSending(true); // Start sending

    const messageData = {
      senderId: user_FUId,
      senderName: userName,
      senderImg: image,
      // text: newMessage || (fileUrl ? "Sent an image/file" : ""),
      text: newMessage || (fileUrl ? "" : ""),
      fileUrl: fileUrl || null,
      fileType: fileType || null,
      time: Timestamp.now(),

      // for seen message
      seen: false,
    };


    try {
      const conversationRef = doc(db, "conversations", conversationId);
      const conversationSnapshot = await getDoc(conversationRef);

      if (conversationSnapshot.exists()) {
        const conversationData = conversationSnapshot.data();
        const updatedMessages = [...conversationData.messages, messageData];

        await updateDoc(conversationRef, {
          messages: updatedMessages,
          lastMessageTimestamp: serverTimestamp(),
        });
      } else {
        await updateDoc(conversationRef, {
          messages: arrayUnion(messageData),
          lastMessageTimestamp: serverTimestamp(),
        });
      }

      setNewMessage("");
      setFile(null);
      setFilePreview(null); // Clear the file preview after sending
      setSelectedPreview(null); // Clear the file preview after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
    finally {
      setIsSending(false); // End sending
    }
  };

  const handleFileUpload = async () => {
    if (!selectedPreview || !file) {
      await sendMessage();
      return;
    }

    setIsSending(true);


    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(
            "Uploading: ",
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.error("Upload error: ", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await sendMessage(downloadURL, file.type); // Send the message with file URL
        }
      );
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handlePickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];

        setFile({
          uri: pickedFile.uri,
          name: pickedFile.name || "file",
          type: pickedFile.mimeType || "application/octet-stream",
        });

        setSelectedPreview({
          uri: pickedFile.uri,
          name: pickedFile.name,
          type: pickedFile.mimeType,
        });

      } else {
        console.error("File pick was not successful:", result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const formatTime = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    }
    return "";
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);


  const handleCallPress = () => {
    Alert.alert(
      "Do you want to call Hotline?",
      "01521525803",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            Linking.openURL("tel:01521525803");
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Fetch and listen to the pinned message in Firestore
  // State to hold pinned messages
  // const [pinnedMessages, setPinnedMessages] = useState([]);

  // Fetch and listen to pinned messages in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "conversations", conversationId), (doc) => {
      if (doc.exists()) {
        setPinnedMessages(doc.data().pinnedMessages || []); // Default to an empty array if no pinnedMessages exist
      }
    });

    return () => unsubscribe();
  }, [conversationId]);

  const showPinMenu = (msg) => {
    setSelectedMessage(msg);
    setIsModalVisibleTwo(true);
  };

  const pinMessage = () => {
    if (selectedMessage) {
      handlePinMessage(selectedMessage); // Pin the selected message
      setIsModalVisibleTwo(false); // Close the modal
    }
  };

  const handlePinMessage = async (msg) => {
    try {
      const chatDocRef = doc(db, "conversations", conversationId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (chatDocSnap.exists()) {
        const existingPinnedMessages = chatDocSnap.data().pinnedMessages || [];

        // Check if the message is already pinned
        const isAlreadyPinned = existingPinnedMessages.some(
          (pinnedMsg) => pinnedMsg.time.seconds === msg.time.seconds && pinnedMsg.senderId === msg.senderId
        );

        if (!isAlreadyPinned) {
          await updateDoc(chatDocRef, {
            pinnedMessages: arrayUnion(msg), // Add the message to the array
          });
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error pinning the message: ", error);
    }
  };

  // unpinned message 
  const handleUnpinMessage = async (msg) => {
    try {
      const chatDocRef = doc(db, "conversations", conversationId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (chatDocSnap.exists()) {
        const existingPinnedMessages = chatDocSnap.data().pinnedMessages || [];

        // Filter out the message to be removed
        const updatedPinnedMessages = existingPinnedMessages.filter(
          (pinnedMsg) =>
            !(pinnedMsg.time.seconds === msg.time.seconds && pinnedMsg.senderId === msg.senderId)
        );

        // Update Firestore with the new array
        await updateDoc(chatDocRef, {
          pinnedMessages: updatedPinnedMessages,
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error unpinning the message: ", error);
    }
  };

  // const messageRefs = useRef([]);

  const handleScrollToMessage = (msg) => {
    const index = messages.findIndex(
      (message) =>
        message.time.seconds === msg.time.seconds &&
        message.senderId === msg.senderId
    );

    if (index !== -1 && messageRefs.current[index]) {
      messageRefs.current[index].measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

  // const [searchText, setSearchText] = useState("");

  const filteredMessages = messages.filter((msg) =>
    msg.text?.toLowerCase().includes(searchText.toLowerCase())
  );


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        <>
          <StatusBar
            animated={true}
            backgroundColor="#000066"
          // barStyle={statusBarStyle}

          />
          <View style={[styles.navbar1]}>


            <View style={{ width: '100%', height: 30, top: 8, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }} >

              <Pressable style={{ width: 22, height: 22, right: 20, marginTop: 6 }} onPress={() => handleCallPress()} >
                {/* <Image
                  style={{ width: 22, height: 22, left: 0, top: 2 }}
                  resizeMode='contain'
                  source={require('../assets/search.jpg')}
                /> */}
                <Ionicons name="call" size={20} color="#EE426D" />
              </Pressable>

              <Pressable style={{
                width: 22, height: 22, right: 0,
                // display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0 ? 'flex' : 'none' 
              }} onPress={() => navigation.navigate("DietitianProfile", {})} >
                <Image
                  style={{ width: 30, height: 30, left: 0 }}
                  resizeMode='contain'
                  source={require('../assets/fitback/profileIcon.png')}
                />
              </Pressable>

              {/* <Pressable style={{ width: 20, height: 20, left: 15 }} onPress={() => navigation.toggleDrawer()} >
                <Image
                  style={{ width: 20, height: 20, left: 0, top: 3 }}
                  resizeMode='contain'
                  source={require('../assets/more.jpg')}
                />
              </Pressable> */}

            </View>

          </View>

        </>
      ),
    });
  }, [navigation]);


  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>

      <View style={styles.MainContainer}>
        <StatusBar
          animated={true}
          backgroundColor="#303030"
        // barStyle={statusBarStyle}

        />
        <View style={[styles.navbar, { flexDirection: 'row' }]}>

          <Pressable activeOpacity={4} style={{ width: '5%', height: 25, left: 15, top: 17, borderWidth: 0 }}
            onPress={() => navigation.navigate("Homepage", {})}
          >
            <Image
              style={{ width: 17, height: 17, left: 0, top: 3 }}
              resizeMode='contain'
              source={require('../assets/back.jpg')}
            />
          </Pressable>

          <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', left: 10 }}>

            <Text style={{ top: 17, color: colors.black, fontSize: 14, display: lan ? 'none' : 'flex' }} >  বিস্তারিত</Text>

            <Text style={{ left: 10, top: 17, color: colors.black, fontSize: 14, display: lan ? 'flex' : 'none', letterSpacing: .9, fontFamily: 'Poppins_400Regular' }} >  User Chat </Text>

          </View>



        </View>


        <View style={[styles.body1]}>
          {/* <ScrollView > */}



          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search messages..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            {pinnedMessages.length > 0 && (
              <View style={styles.pinnedMessages}>
                <Text style={{ fontWeight: "bold" }}>Pinned Messages:</Text>
                {pinnedMessages.map((message, index) => (
                  <TouchableOpacity onPress={() => handleScrollToMessage(message)} key={index} style={styles.pinnedMessage}>
                    {
                      !message.fileUrl && <Text>📌 {message.text}</Text>
                    }
                    {/* {message.senderName && (
                      <Text style={{ fontStyle: "italic" }}>From: {message.senderName}</Text>
                    )} */}
                    {/* Remove icon */}
                    {/* Display file preview */}
                    {message.fileUrl && (
                      message.fileType && message.fileType.startsWith("image/") ? (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        // onPress={() => {
                        //   setSelectedImage(message.fileUrl);
                        //   setIsModalVisible(true);
                        // }}
                        >
                          <Text>📌 </Text>
                          <Image
                            source={{ uri: message.fileUrl }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}
                            resizeMode="cover"
                          />
                        </View>
                      ) : (
                        <Text
                          onPress={() => Linking.openURL(message.fileUrl)}
                          style={{
                            color: "blue",
                            textDecorationLine: "underline",
                          }}
                        >
                          View File
                        </Text>
                      )
                    )}

                    <TouchableOpacity
                      onPress={() => handleUnpinMessage(message)}
                      style={styles.removeIcon}
                    >
                      <AntDesign name="closecircle" size={20} color="silver" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* {pinnedMessage && (
              <View style={styles.pinnedMessage}>
                <Text>Pinned Message: {pinnedMessage.text}</Text>
              </View>
            )} */}

            <ScrollView style={styles.messageContainer}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
              {(searchText ? filteredMessages : messages)?.map((msg, index) => (
                <TouchableOpacity
                  key={index}
                  // onLongPress={() => handlePinMessage(msg)} // Call handlePinMessage with the message ID
                  onLongPress={() => showPinMenu(msg)}
                  ref={(el) => (messageRefs.current[index] = el)}
                  style={[
                    styles.message,
                    { alignItems: msg?.senderId === user_FUId ? "flex-end" : "flex-start" },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* User image or placeholder */}
                    {msg?.senderImg ? (
                      <Image
                        style={{
                          width: 28,
                          height: 28,
                          marginRight: 8,
                          borderRadius: 50,
                          display: msg?.senderId === user_FUId ? "none" : "flex",
                        }}
                        resizeMode="contain"
                        source={{ uri: msg?.senderImg }}
                      />
                    ) : (
                      <AntDesign
                        style={{
                          marginRight: 8,
                          display: msg?.senderId === user_FUId ? "none" : "flex",
                          backgroundColor: "silver",
                          padding: 4,
                          borderRadius: 50,
                        }}
                        name="user"
                        size={24}
                        color="white"
                      />
                    )}

                    <View
                      style={{
                        alignItems: msg?.senderId === user_FUId ? "flex-end" : "flex-start",
                      }}
                    >
                      {/* <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13 }}>
                        {msg.text}
                      </Text> */}

                      {
                        msg.text && <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13 }}>
                          {msg.text}
                        </Text>
                      }


                      {/* Display file preview */}
                      {msg.fileUrl && (
                        msg.fileType && msg.fileType.startsWith("image/") ? (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedImage(msg.fileUrl);
                              setIsModalVisible(true);
                            }}
                          >
                            <Image
                              source={{ uri: msg.fileUrl }}
                              style={{
                                width: 150,
                                height: 150,
                                borderRadius: 5,
                                marginVertical: 5,
                              }}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        ) : (
                          <Text
                            onPress={() => Linking.openURL(msg.fileUrl)}
                            style={{
                              color: "blue",
                              textDecorationLine: "underline",
                            }}
                          >
                            View File
                          </Text>
                        )
                      )}

                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          color: "gray",
                          fontSize: 10,
                        }}
                      >
                        {formatTime(msg.time)}
                      </Text>

                      {msg?.senderId === user_FUId && (
                        <Text style={{
                          marginLeft: 5,
                          color: msg.seen ? "blue" : 'gray',
                          fontSize: 10
                        }}>
                          {msg.seen ? '✓✓' : '✓'}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}


              {/* {messages?.map((msg, index) => (
                <View key={index} style={[styles.message, { alignItems: msg?.senderId === user_FUId ? "flex-end" : "flex-start" }]}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                      image != null ? <Image
                        style={{ width: 28, height: 28, marginRight: 8, display: msg?.senderId === user_FUId ? "none" : "flex" }}
                        resizeMode="contain"
                        source={{ uri: image }}
                      />
                        :
                        <AntDesign style={{ marginRight: 8, display: msg?.senderId === user_FUId ? "none" : "flex", backgroundColor: "silver", padding: 4, borderRadius: 50 }}
                          name="user" size={24} color="white" />
                    }
                    <View style={{ alignItems: msg?.senderId === user_FUId ? "flex-end" : "flex-start" }}>
                      <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 13 }}>
                        {msg.text}
                      </Text>


                      {msg.fileUrl && (
                        msg.fileType && msg.fileType.startsWith("image/") ? (
                          <TouchableOpacity onPress={() => { setSelectedImage(msg.fileUrl); setIsModalVisible(true); }}>
                            <Image
                              source={{ uri: msg.fileUrl }}
                              style={{ width: 150, height: 150, borderRadius: 5, marginVertical: 5 }}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        ) : (
                          <Text onPress={() => Linking.openURL(msg.fileUrl)} style={{ color: 'blue', textDecorationLine: 'underline' }}>
                            View File
                          </Text>
                        )
                      )}

                      <Text style={{ fontFamily: 'Poppins_400Regular', color: "gray", fontSize: 10 }}>{formatTime(msg.time)}</Text>
                    </View>
                  </View>
                </View>
              ))} */}
            </ScrollView>

            {selectedPreview && (
              <View style={styles.previewContainer}>
                {selectedPreview.type.startsWith("image/") ? (
                  <View style={styles.previewWithClose}>
                    <Image
                      source={{ uri: selectedPreview.uri }}
                      style={styles.imagePreview}
                    />
                    {/* Close Icon */}
                    <TouchableOpacity
                      style={styles.closeIcon}
                      onPress={() => {
                        setSelectedPreview(null);
                        setFile(null);
                      }}
                    >
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.filePreviewContainer}>
                    <Text style={styles.fileName}>{selectedPreview.name}</Text>
                    <TouchableOpacity
                      style={styles.closeIcon}
                      onPress={() => setSelectedPreview(null)} // Deselect the file
                    >
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}


            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", paddingHorizontal: 4 }}>
              <Pressable onPress={handlePickFile}>
                <Image
                  style={{ width: 28, height: 28, marginBottom: 6 }}
                  resizeMode="contain"
                  source={require('../assets/fitback/fileIcon.png')}
                />
              </Pressable>
              <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Send a message"
                multiline={true} // Enables multiple lines
              // numberOfLines={4}
              />


              {isSending ? <ActivityIndicator size="small" color="#0000ff" />
                : <TouchableOpacity onPress={handleFileUpload} style={{ opacity: isSending ? 0.5 : 1, marginBottom: 10 }}>
                  <Ionicons
                    name="send"
                    size={24}
                    color="#7A7A7A" // Change color based on sending state
                  />
                </TouchableOpacity>
              }

            </View>
          </View>


          {/* </ScrollView> */}

        </View>


        {/* modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: '90%', height: '80%' }}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              onPress={() => Linking.openURL(selectedImage)}
              style={{ position: 'absolute', bottom: 30 }}
            >
              <Text style={{ color: 'white', fontSize: 16, textDecorationLine: 'underline', backgroundColor: "green", paddingVertical: 2, paddingHorizontal: 8, borderRadius: 4 }}>Download Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{ position: 'absolute', top: 30, right: 30 }}
            >
              <Ionicons style={{ backgroundColor: "#EE416C", borderRadius: 4 }} name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>


        {/* Modal for Pin Options */}
        <Modal
          visible={isModalVisibleTwo}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisibleTwo(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <Text style={styles.modalText}>Do you want to pin this message?</Text> */}

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "gray" }]}
                onPress={() => setIsModalVisibleTwo(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={pinMessage}>
                <Text style={styles.modalButtonText}>Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: colors.body,
    justifyContent: "center",
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  footerStyle: {
    height: '8%',
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 6,
  },


  tuchabluebuttonf: {
    width: "20%",
    height: '100%',
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: 'center',
  },

  navbar: {

    backgroundColor: colors.white,
    width: '100%',
    height: 55,

    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,


  },
  navbar1: {

    backgroundColor: colors.white,
    width: '60%',
    height: 40,
    left: 50,
  },

  ImgContainer: {

    width: 300,
    height: 250,

  },

  tuchabluebutton: {
    // paddingTop:20,
    width: "55%",
    height: 35,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: 'center',
    top: 20

  },
  navbarbutton: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textstyle: {
    color: '#FFF',
    fontSize: 14,
  },
  textstyle1: {
    color: colors.blacktext,
    fontSize: 12,
    //fontFamily:'Nunito',
  },
  body1: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center',
    width: '100%',
    height: '100%',


  },
  searchview: {
    width: '100%',
    height: 50,
    top: 3,
    justifyContent: "center",
    alignItems: 'center',

  },

  input: {
    width: "94%",
    height: 40,
    borderColor: colors.ash1,
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    //padding:5,
    paddingLeft: 45,
    borderRadius: 3,
    paddingRight: 30,
    fontSize: 12,

  },
  adds: {
    width: "100%",
    height: 240,

    borderColor: colors.ash1,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.white,

  },
  addsImg: {
    width: '100%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: '100%',
  },
  addstext: {
    width: '100%',
    height: 115,

  },
  adds1: {
    width: 156,
    height: 187,

    borderColor: colors.ash1,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.white,

  },
  addsImg1: {
    width: 156,
    // borderTopEndRadius:4,
    borderTopLeftRadius: 4,
    height: 104,
  },
  addstext1: {
    width: 149,
    height: 83,

  },
  flatdetails: {
    paddingLeft: 0,
    width: '100%',
    marginTop: 10
  },
  //////////////////////////////
  /////////////////////////////
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  messageContainer: {
    maxHeight: 1000,
    marginBottom: 10,
  },
  message: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  senderName: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingTop: 11,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
    maxHeight: 100,
    textAlignVertical: "top"

  },
  previewContainer: {
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    color: "black",
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  webview: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
  },
  previewContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  previewWithClose: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  filePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  fileName: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  pinnedMessages: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  pinnedMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 5,
  },
  removeIcon: {
    marginLeft: 10,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  searchInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 12,
  },

  // pin modal 
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#EE416C",
    padding: 8,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 13,
  },

});

export default UserChat;