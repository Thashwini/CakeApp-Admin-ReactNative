 import React, {useState} from 'react'
 import { StyleSheet, Text, View, StatusBar, Image, TextInput, Button } from 'react-native'
import Header from '../components/Header'
import CarryImagePicker from './CarryImagePicker'
import { updateCake, deleteCake, uploadCake } from '../api/CategoriesApi'
import * as ImagePicker from 'expo-image-picker';
 
 const CakeDetailsScreen = ({navigation,route}) => {

    const [cake, setcake] = useState({
        name: route.params.cake.name,
        price: route.params.cake.price,
        image: route.params.cake.image,
        quantity: route.params.cake.quantity,
        id: route.params.cake.id
    })

    const [newName, setnewName] = useState(cake.name)
    const [newPrice, setNewPrice] = useState(cake.price)
    const [newQuantity, setnewQuantity] = useState(cake.quantity)
    const [newImage, setnewImage] = useState(cake.image)

    const onCakeUpdated = (cake) => {
        console.log(cake)
        alert('UPDATED')
        navigation.navigate('AddCategories')
    }

    const onCakeDelete = () => {
        alert('DELETED')
        navigation.navigate('AddCategories') 
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setnewImage(result.uri);
        }
      };

      const uploadingCake = () => {
        if(newName===null){
            alert('Name Required')
        }
        else if(newPrice===null){
          alert('Price Required')
      }
      else if(parseInt(newPrice)<0){
          alert('Invalid Price')
      }
      else if(newQuantity===null){
          alert('Quantity Required')
      }
      else{
        uploadCake({
                 name: newName,
                 price: newPrice,
                 image: newImage,
                 quantity: newQuantity,
                 id:cake.id
             },onCakeUpdated,{updating:true}
             )
             alert('UPDATED')


    }

      }

    console.log(cake)

    return (

        <View>

            <StatusBar />

            <Header />

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={styles.btn}>
                        <Button
                        color= '#B9AB98'
                        title="Change Image"
                        onPress={pickImage}
                        />
                    </View>
                    <View style={{marginRight:100}}>
                        <Image
                        style={styles.tinyLogo}
                        source={{uri:newImage}}
                        />
                    </View>
                </View>
                <View style={{marginLeft:30, marginRight:30}}>
                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={newName}
                        onChangeText={(text)=>{setnewName(text)}}
                        />
                    </View>
                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={newPrice}
                        onChangeText={(text)=>{setNewPrice(text)}}
                        />
                    </View>
                    <View>
                        <TextInput 
                        style={styles.TextInput1}
                        value={newQuantity}
                        onChangeText={(text)=>{setnewQuantity(text)}}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={styles.btn}>
                        <Button 
                        color= '#B9AB98'
                        title='UPDATE'
                        onPress={()=>{
                            uploadingCake()
                        // uploadCake({
                        //     name: newName,
                        //     price: newPrice,
                        //     image: newImage,
                        //     quantity: newQuantity,
                        //     id:cake.id
                        // },onCakeUpdated,{updating:true}
                        // )
                        // alert('UPDATED')
                        }}
                        />
                    </View>

                    <View style={styles.btn}>
                        <Button 
                        color= 'red'
                        title='DELETE'
                        onPress={()=>{
                        deleteCake({
                            id:cake.id
                        },onCakeDelete)
                        alert('DELETEd')
                        }}
                        />
                    </View>
                </View>
            
        </View>
    )
}
 
 export default CakeDetailsScreen
 
 const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius:20,
      },

      textHeader:{
        padding:10,
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        fontSize:20,
        fontWeight:'bold'
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
    btn: {
        
        marginLeft:60,
        marginRight:40,
        borderRadius:20,
        padding:10,
    },
 })
 