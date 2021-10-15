 import React, {useState} from 'react'
 import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import CarryImagePicker from './CarryImagePicker'
 
 const CakeDetailsScreen = ({navigation,route}) => {

    const [cake, setcake] = useState({
        name: route.params.cake.name,
        price: route.params.cake.price

    })
    console.log(cake)
     return (

        
         <View style={{top:40}}>
             <Button 
             title='Edit'
             />
             <View>
             <Text>{cake.name}</Text>
             <Text>{cake.price}</Text>
             </View>
             
         </View>
     )
 }
 
 export default CakeDetailsScreen
 
 const styles = StyleSheet.create({})
 