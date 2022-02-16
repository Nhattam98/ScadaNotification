import React, { useState, useEffect } from "react";
import Background from '../Screens/Image/Background.jpg';
import Logo from '../Screens/Image/logo.jpg';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Platform
} from 'react-native';
import {
    NativeBaseProvider,
    Input,
    Icon,
    FormControl,
    HStack,
    Button,
    Link,
    VStack,
    Heading,
    Box,
    Alert,
    Center,
    KeyboardAvoidingView,
} from "native-base";

function Example() {
    return <Center>
        <VStack space={5} maxW="400">
            <Alert w="100%" status="info">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                    <Alert.Icon size="md" />
                    <Text fontSize="md" fontWeight="medium" _dark={{
                        color: "coolGray.800"
                    }}>
                        Registration User Guide!
                    </Text>

                    <Box _text={{
                        textAlign: "center"
                    }} _dark={{
                        _text: {
                            color: "coolGray.600"
                        }
                    }}>
                        To start the application process, you will need to create an account. Please click Sign Up to execute.
                    </Box>
                </VStack>
            </Alert>
        </VStack>
    </Center>;
}
function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const HandleEyeClick = () => {
        setShow(!show);
    };
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigation.navigate("Main");
                user.getIdToken().then(function (idToken) {
                    firebase
                        .firestore()
                        .collection("onlineUsers")
                        .doc(firebase.auth().currentUser?.email)
                        .set({
                            email: user.email,
                        });
                    return idToken;
                });

            }
        });
        return unsubscribe;
    }, []);

    const HandleOnLogin = () => {
        console.log("Log in Clicked!!!")
        const auth = firebase.auth();
        //set auth persistence
        auth.signInWithEmailAndPassword(email.trim(), password)
            .then((userCredentrials) => {
                const user = userCredentrials.user;
                AsyncStorage.setItem('userData', user.email);
                console.log("Ban vua dang nhap voi email: ", user.email);
            })
            .catch((error) => alert(error.message))
    };

    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "position" : undefined}
                style={{ flex: 1, backgroundColor: '#ffffff' }}
                showsVerticalScrollIndicator={false}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <ImageBackground
                            source={Background}
                            style={{height: Dimensions.get('window').height / 3.5}}
                        >
                            <View style={styles.brandView}>
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    source={Logo}
                                    borderRadius={100}
                                    alt="Logo"
                                />
                                <Text style={styles.brandViewText}>Scada</Text>
                            </View>
                        </ImageBackground>
                        {/* Bottom View */}
                        <View style={styles.bottomView}>
                            <Box safeArea flex={1} p="2" py="10" w="90%" mx="auto">
                                <VStack space={3}>

                                    <Heading
                                        size="lg"
                                        fontWeight="600"
                                        color="coolGray.800"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    >
                                        Welcome
                                    </Heading>
                                    <Heading
                                        mt="1"
                                        _dark={{
                                            color: "warmGray.200",
                                        }}
                                        color="red.600"
                                        fontWeight="medium"
                                        size="xs"
                                    >
                                        Sign in to continue!
                                    </Heading>
                                    {/* Form Input View */}
                                    <FormControl>
                                        <FormControl.Label
                                            _text={{
                                                color: "coolGray.800",
                                                fontSize: "xs",
                                                fontWeight: 500,
                                            }}
                                        >
                                            E-Mail
                                        </FormControl.Label>
                                        <Input
                                            InputLeftElement={
                                                <Icon
                                                    as={<MaterialIcons name="email" />}
                                                    size={5}
                                                    ml="2"
                                                    color="muted.400"
                                                />}
                                            placeholder="Email address"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </FormControl>
                                    {/* Password */}
                                    <FormControl>
                                        <FormControl.Label
                                            _text={{
                                                color: "coolGray.800",
                                                fontSize: "xs",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Password
                                        </FormControl.Label>
                                        <Input
                                            InputLeftElement={
                                                <Icon
                                                    as={<MaterialCommunityIcons name="form-textbox-password" />}
                                                    size={5}
                                                    ml="2"
                                                    color="muted.400"
                                                />}
                                            type={show ? "text" : "password"}
                                            placeholder="Password"
                                            value={password.trim()}
                                            onChangeText={setPassword}
                                            InputRightElement={
                                                <Icon
                                                    as={
                                                        <MaterialIcons
                                                            name={show ? "visibility" : "visibility-off"}
                                                        />
                                                    }
                                                    size={5}
                                                    mr="2"
                                                    color={show ? "black" : "muted.400"}
                                                    onPress={HandleEyeClick}
                                                />
                                            }
                                        />
                                        <Link
                                            _text={{
                                                fontSize: "xs",
                                                fontWeight: "500",
                                                color: "red.500",
                                            }}
                                            alignSelf="flex-end"
                                            mt="1"
                                            onPress={() => navigation.navigate("Forgot")}
                                        >
                                            Forget Password?
                                        </Link>
                                    </FormControl>
                                    <Button
                                        endIcon={<Icon as={Ionicons} name="enter-outline" size="sm" />}
                                        w="100%"
                                        mt="2"
                                        colorScheme="indigo"
                                        _text={{ color: "white" }}
                                        onPress={HandleOnLogin}
                                    >
                                        Sign In
                                    </Button>
                                    <HStack mt="6" justifyContent="center">
                                        <Text
                                            fontSize="sm"
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            I'm a new user.{" "}
                                        </Text>
                                        <Link
                                            _text={{
                                                color: "blue.500",
                                                fontWeight: "bold",
                                                fontSize: "sm",
                                                mt: "-0.5"
                                            }}
                                            onPress={() => navigation.navigate('Register')}
                                        >
                                            Sign Up
                                        </Link>
                                    </HStack>
                                    {/* <Example /> */}
                                </VStack>
                            </Box>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </NativeBaseProvider >
    );
}

export default LoginScreen;
const styles = StyleSheet.create({
    brandView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandViewText: {
        color: '#1996E7',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
});