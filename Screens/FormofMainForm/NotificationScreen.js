import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

import firebase from "firebase/compat/app";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Updates from 'expo-updates';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function registerForPushNotificationsAsync() {
  let token, user;
  if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
      }
      if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
      }


      user = firebase.auth().currentUser;
      token = (await Notifications.getExpoPushTokenAsync()).data;
      if (user !== null) {
          firebase
              .firestore()
              .collection("UsersToken")
              .doc(user.uid)
              .set({
                  UID: user.uid,
                  email: user.email,
                  token: token,
              })
              .then(function () {
                  console.log("Reg token thành công: ", user.email)
              });
      }

      AsyncStorage.getItem('userData').then((user_data_json) => {
          let user = user_data_json;
          firebase.firestore()
              .collection("Users")
              .doc(user)
              .update({
                  token: token
              }).then(function () {
              });
      })
  } else {
      alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
      });
  }

  return token;
}
const HandleAutoUpdate = async () => {
  try {

      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // ... thông báo cho người dùng về bản cập nhật ...
          await Updates.reloadAsync();
      } else {
          // No Update Available...
      }
      console.log("Done!");
  } catch (e) {
      // xử lí lỗi.
      // thường thì sẽ vào đây khi ứng dụng không thể kết nối đến internet.
  }
};


function NotificationScreen() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    useEffect(() => {
        console.log("Checking for update...");
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            HandleAutoUpdate();
        };

    }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification!</Text>
      </View>
    );
  }

export default NotificationScreen;