import { View, Text, ImageBackground, SafeAreaView, TextInput,StyleSheet,ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import One from '../../../assets/1.png';
import Tow from '../../../assets/2.png';
import Three from '../../../assets/3.png';
import Four from '../../../assets/4.png';

const images = [One,Tow, Three,Four];
const Home = () => {
  const [randomImage, setRandomImage] = useState(images[0])
  const [city, setCity] = useState ("")
  const [weather, setWeather] = useState({})
  const [Loding, setLoding] = useState(false)
const getWeather = async () => {
  if (!city.trim()) return
setLoding(true)

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=384bceb19168d50e3da2411206024c89`)
      
      setWeather(res.data)
      const n = Math.floor (Math.random() * images.length )
setRandomImage(images[n])
setLoding(false)

  } catch (error) {
    console.log ('In error')
    alert ('Wrong city name')
    setLoding(false)
  }
}
  return (
    
    <ImageBackground source={randomImage} style={styles.image}>
      <SafeAreaView style={{flex:1}}>
      <View style={styles.textView}>
      <TextInput
      style={styles.TextInput}
      value={city}
      placeholder= 'City name search'
      onChangeText={(text) => setCity(text) } />
      {Loding ? <ActivityIndicator 
      size={'small'} color="black" /> : <AntDesign
      onPress={getWeather}
      name="checkcircleo" size={24} color="black" />}

    
     </View>

     
{Object.keys(weather). length > 0 ?
<> 
     <View>
      <Text style={{textAlign:'center',marginTop:16,fontWeight:'bold', 
      shadowColor:'#fff', shadowOpacity: 0.2,  
      shadowRadius: 3,  shadowOffset: {width: -2, height: 4},   fontSize:30}}>
        {weather?.name} , {weather?.sys?.country}
      </Text>
     </View>

     <View >  
      <Text   style= {{  textAlign: 'center', color: '#fff',fontSize:64, fontWeight:'800',
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    overflow:'hidden',
    marginTop:10,
    textShadowColor: 'rgba(0,0,0,0.75)', 
    textShadowOffset: {width: -2, height: 4}, 
    textShadowRadius: 8, 
 }} >
{Math.round (weather.main.temp)} ˚C 
      </Text>
      <Text style={{textAlign:'center',marginTop:16,fontWeight:'bold', 
      shadowColor:'#fff', shadowOpacity: 0.2,  
      shadowRadius: 3,  shadowOffset: {width: -2, height: 4},   fontSize:40}}>
{weather.weather[0].main}
      </Text>
     </View>
     </>
     : null}


      </SafeAreaView>
    </ImageBackground>
  )
}
const styles=StyleSheet.create({
  image:{
    flex:1

  },
  textView: {
    backgroundColor:'rgba(255,255,255,0.7)',
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 24,
    paddingHorizontal: 10,
    width: '80%',
    justifyContent:'space-between'
  },
  TextInput: {
     height: 60,
     fontSize:24,
     

  }

})
export default Home;