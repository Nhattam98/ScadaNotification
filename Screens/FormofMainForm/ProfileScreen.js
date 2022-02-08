import {
  Button,
  Center,
  NativeBaseProvider,
  Box,
  Stack,
  HStack,
  useToast,
  VStack,
  Text,
  Heading,
  Input,
  TextArea,
  Divider,
  ScrollView,
  AlertDialog,
} from "native-base";
import {
  Alert, KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard, Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import * as Updates from 'expo-updates';

import * as Device from 'expo-device';

const ProfileScreen = ({ navigation }) => {
  const [user, setuser] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setfeedback] = useState('')
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem("userData").then((user_data_json) => {
        let user =
          firebase.auth().currentUser?.email == null
            ? user_data_json
            : firebase.auth().currentUser?.email;
        setuser(user);
        // console.log("User: ", user);

      });
    });
  }, []);

  const HandleSignOut = () => {
    Alert.alert(
      "Warning!!",
      "Want to Sign Out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () =>
            AsyncStorage.removeItem('userData').then(() => {
              firebase.firestore()
                .collection("onlineUsers")
                .doc(firebase.auth().currentUser?.email)
                .delete().then(() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      navigation.replace("Login");
                    })
                    .catch((error) => alert(error.message));
                });
            })
        }
      ]
    );
  }
  function HandleFeedback() {
    const osVersion = Device.osVersion;
    var datetime = new Date().toLocaleString();
    firebase.firestore()
      .collection("Feedbacks")
      .doc()
      .set({
        email: user,
        device: osVersion,
        content: JSON.stringify(feedback),
        fb_date: datetime

      }).then(text => {
        setfeedback('');
        onClose();
      });
  }


  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : undefined}
        style={{
          flex: 1
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <VStack>
              <Center py="2">
                <Box
                  maxW="100%"
                  w="95%"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                >
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        👋 Hi, {user}
                      </Heading>
                    </Stack>
                    <Text fontWeight="400" _light={{
                      color: "blue.600"
                    }}>
                      Press the <Text bold>Sign Out</Text> Button to Sign Out.
                    </Text>
                    <Text italic _light={{
                      color: "red.600"
                    }}>
                      After you sign out, you will no longer receive notifications.
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                      <HStack alignItems="center">
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          fontWeight="400"
                        >
                        </Text>
                      </HStack>
                      <Button backgroundColor="gray.300" w="50%" size="lg" onPress={HandleSignOut}>
                        Sign Out
                      </Button>
                    </HStack>
                  </Stack>
                </Box>
              </Center>
              <Center py="2">
                <Box
                  maxWw="100%"
                  w="95%"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                >
                  <VStack space={3} p="4">
                    <Text>Your Feedback</Text>
                    <TextArea
                      w={{
                        base: "95%",
                      }}
                      value={feedback}
                      onChangeText={setfeedback}
                    />
                    <HStack direction="row-reverse"><Button bgColor="error.500" onPress={() => setIsOpen(!isOpen)}>Send</Button>
                    </HStack>

                  </VStack>
                </Box>
              </Center>
            </VStack>
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Thank you!</AlertDialog.Header>
                <AlertDialog.Body>
                  Thank you so much for your prompt and detailed feedback. I wasn't aware of this issue and I'm very grateful that you brought it to my attention. Now, I'll be able to make the needed adjustments to my workflow and keep track of my progress to become more efficient overall.
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="unstyled"
                      colorScheme="coolGray"
                      onPress={onClose}
                      ref={cancelRef}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="success" onPress={HandleFeedback}>
                      Send
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </NativeBaseProvider>
  );
};

export default ProfileScreen;
