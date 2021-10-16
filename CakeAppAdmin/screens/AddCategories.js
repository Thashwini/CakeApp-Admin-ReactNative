import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Modal, TextInput, FlatList, Image, StatusBar } from 'react-native'
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
      }

    //   const setCakeImage = (image) => {

    //   }

    return (
        <SafeAreaView>
            <ScrollView>

                <StatusBar />

                <Header />

                <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
                {/* <Button 
                    title='logout'
                    onPress={()=>{signout(onSignedOut)}}
                    /> */}
                </View>
                <Button
                    title='ADD'
                    style={{margin:10}}
                    onPress={()=>
                        {setmodalVisible(true)
                        }}
                    
                    />

                <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
                >

                <View>
                

                    <View >
                        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
            
                        <Button
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                        />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
            
                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={currentFoodItem}
                        onChangeText={(text)=>{setcurrentFoodItem(text)}}
                        />
                    </View>

                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={price}
                        onChangeText={(text)=>{setprice(text)}}
                        />
                    </View>

                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={kilos}
                        onChangeText={(text)=>{setkilos(text)}}
                        />
                    </View>
                
                
            
                <View>
                    {/* <ActionButton
                    buttonColor='blue'
                    style={{margin:10}}
                    onPress={()=>
                        {
                            // navigation.navigate('CakeFormScreen',onCakeAdded),
                console.log('pressed')}}
                    
                    /> */}
                    {/* <Button
                    title='hii'
                    onPress={()=>
                        {
                            navigation.navigate('CakeFormScreen',onCakeAdded),
                console.log('pressed')}}
                    
                    /> */}
            </View>
            <View>
                <Button 
                title='submit'
                style={styles.btn}
                onPress={()=>{
                    // addCategories({
                    //     name: currentFoodItem,
                    //     price: price,
                    //     image: image,
                    //     itemId: 'cake' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime())

                    // },
                    // // onCakeAdded()
                    // )
                    uploadCake({
                        name: currentFoodItem,
                        price: price,
                        image: image,
                        quantity: kilos,
                        itemId: 'item' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime())

                    },onCakeUpload,{updating:false}
                    // onCakeAdded()
                    )
                    onCakeAdded()
                    alert('added')
                    setmodalVisible(false)
                }}
                />
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
                    // title={item.name}
                    // onPress={()=>{}}
                    // color='black'
                    // />
                    <View
                    onPress={()=>navigation.navigate('CakeDetailsScreen',{cake:item})}
                    style={{flexDirection:'row',margin:10}}
                    >
                        <View style={styles.imageCon}>
                            <Image
                            style={styles.tinyLogo}
                            source={{uri: item.image}}
                            />
                    </View>
                    <Text style={{marginLeft:10}} onPress={()=>navigation.navigate('CakeDetailsScreen',{cake:item})}>{item.name}</Text>
                    <Text>{item.price}
                    </Text>
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

    // btn: {
        
    //     marginLeft:40,
    //     marginRight:40,
    //     marginHorizontal: 10,
    //     margin:20,
    //     borderRadius:10,
    // },
})
