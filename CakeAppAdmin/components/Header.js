import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { signout } from '../api/CategoriesApi'

const Header = ({navigation}) => {

    const onSignedOut = () => {
        console.log('signed-out')
        navigation.navigate('AuthForm')
    }


    return (
        <View style={styles.btn}>
            <Button 
            color= '#B9AB98'
                title='logout'
                onPress={()=>{signout(onSignedOut)}}
                />
            
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    btn: {
        
        marginLeft:320,
        marginRight:20,
        marginHorizontal: 10,
        margin:20,
        borderRadius:50,
    },
})
