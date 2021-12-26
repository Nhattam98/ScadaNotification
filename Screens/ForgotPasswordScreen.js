import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    HStack,
    Center,
    useToast,
    ScrollView,
} from "native-base";
import firebase from "firebase/compat/app";
export default function ForgotPasswordScreen({ navigation }) {
    const [mail, setmail] = useState("");
    const toast = useToast();
    const HandleForgot = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(mail)
            .then(() => {
                toast.show({
                    bg: "green.800",
                    title: "Đã khôi phục mật khẩu, vui lòng kiểm tra email của bạn!",
                });
                navigation.navigate("Login");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} px="5" py="2">
                    <Box
                        rounded="lg"
                        overflow="hidden"
                        width="100%"
                        height="100%"
                        shadow={9}
                        _light={{ backgroundColor: "gray.50" }}
                        _dark={{ backgroundColor: "gray.700" }}
                    >
                        <Box safeArea flex={1} p="2" py="10" w="90%" mx="auto">
                            <Heading size="lg" color="coolGray.800" fontWeight="600">
                                Reset Your Password.
                            </Heading>

                            <VStack space={3} mt="5">
                                <FormControl>
                                    <FormControl.Label
                                        _text={{
                                            color: "muted.700",
                                            fontSize: "xs",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Email
                                    </FormControl.Label>
                                    <Input
                                        InputLeftElement={
                                            <Icon
                                                as={<MaterialIcons name="email" />}
                                                size={5}
                                                ml="2"
                                                color="muted.400"
                                            />}
                                        placeholder="Input your email"
                                        value={mail}
                                        onChangeText={setmail}
                                    />
                                </FormControl>
                                <VStack>
                                    <Button
                                        endIcon={<Icon as={Ionicons} name="refresh-outline" size="sm" />}
                                        mt="2"
                                        colorScheme="indigo"
                                        _text={{ color: "white" }}
                                        onPress={HandleForgot}
                                    >
                                        Reset Password
                                    </Button>
                                </VStack>
                                <HStack mt="6" justifyContent="center">
                                    <Text fontSize="sm" color="muted.700" fontWeight={400}>
                                        Allreay Have Account?!.{" "}
                                    </Text>
                                    <Link
                                        onPress={() => navigation.navigate("Login")}
                                        _text={{
                                            color: "indigo.500",
                                            fontWeight: "medium",
                                            fontSize: "sm",
                                        }}
                                    >
                                        Sign In
                                    </Link>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}
