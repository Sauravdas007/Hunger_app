import { View, Text ,StyleSheet ,Image,  Platform, ImageBackground, ScrollView, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/small_logo.png';
import bgimg from '../../assets/images/bg2.png';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView, BlurTargetView } from 'expo-blur';
import { useRef } from 'react';
//import {restaurants} from "../../store/restaurants.js";
import uploadData from '../../config/bulkupload.js';
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig.js';
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>router.push(`/restaurants/${item.name}`) } className="bg-[#5f5f5f] max-h-68 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md">
      <Image source={{uri: item.image}} resizeMode='cover' 
        //className="h-28 mt-2 mb-1 rounded-lg"
        style={{
        height: 120,
        width: 200,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10
      }} />
      <Text className="text-white text-lg font-bold mt-2">
        {item.name}
      </Text>
      <Text className="text-white text-md font-bold mt-2">
        {item.address}
      </Text>
      <Text className="text-white text-base font-ba mt-2">
        opening: {item.opening} am
      </Text>
    </TouchableOpacity>
  );
  
  const getRestaurants = async () => {
    const q=query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item)=>{
      setRestaurants((prev)=>[...prev, item.data()])
    })
  }

  useEffect(()=>{
    //uploadData();
    getRestaurants();
  }, []);
  
  return (
    <SafeAreaView style={[{backgroundColor:'#2b2b2b'}, Platform.OS === "android" && {paddingBottom: 57}, Platform.OS === "ios" && {paddingBottom: 20}]}>
      <View className="flex-row items-center justify-center mt-2">
        <Text className="text-white text-base font-bold mr-2">
          Welcome to
        </Text>

        <Image
          source={logo}
          resizeMode="contain"
          style={{ height: 35, width: 100 }}
        />
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground 
          resizeMode='cover'
          className="mb-4 w-full h-52 items-center justify-center"
          source={bgimg}>
          <BlurView intensity={Platform.OS === 'ios' ? 50 : 75}
           className="w-5/6 p-4 shadow-lg rounded-lg items-center justify-center" >
            <Text className="text-white text-3xl font-bold">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-white text-3xl font-semibold mr-2">
            Special Discount %
          </Text>
        </View>
        {
        restaurants.length > 0?
        <FlatList  data={restaurants} renderItem = {renderItem} horizontal={true} contentContainerStyle={{padding:16}} showsHorizontalScrollIndicator={false} scrollEnabled={true}/> : <ActivityIndicator animating color ={"#fb9b33"}/>
        
        }
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-[#fb9b33] text-3xl font-semibold mr-2">
            Popular Restaurants
          </Text>
        </View>
        {
        restaurants.length > 0?
        <FlatList  data={restaurants} renderItem = {renderItem} horizontal={true} contentContainerStyle={{padding:16}} showsHorizontalScrollIndicator={false} scrollEnabled={true}/> : <ActivityIndicator animating color ={"#fb9b33"}/>
        
        }
        
      </ScrollView>
      
    </SafeAreaView>
  )
}