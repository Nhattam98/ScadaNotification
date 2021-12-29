import React, { useEffect, useState } from "react";
import {
    NativeBaseProvider,
    Center,
    Button,
    Text,
    Box,
    FlatList,
    HStack,
    VStack,
    Avatar,
    Spacer,
    Divider,
    View,
    Icon,
    StatusBar
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"
import {
    createNativeStackNavigator,
    NavigationActions,
} from "@react-navigation/native-stack";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { Image, LogBox, StyleSheet, Animated } from 'react-native';
import ImageNoti from '../Image/images.png';

LogBox.ignoreLogs(['Setting a timer']);
const SettingsStack = createNativeStackNavigator();

export default function NotificationScreen({ navigation }) {
    const [data, setdata] = useState([]);
    const [Dept, setDept] = useState('')
    // const user = firebase.auth().currentUser?.email;
    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
    const scrollY = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let user = user_data_json;
            console.log("user: ", user);
            // console.log("user: ",firebase.auth().currentUser?.email);
            firebase
                .firestore()
                .collection("ScadaCollection").where("SendYN", "==", "Y").where("User_Email", "==", user)
                .onSnapshot((querySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        data.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    setdata(data);
                });
            // Unsubscribe from events when no longer in use
            return () => {
                setdata([]);
            };
        });
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Image
                source={ImageNoti}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}
            />
            <Animated.FlatList
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + .5)
                    ]
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    return <Animated.View style={{
                        flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: .3,
                        shadowRadius: 20,
                        opacity,
                        transform: [{scale}]
                    }}>
                        <Image
                            source={{ uri: item.User_Avatar, }}
                            style={{
                                width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                                marginRight: SPACING / 2
                            }}
                        />
                        <View>
                            <VStack>

                                <Text fontSize="18"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    color="coolGray.800"
                                    bold>{item.Plant}
                                    <Text color="warmGray"> ({item.DateTime})</Text>
                                </Text>

                                <Text style={styles.TextView}>{item.OpName}</Text>
                                <Text style={styles.TextView}>{item.McName}</Text>
                                <Text style={styles.TextView}>{item.PvValue}</Text>
                                <Text style={styles.TextView}>{item.MinValue}</Text>
                                <Text style={styles.TextView}>{item.MaxValue}</Text>
                                <Text >{item.Hms}</Text>

                            </VStack>

                        </View>
                    </Animated.View>
                }}

            />

        </View>
    );
};

const styles = StyleSheet.create({
    TextView: {
        fontSize: 18,
        opacity: .7
    }
});