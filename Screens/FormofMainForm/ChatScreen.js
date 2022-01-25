import { Box } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          token: 'ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    console.log(messages[0]);
    firebase.firestore().collection('chats').add({ _id, createdAt, text, user })
  }, [])


  return (
    <View style={{ flex: 2, marginBottom: 100 }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
         user={{_id: firebase.auth().currentUser?.email}}
      />
    </View>
  );
}
export default ChatScreen;