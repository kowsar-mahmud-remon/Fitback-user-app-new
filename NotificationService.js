import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permissions to send notifications
export async function requestPermissionsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications is not granted!');
  }
}

// Schedule a local notification
export async function scheduleNotification({ title, body, seconds }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      seconds,

      repeats: true,
    },
  });
}
