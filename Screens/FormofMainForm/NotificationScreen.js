import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    Box,
    FlatList,
    HStack,
    VStack,
    Avatar,
    Spacer,
    Divider,
    Center,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { LogBox, RefreshControl } from 'react-native';
import Loader from "./Reload";

LogBox.ignoreLogs(['Setting a timer']);

export default function NotificationScreen({ navigation }) {
    const [data, setdata] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    // const loadData = () => {
    //     const data = [
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 1:03:00 PM",
    //             "MaxValue": "8",
    //             "McCode": "BP_KD_BC_M5D_C_0054",
    //             "McName": "BPM 4 Heads",
    //             "MinValue": "-11",
    //             "ORD": "38",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "185",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "lByZIjP9y3lPPKWSkDRD",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 1:27:00 PM",
    //             "MaxValue": "8",
    //             "McCode": "BP_KD_BC_M5D_C_0054",
    //             "McName": "BPM 4 Heads",
    //             "MinValue": "-11",
    //             "ORD": "39",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "3,277",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "eifBbqjZsLda4ghQDWQl",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "099",
    //             "DeptName": "N",
    //             "Hms": "2022-01-27 1:31:00 PM",
    //             "MaxValue": "138",
    //             "McCode": "THA_SP_136S_0014",
    //             "McName": "Toe Heating Activating",
    //             "MinValue": "132",
    //             "ORD": "40",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "N-6",
    //             "PvValue": "47",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=N",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "YmQxyCahEFPbe6gszVzV",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "099",
    //             "DeptName": "N",
    //             "Hms": "2022-01-27 1:32:00 PM",
    //             "MaxValue": "138",
    //             "McCode": "THA_SP_136S_0014",
    //             "McName": "Toe Heating Activating",
    //             "MinValue": "132",
    //             "ORD": "41",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "N-6",
    //             "PvValue": "63",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=N",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "tge45oDcGkyFwJv8Dd2f",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 1:46:00 PM",
    //             "MaxValue": "8",
    //             "McCode": "BP_KD_BC_M5D_C_0054",
    //             "McName": "BPM 4 Heads",
    //             "MinValue": "-11",
    //             "ORD": "42",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "446",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "g8gj4MDowJME9iTcaI5i",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 2:07:00 PM",
    //             "MaxValue": "133",
    //             "McCode": "HBP_KD_BCM2H_0009",
    //             "McName": "Hot Mold BP 2 Head",
    //             "MinValue": "127",
    //             "ORD": "43",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "123",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "7mGMc5Ck9gVpUYpQV4hm",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 2:25:00 PM",
    //             "MaxValue": "8",
    //             "McCode": "BP_KD_BC_M5D_C_0054",
    //             "McName": "BPM 4 Heads",
    //             "MinValue": "-11",
    //             "ORD": "44",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "3,277",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "IB4BMwx7F0vy77WdLHwl",
    //         },
    //         {
    //             "DateTime": "2022/01/27",
    //             "DeptCode": "016",
    //             "DeptName": "J",
    //             "Hms": "2022-01-27 2:46:00 PM",
    //             "MaxValue": "8",
    //             "McCode": "BP_KD_BC_M5D_C_0054",
    //             "McName": "BPM 4 Heads",
    //             "MinValue": "-11",
    //             "ORD": "45",
    //             "OpCode": "FGA",
    //             "OpName": "Assembly",
    //             "Plant": "J-1",
    //             "PvValue": "3,277",
    //             "SHOW_YN": "Y",
    //             "SendYN": "Y",
    //             "User_Avatar": "https://ui-avatars.com/api/?length=3&background=0D8ABC&color=fff&name=J",
    //             "User_Email": "test133@gmail.com",
    //             "User_Token": "ExponentPushToken[3lgHUUAx1xkmKwlFK7DImA]",
    //             "key": "goMzCVIXuxcTpRyGig72",
    //         },
    //     ];
    //     try {
    //         setdata(data)
    //         console.log(data);
    //         return () => {
    //             setdata([]);
    //         };
    //     } catch { }
    // }
    const loadData = () => {
        setisLoading(true);
        const data = [];
        try {
            AsyncStorage.getItem('userData').then((user_data_json) => {
                let user =
                    firebase.auth().currentUser?.email == null
                        ? user_data_json
                        : firebase.auth().currentUser?.email;
                console.log("user: ", user);
                firebase
                    .firestore()
                    .collection("ScadaCollection").where("SHOW_YN", "==", "Y").where("User_Email", "==", user).orderBy("ORD", "asc")
                    .onSnapshot((querySnapshot) => {

                        querySnapshot.forEach((documentSnapshot) => {
                            data.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                        });
                        setdata(data);
                        console.log(data);
                    });
                // Unsubscribe from events when no longer in use
                return () => {
                    setdata([]);
                };
            });
        } catch { }
        setisLoading(false);
    }
    const _onRefresh = () => {
        console.log("_onRefresh");
        setRefreshing(true);
        loadData();
        setRefreshing(false);
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadData();
        });
        return unsubscribe;
    }, [navigation]);

    const _renderItem = useCallback(
        ({ item }) => (
            <Box
                borderRadius={9}
                borderBottomWidth={1}
                borderLeftWidth={1}
                borderRightWidth={1}
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
                    borderColor: "coolGray.200",
                }}
                pl="4"
                pr="5"
                py="2"
                mb={2}
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
        ),
        []);

    return (
        <Center py={1} px={3} backgroundColor="red.200">
            <Box
                w={{ base: "100%", }}
                h={{ base: "100%", }}
            >
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                            tintColor="#0284c7"
                        />
                    }
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.ORD}
                    mb={90}
                />
                <Loader isLoading={isLoading} />
            </Box>
        </Center>
    );
};

