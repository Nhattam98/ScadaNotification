import React, { useEffect, useState } from "react";
import {
    Text,
    Box,
    FlatList,
    HStack,
    VStack,
    Avatar,
    Spacer,
    Divider,
    ScrollView,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function NotificationScreen() {
    const [data, setdata] = useState([]);



    useEffect(() => {
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let user = user_data_json;
            console.log("user: ", user);
            firebase
                .firestore()
                .collection("ScadaCollection").where("SHOW_YN", "==", "Y").where("User_Email", "==", user).orderBy("ORD")
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
        <Box
            w={{
                base: "100%",
            }}
            h={{
                base: "100%",
            }}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ScrollView>
                        <Box
                            rounded="lg"
                            overflow="hidden"
                            borderColor="warmGray.400"
                            borderBottomWidth="2"
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
                            pl="4"
                            pr="5"
                            py="2"
                        >
                            <HStack space={3} alignItems="center" justifyContent="space-between">
                                <Avatar
                                    size="45px"
                                    borderColor="yellow.400"
                                    borderWidth="2"
                                    source={{
                                        uri: item.User_Avatar,
                                    }}
                                />

                                <Divider orientation="vertical" />
                                <VStack>
                                    <Text
                                        fontSize="18"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                        color="coolGray.800"
                                        bold
                                    >
                                        {item.Plant}
                                        <Text color="warmGray"> ({item.DateTime}) </Text>
                                    </Text>
                                    <Divider />
                                    <Text
                                        _dark={{
                                            color: "red.50",
                                        }}

                                        color="red.800">{item.McName}

                                    </Text>
                                    <Divider></Divider>
                                    <Text
                                        _dark={{
                                            color: "red.50",
                                        }}

                                        color="green.700">{item.OpName}

                                    </Text>
                                    <Divider></Divider>
                                    <VStack space={1}>
                                        <Text
                                            color="purple.800"
                                            _dark={{
                                                color: "purple.800",
                                            }}
                                        >
                                            <Text bold>PV:</Text> {item.PvValue}
                                        </Text>
                                        <Text
                                            color="info.600"
                                            _dark={{
                                                color: "info.600",
                                            }}
                                        >
                                            <Text bold>Max:</Text> {item.MaxValue}
                                        </Text>
                                        <Text
                                            color="teal.400"
                                            _dark={{
                                                color: "teal.400",
                                            }}
                                        >
                                            <Text bold>Min:</Text> {item.MinValue}
                                        </Text>
                                        <Text
                                            color="warning.400"
                                            _dark={{
                                                color: "warning.800",
                                            }}
                                        >
                                            <Text bold>Time:</Text> {item.Hms}
                                        </Text>
                                        <Divider />
                                    </VStack>
                                </VStack>
                                <Spacer />
                            </HStack>
                        </Box>
                    </ScrollView>

                )}
                keyExtractor={(item) => item.key}
            />
        </Box>
    );
};

