import { TextInput, StatusBar, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const entryImage = require('../../assets/images/entry-image.png');
import logo from '../../assets/images/app-logo.png';
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from 'formik';
import validationSchema from '../../utils/signupSchema';

const handleSignin = (values) => {
  console.log(values);
};

const Signin = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        
        <View className="m-2 items-center justify-center">
          <Image source={logo} style={{ height: 300, width: 300 }} />
          
          <Text className="text-lg font-bold text-center text-white mb-10">
            Welcome, Hungry baby!
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="w-full">
                  
                  <Text className="text-white mb-2">Email</Text>
                  
                  <TextInput
                    className="h-14 border border-white text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>
                  )}
                  <Text className="text-white mb-2">Password</Text>
                  
                  <TextInput
                    className="h-14 border border-white text-white rounded px-2"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-sm mb-2">{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    className="bg-[#8f8f4f] rounded-lg p-4 mb-4 mt-4"
                    onPress={handleSubmit}
                  >
                    <Text className="text-white text-center text-lg">
                      Sign in
                    </Text>
                  </TouchableOpacity>

                </View>
              )}
            </Formik>
            <View className="w-full justifyCenter items-center">
              <TouchableOpacity
              className="flex-row items-center py-4 my-5 p-2"
              onPress={() => router.push('/signup')}
              >
                <Text className="text-gray-300 text-lg">New user? </Text>
                <Text className="text-[#f49b33] text-lg font-bold underline ml-2">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          
        </View>

        <View className="flex-1">
          <Image
            source={entryImage}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      
      </ScrollView>
    </SafeAreaView>
  );
};
export default Signin;