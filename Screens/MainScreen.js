import React, { useState, useRef, useEffect } from "react";
import { Animated, Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Import Screen of Main Screen
import HomeScreen from './FormofMainForm/HomeScreen';
import SearchScreen from './FormofMainForm/SearchScreen';
import NotificationScreen from './FormofMainForm/NotificationScreen';
import ProfileScreen from './FormofMainForm/ProfileScreen';
import QRScreen from './FormofMainForm/QRScreen';

//Image QR
import qr from '../assets/QR.png';
// Font Awesome Icons...
import { FontAwesome5 } from '@expo/vector-icons';
//Firebase


const Tab = createBottomTabNavigator();



export default function MainScreen() {
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

                <Tab.Screen name={"Settings"} component={ProfileScreen} options={{
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