import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
export default function LoadingScreen({ navigation }) {
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
            console.log('Error!!!');
        }
    };
    useEffect(() => {

        HandleAutoUpdate();
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let user = user_data_json;
            // console.log("User:--->", user);
            if (user) {
                navigation.replace('Main');
            } else {
                firebase.auth().onAuthStateChanged((user) => {
                    // console.log("user--ok------>", user);
                    if (user) {
                        navigation.replace('Main');
                    } else {
                        navigation.replace('Login');
                    }
                });
            }
        })
    }
    );

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        //backgroundColor: '#3FC5AB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
