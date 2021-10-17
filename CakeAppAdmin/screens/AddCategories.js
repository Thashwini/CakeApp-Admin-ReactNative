import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Modal, TextInput, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import { addCategories, getCategories, signout, uploadCake } from '../api/CategoriesApi'
import firebase from 'firebase';
import { config } from '../firebaseconfig';
import ActionButton from 'react-native-action-button';
import CarryImagePicker from './CarryImagePicker';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import logo from '../auth/Images/logo.jpg'
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons'; 

const AddCategories = ({navigation}) => {

    const [cakeList, setcakeList] = useState([])
    const [currentFoodItem, setcurrentFoodItem] = useState(null)
    const [price, setprice] = useState(null)
    const [image, setImage] = useState(null);
    const [kilos, setkilos] = useState(null)
    const [modalVisible, setmodalVisible] = useState(false)

     const onCategoryReceived = (cakeList) => {
        setcakeList(cakeList)
    }

    const onSignedOut = () => {
        console.log('signed-out')
        navigation.navigate('AuthForm')
    }
    

    useEffect(() => {
        getCategories(onCategoryReceived)
    }, [])

    useEffect(() => {
        if(!firebase.apps.length){
          firebase.initializeApp(config)
        }
        else{
          firebase.app()
        }
        
      }, [])

      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const onCakeAdded = (cake) => {
          setcakeList(cake)
      }

      const onCakeUpload = () => {
          console.log('hi')
          alert('ADDED')
      }

      const addingCake = () => {
          if(currentFoodItem===null){
              alert('Name Required')
          }
          else if(price===null){
            alert('Price Required')
        }
        else if(parseInt(price)<0){
            alert('Invalid Price')
        }
        else if(kilos===null){
            alert('Quantity Required')
        }
        
        else{
            uploadCake({
                     name: currentFoodItem,
                     price: price,
                     image: image,
                     quantity: kilos,
                     itemId: 'item' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime())

                 },onCakeAdded,{updating:false}
                 
                )
                // onCakeAdded()
                setmodalVisible(false)
                navigation.navigate('AddCategories')
                getCategories(onCategoryReceived)


        }
      }

      

       

    //   const setCakeImage = (image) => {

    //   }

    return (
        <SafeAreaView>
            <ScrollView>

                <StatusBar />

                <View style={styles.btn2}>
            <Button 
            color= '#B9AB98'
                title='logout'
                onPress={()=>{signout(onSignedOut)}}
                />
            
        </View>

                <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
                {/* <Button 
                    title='logout'
                    onPress={()=>{signout(onSignedOut)}}
                    /> */}
                </View>
                <TouchableOpacity style={styles.btn}
                onPress={()=>{setmodalVisible(true)}}
                >
                    <AntDesign name="pluscircleo" size={24} color="white" />
                    <View><Text style={{fontSize:16, marginLeft:10, color:'white'}}>ADD PRODUCT</Text></View>
                    
                </TouchableOpacity>

                <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
                >

                <View>
                    <View >
                        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
                        <View style={styles.btn2}>
                        <Button
                        title="Pick Image"
                        color= '#B9AB98'
                        onPress={pickImage}
                        />
                        </View>
                        {image && <Image style={styles.tinyLogo2} source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
            
                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={currentFoodItem}
                        placeholder='Enter Name'
                        onChangeText={(text)=>{setcurrentFoodItem(text)}}
                        />
                    </View>

                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={price}
                        placeholder='Enter Price'
                        onChangeText={(text)=>{setprice(text)}}
                        />
                    </View>

                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={kilos}
                        placeholder='Enter Quantity'
                        onChangeText={(text)=>{setkilos(text)}}
                        />
                    </View>
                <View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <View style={styles.btn2}>
                    <Button 
                    title='submit'
                    style={styles.btn}
                    color= '#B9AB98'
                    onPress={()=>{
                        addingCake()
                    // uploadCake({
                    //     name: currentFoodItem,
                    //     price: price,
                    //     image: image,
                    //     quantity: kilos,
                    //     itemId: 'item' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime())

                    // },onCakeUpload,{updating:false}
                    // // onCakeAdded()
                    // )
                    // onCakeAdded()
                    // alert('added')
                    
                    }}
                    />
                </View>

                <View style={styles.btn2}>
                    <Button 
                    title='BACK'
                    style={styles.btn}
                    color= 'black'
                    onPress={()=>{setmodalVisible(false)}}
                    />
                </View>
                </View>
            </View>
                
                </Modal>
            
            <FlatList 
            data={cakeList}
            ItemSeparatorComponent={()=><Divider></Divider>}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item,index})=>{
                
                console.log(item)
                
                return(
                    
                    // <ListItem 
                    // title={item.name}s
                    // onPress={()=>{}}
                    // color='black'
                    // />
                    <View
                    style={{flexDirection:'row',margin:10, marginLeft:20}}
                    >
                        <View style={styles.imageCon}>
                            <Image
                            style={styles.tinyLogo}
                            source={{uri: item.image}}
                            />
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{marginLeft:20}}>
                            <Text style={{marginLeft:10, fontSize:16, marginRight:10, alignItems:'center'}} >{item.name}</Text>
                            <Text style={{marginLeft:10, marginTop:10, alignItems:'center'}} >LKR {item.price}.00</Text>
                            </View>
                            <View style={styles.btn2}>
                                <Button
                                color= '#B9AB98'
                                title='VIEW' 
                                onPress={()=>navigation.navigate('CakeDetailsScreen',{cake:item})}
                                />
                            </View>
                        </View>
                    </View>
                    


                )
            }}
            />
            </ScrollView>

            
        </SafeAreaView>
    )
}

export default AddCategories

const styles = StyleSheet.create({
    text1:{
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        padding:20,
        margin:20,
        fontWeight : 'bold',
    },

    TextInput1: {
        borderWidth: 1,
        borderColor:'black',
        marginHorizontal: 10,
        borderRadius:10,
        margin:20,
        marginLeft:40,
        marginRight:40,
        height:40,
        paddingLeft:15,
    },

    imageCon:{
        alignItems:'center',

    },

    tinyLogo: {
        width: 60,
        height: 60,
        alignItems:'center',
        justifyContent:'center',
      },

    btn: {
        
        marginLeft:10,
        marginRight:10,
        marginHorizontal: 10,
        margin:20,
        borderRadius:20,
        padding:10,
        flexDirection:'row',
        backgroundColor:'#B9AB98',
        alignItems: 'center',
        justifyContent:'center',
    },

    btn2: {
        
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
        padding:10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
    },

    tinyLogo2: {
        width: 100,
        height: 100,
        borderRadius:20,
      },
})
