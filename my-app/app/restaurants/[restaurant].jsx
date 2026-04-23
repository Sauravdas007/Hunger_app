import {Dimensions, View, Text, Platform, ScrollView, FlatList , Image} from 'react-native';
import React, { useState, useEffect ,useRef} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
// Firestore imports
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig.js'; // adjust path to your Firebase config file

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState({});

  const windowWidth = Dimensions.get('window').width;
  const flatListRef = useRef(null);
  const corousalItem = ({ item }) => {
    return(
    <View style={{width:windowWidth-2}} className=
      "h-64 relative rounded-[25px]">
      <View style={{position:'absolute', top:"50%",  
        backgroundColor:'rgba(0,0,0,0.6)', borderRadius:50,
        padding:5,zIndex:10,right:"6%"}}>
          <Ionicons name="arrow-forward" size={24} color="white" />
      </View>
      <View>
        <Image source={{uri: item}}
            style={{opacity:0.5, backgroundColor:"black",
              marginRight:20,marginLeft:5, borderRadius:25
            }}
            className="h-64"
        />
        
      </View>
           
    </View>  
  )};

  const getRestaurantData = async () => {
    // Fetch restaurant data from Firestore based on the restaurant name
    // Update restaurantData, carouselData, and slotsData states accordingly
    try {
      const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
      const restaurantSnapshot = await getDocs(restaurantQuery);
      if (restaurantSnapshot.empty) {
        console.log("No restaurant found with the given name.");
        return;
      }
      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);
        

        const carouselQuery = query(
          collection(db, "carouselImages"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages = [];
        if (carouselSnapshot.empty) {
          console.log("No carousel images found for this restaurant.");
          return;
        }
        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);
        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];
        if (slotsSnapshot.empty) {
          console.log("No available slots found for this restaurant.");
          return;
        }
        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotsData(slots);

      }

    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }

  }

  useEffect(() => {
    getRestaurantData();
  }, []);
  
  console.log(restaurantData, carouselData, slotsData);
  return (
    <SafeAreaView
      style={[
        { backgroundColor: '#2b2b2b' },
        Platform.OS === 'android' && { paddingBottom: 57 },
        Platform.OS === 'ios' && { paddingBottom: 20 }
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-[#fb9b33] mr-2 text-xl font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-[#fb9b33]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={corousalItem}
            horizontal
            scrollEnabled
            style={{borderRadius: 25}}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

