import React, { useState, useRef, useEffect } from "react";
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
//Import Screen of Main Screen
import HomeScreen from './FormofMainForm/HomeScreen';
import SearchScreen from './FormofMainForm/SearchScreen';
import NotificationScreen from './FormofMainForm/NotificationScreen';
import SettingsScreen from './FormofMainForm/SettingsScreen';
import QRScreen from './FormofMainForm/QRScreen';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Updates from 'expo-updates';
//Image QR
import qr from '../assets/QR.png';
// Font Awesome Icons...
import { FontAwesome5 } from '@expo/vector-icons';
//Firebase
import firebase from "firebase/compat/app";


const Tab = createBottomTabNavigator();

registerForPushNotificationsAsync = async () => {
    let token, user;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync(Permissions.Notifications);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync(Permissions.Notifications);
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



export default function MainScreen() {
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
            //HandleAutoUpdate();
        };

    }, []);
    // Animated Tab Indicator...
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <NativeBaseProvider>
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                // Floating Tab Bar...
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 30,
                    marginHorizontal: 20,
                    // Max Height...
                    height: 60,
                    borderRadius: 10,
                    // Shadow...
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 20,
                }
            }}>

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"Home"} component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="home"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Search"} component={SearchScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="search"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true,
                        }).start();
                    }
                })}></Tab.Screen>

                {

                    // Extra Tab Screen For Action Button..
                }

                <Tab.Screen name={"ActionButton"} component={QRScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (

                        <TouchableOpacity>
                            <View style={{
                                width: 55,
                                height: 55,
                                backgroundColor: 'red',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: Platform.OS == "android" ? 50 : 30
                            }}>
                                <Image source={qr}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        tintColor: 'white',

                                    }}>
                                </Image>
                            </View>
                        </TouchableOpacity>
                    )
                }}></Tab.Screen>

                <Tab.Screen name={"Notifications"} component={NotificationScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="bell"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Settings"} component={SettingsScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="user-alt"
                                size={20}
                                color={focused ? 'red' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor: 'red',
                position: 'absolute',
                bottom: 90,
                // Horizontal Padding = 20...
                left: 50,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>

            </Animated.View>
        </NativeBaseProvider>
    );
}

function getWidth() {
    let width = Dimensions.get("window").width
    // Horizontal Padding = 20...
    width = width - 80
    // Total five Tabs...
    return width / 5
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});