import { fetchlocations, fetchWeatherForecast } from "api/Weather";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {CalendarDaysIcon, MapPinIcon} from "react-native-heroicons/solid";
import Spinner from "./spinner";
import { WeatherData } from "./weather"; // Import the WeatherData interface


export default function Page() {
  const [showSearch,toggleSearch]=useState(false)
  const [locations,setLocations]=useState([])
  const [weather,setWeather]=useState<WeatherData | null>(null)
  const [loading,setLoading]=useState(true)
  const handelLocation=(loc)=>{
    setLoading(true)
    toggleSearch(false)
    setLocations([])
    fetchWeatherForecast({
      cityName:loc.name,
      days:'7',
    }).then((data)=>{
      setWeather(data)
      setLoading(false)
    })
  }
  const weatherImages={
    'Partly Cloudy ':require('./assets/images/partlycloudy.png'),
    'Partly Cloudy':require('./assets/images/partlycloudy.png'),
    'Partly cloudy':require('./assets/images/partlycloudy.png'),
    'Moderate rain':require('./assets/images/moderaterain.png'),
    'Patchy rain possible':require('./assets/images/moderaterain.png'),
    'Patchy rain nearby':require('./assets/images/moderaterain.png'),
    'Sunny':require('./assets/images/sun.png'),
    'Clear':require('./assets/images/sun.png'),
    'Overcast':require('./assets/images/cloud.png'),
    'Overcast ':require('./assets/images/cloud.png'),
    'Cloudy':require('./assets/images/cloud.png'),
    'Cloudy ':require('./assets/images/cloud.png'),
    'Light rain':require('./assets/images/moderaterain.png'),
    'Moderate rain at times':require('./assets/images/moderaterain.png'),
    'Heavy rain':require('./assets/images/heavyrain.png'),
    'Heavy rain at times':require('./assets/images/heavyrain.png'),
    'Moderate or heavy freezing rain':require('./assets/images/heavyrain.png'),
    'Moderate or heavy rain shower':require('./assets/images/heavyrain.png'),
    'Moderate or heavy rain with thunder':require('./assets/images/heavyrain.png'),
    'other':require('./assets/images/moderaterain.png'),
    'Mist':require('./assets/images/mist.png'),
    'Fog':require('./assets/images/line.png'),
  }
  const handelSearch=value=>{
    if(value.length>2){
      fetchlocations({cityName:value}).then(data=>{
        setLocations(data);

      })
    }else(
      setLocations([])
    )
  }
  useEffect(() => {
    fetchMyWeatherData()
  }, [])
  const fetchMyWeatherData=async()=>{
    fetchWeatherForecast({
      cityName:'Mumbai',
      days:'7'
    }).then((data)=>{
      setWeather(data)
      setLoading(false)
    }
    )
  }
  return (
    <View  className="flex-1 absolute h-full min-h-screen ">
      <Image blurRadius={70} source={require('../app/assets/images/bg.png')} className="absolute h-full w-full z-0"/>
      {
        loading ? (
            <Spinner/>
        ):(
          <SafeAreaView className="flex flex-1 mt-10">
          <View style={{height:'7%'}} className="mx-4 relative z-50">
            <View className={`flex-row justify-end items-center rounded-full  ${showSearch===true ? 'bg-[#ffffff33]' : 'bg-transparent'}`}>
              {
                showSearch ? (
                  <TextInput onChangeText={handelSearch} placeholder="Search City" placeholderTextColor={'lightgray'} className="pl-6 h-10 pb-1 flex-1 text-base text-white"></TextInput>
                ):null
              }
              <TouchableOpacity onPress={()=>toggleSearch(!showSearch)} className="rounded-full p-3 m-1 bg-[#ffffff7f]"><MagnifyingGlassIcon size={25} color={'white'} /></TouchableOpacity>
            </View>
            {
              locations.length && showSearch ? (
                <View className="absolute w-full bg-slate-200 top-16 rounded-3xl">
                  {
                    locations.map((loc,index)=>{
                      let showborder=index+1 !==locations.length;
                      let borderClass=showborder ? ' border-b-2 border-b-slate-400 ' : ''
                      return(
                        <TouchableOpacity key={index} onPress={()=>handelLocation(loc)}  className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`} >
                          <MapPinIcon size={20} color={'gray'} />
                          <Text className="text-black text-lg ml-2">{loc?.name},{loc?.country}</Text>
                        </TouchableOpacity>
                      )

                    })
                  }
                </View>
              ):null
            }
          </View>
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <Text className='text-white text-center text-2xl font-bold'>{weather?.location?.name}, <Text className='text-slate-300  text-lg font-semibold'>{' '+weather?.location?.country}</Text></Text>
            <View className="flex-row justify-center">
              <Image source={weatherImages[weather?.current?.condition?.text]} className="w-52 h-52"/>
            </View>
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">{weather?.current?.temp_c}&#176;</Text>
              <Text className="text-center  text-white text-xl tracking-widest">{weather?.current?.condition?.text}</Text>
            </View>
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 gap-2 items-center">
                <Image source={require('./assets/icons/wind.png')} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">{weather?.current?.wind_kph}km</Text>
              </View>
              <View className="flex-row space-x-2 gap-2 items-center">
                <Image source={require('./assets/icons/drop.png')} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">{weather?.current?.humidity}%</Text>
              </View>
              <View className="flex-row space-x-2 gap-2 items-center">
                <Image source={require('./assets/icons/sun.png')} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
              </View>
            </View>
          </View>
          <View className="mb-8">
            <View className="flex-row items-center mx-5 my-2">
              <CalendarDaysIcon size={22} color={'white'}/>
              <Text className="text-white text-base">Daily Forecast</Text>
            </View>
            <ScrollView horizontal contentContainerStyle={{paddingHorizontal:15}} showsHorizontalScrollIndicator={false}>
              {
                weather?.forecast?.forecastday?.map((item,index)=>{
                  let date=new Date(item.date);
                  let options: Intl.DateTimeFormatOptions = { weekday: 'long' };
                  let dayName=date.toLocaleDateString('en-US',options);
                  dayName=dayName.split(',')[0]

                  return(
                    <View key={index} className="flex justify-center items-center w-28 rounded-3xl bg-[#ffffff33] py-3 space-y-1 mr-4">
                      <Image source={weatherImages[item?.day?.condition?.text]} className="h-11 w-11"/>
                      <Text className="text-white ">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">{item?.day?.avgtemp_c}&#176;</Text>
                    </View>
                  )
                })
              }

            </ScrollView>
          </View>
        </SafeAreaView>
        )
      }
    </View>
  );
}
