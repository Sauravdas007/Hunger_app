import { ScrollView, Text, TouchableOpacity, View , Image, StatusBar} from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../assets/images/app-logo.png';
//const logo = require('../assets/images/app-logo.png');
const entryImage = require('../assets/images/entry-image.png');  
export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]"> 
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 items-center justify-center">
          <Image source={logo} style={{height:300, width: 300}} />
          <View className="w-3/4">
            <TouchableOpacity
              className="bg-[#8f8f4f] rounded-lg p-4 mb-4"
              onPress={() => router.push('/signup')}
            >
              <Text className="text-white text-center text-lg">Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#9c4a4c] rounded-lg p-9"
              onPress={() => router.push('/home')}
            >
              <Text className="text-white text-center text-lg">Sign up nehi karna hai? then press</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center px-6">
            {/* Divider "OR" Section */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-[#f49b33]" />
              <Text className="mx-4 text-white font-semibold text-lg uppercase">or</Text>
              <View className="flex-1 h-[1px] bg-[#f49b33]" />
            </View>

            {/* Sign In Link */}
            <TouchableOpacity
              className="flex-row items-center py-4"
              onPress={() => router.push('/signin')}
            >
              <Text className="text-gray-300 text-lg">Already a user? </Text>
              <Text className="text-[#f49b33] text-lg font-bold underline ml-2">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1" >
          <Image source={entryImage} className="w-full h-full" resizeMode='contain'/>
        </View>

        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
}
