export const token = "<Generated-from-dashbaord>";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

import axios from 'axios';

const API_BASE_URL = 'https://chat-server-steel-phi.vercel.app'; // Replace with your server URL

export const savePushToken = async (token, userId) => {
  try {
    await axios.post(`${API_BASE_URL}/api/save-push-token`, {
      token,
      userId
    });
    console.log('Push token saved successfully');
  } catch (error) {
    console.error('Error saving push token:', error);
  }
};

export const sendPushNotification = async (recipientId, title, body, data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/send-notification`, {
      recipientId,
      title,
      body,
      data
    },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer your-server-key-if-needed' // Add if required
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};