import React, { useState } from "react";
import Background from '../Screens/Image/Background.jpg';
import Logo from '../Screens/Image/logo.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image,
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
    Box,
    Heading,
    useToast
} from "native-base";


function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [show, setShow] = useState(false)
    const toast = useToast();
    const HandleEyeClick = () => {
        setShow(!show);
    }
    const HandleOnSignUp = () => {
        console.log("Register Clicked!!!")
        if (password === conPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    firebase
                        .firestore()
                        .collection("Users")
                        .doc(user.email)
                        .set({
                            UID: user.uid,
                            email: user.email,
                            token: null,
                        })
                        .then(function () {
                            console.log("Register Successfully with email: ", email)
                            toast.show({
                                bg: "green.100.800",
                                title: "User Registered!",
                            });
                        });
                })
                .catch((error) => alert(error.message));
        } else {
            toast.show({
                bg: "red.800",
                title: "Your password does not match!",
            });
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={Background}
                    style={{
                        height: Dimensions.get('window').height / 3.5
                    }}
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
                                Sign up to continue!
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
                                    placeholder="Nhập địa chỉ email"
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
                                    placeholder="Nhập mật khẩu"
                                    value={password}
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
                            </FormControl>
                            {/* Confirm Password */}
                            <FormControl>
                                <FormControl.Label
                                    _text={{
                                        color: "coolGray.800",
                                        fontSize: "xs",
                                        fontWeight: 500,
                                    }}
                                >
                                    Confirm Password
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
                                    placeholder="Nhập lại mật khẩu"
                                    value={conPassword}
                                    onChangeText={setConPassword}
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
                            </FormControl>
                            <Button
                                endIcon={<Icon as={Ionicons} name="person-add-outline" size="sm" />}
                                w="100%"
                                mt="2"
                                colorScheme="indigo"
                                _text={{ color: "white" }}
                                onPress={HandleOnSignUp}
                            >
                                Sign Up
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text
                                    fontSize="sm"
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                >
                                    Already Have Account?.{" "}
                                </Text>
                                <Link
                                    _text={{
                                        color: "blue.500",
                                        fontWeight: "bold",
                                        fontSize: "sm",
                                    }}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    Sign In
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </View>
            </ScrollView>
        </NativeBaseProvider >
    );
}

export default RegisterScreen;
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