import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Progress from 'react-native-progress';
import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations } from "../api/weather";
import { fetchWeatherForecast } from "../api/weather";
import { WImages } from "../constants";
const HomeScreen = () => {

const [Clocation, setCLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true)

  const [city, setCity] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCLocation(JSON.stringify(location));
      console.log(JSON.stringify(location));
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log('temp city:'+geocode[0].city);
      setCity(geocode[0].city);
      fetchWeatherForecast({
        cityName: geocode[0].city,
        days:'7'
    }).then(data=>{
        setWeather(data)
        setLoading(false);
        
    })
    })();
  }, []);



  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };
//   useEffect(()=>{
    
//     fetchWeatherForecast({
//         cityName: 'Bihar',
//         days:'7'
//     }).then(data=>{
//         setWeather(data)
//         setLoading(false);
        
//     })
    
//   },[])
const getCurrentLocation = ()=>{
    setLoading(true);

    fetchWeatherForecast({
        cityName: city,
        days:'7'
    }).then(data=>{
        setWeather(data)
        setLoading(false);
        
    })
}

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const handleLocation = (loc) => {
    console.log("location-> ", loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
        });
  };
  const { current, location } = weather;
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        source={require("../assets/bg4.jpg")}
        className="absolute h-full w-full"
        blurRadius={30}
      />
      {
        loading?(
            <View className="flex-1 flex-row justify-center items-center">
            <Progress.CircleSnail thickness={10} size={140} color="orange" />
            </View>
        ):(
            <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end item-center rounded-full"
            style={{
              backgroundColor: showSearch ? "white" : null,
              opacity: showSearch ? 0.8 : 1,
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                className="pl-6 pt-3 h-10 flex-1 text-black text-lg"
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
              />
            ) : null}

            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="bg-blue-400 p-3 m-1 border-2 border-white rounded-full"
            >
              <MagnifyingGlassIcon color="black" size="25" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getCurrentLocation}
              className="bg-yellow-300 p-3 m-1 border-2 border-white rounded-full"
            >
            <Image
                source={WImages.Home}
                className="h-7 w-7"
            />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-200 top-16 border-2  rounded-3xl bg-opacity-80">
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className="flex-row items-center border-0 p-3 px-4 mb-1 border-b-gray-400"
                  >
                    <MapPinIcon size={20} color="gray" />
                    <Text className="text-black text-lg ml-2">
                      {loc?.name},{loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-black text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-gray-700 text-xl font-semibold">
              {" "}
              {location?.country}
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={WImages[current?.condition?.text]}
              className="w-52 h-52"
            />
          </View>
          <View className="space-y-2 ">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c} &#176;C
            </Text>
            <Text className="text-center font-bolder text-white text-2xl tracking-widest">
              {current?.condition?.text}
            </Text>
          </View>
          <View className="flex-row justify-between mx-4 gap-4">
            <View
              className="flex-row space-x-2 items-center border-2 p-2 rounded-2xl border-black"
              style={{
                backgroundColor:
                  "linear-gradient(90deg, rgba(139,255,38,1) 0%, rgba(239,255,10,1) 25%, rgba(54,255,0,1) 100%)",
              }}
            >
              <Image
                source={require("../assets/wind.png")}
                className="h-6 w-6"
              />
              <Text className="text-black font-semibold text-base shadow-2xl">
                {current?.wind_kph}km
              </Text>
            </View>

            <View
              className="flex-row space-x-2 items-center border-2 p-2 rounded-2xl border-black"
              style={{
                backgroundColor:
                  "linear-gradient(90deg, rgba(38,194,255,1) 0%, rgba(4,46,119,1) 25%, rgba(0,67,255,1) 100%)",
              }}
            >
              <Image
                source={require("../assets/humidity.png")}
                className="h-6 w-6"
              />
              <Text className="text-black font-semibold text-base shadow-2xl">
                {current?.humidity}%
              </Text>
            </View>

            <View
              className="flex-row space-x-2 items-center border-2 p-2 rounded-2xl border-black"
              style={{
                backgroundColor:
                  "linear-gradient(90deg, rgba(255,145,38,1) 0%, rgba(239,255,10,1) 25%, rgba(217,255,0,1) 100%)",
              }}
            >
              <Image
                source={require("../assets/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-black font-semibold text-base shadow-2xl">
                {weather?.forecast?.forecastday[0]?.astro.sunrise}
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <Image
              source={require("../assets/calendar.png")}
              className="w-7 h-7"
            />
            <Text className="text-gray-200 font-bold text-base">
              Daily Forecast
            </Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('en-US',options);
              return (
                <View key={index} className="flex justify-center items-center w-24 rounded-2xl py-3 space-y-1 mr-4 border-black border-2 bg-yellow-200">
                  <Image
                    source={WImages[item?.day?.condition?.text]}
                    className="h-11 w-11"
                  />
                  <Text className="text-black">{dayName}</Text>
                  <Text className="text-black text-xl font-semibold">
                    {item?.day?.avgtemp_c}&#176;
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
        )
      }

    </View>
  );
};

export default HomeScreen;
