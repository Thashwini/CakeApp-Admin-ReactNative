import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { Button } from 'react-native-elements/dist/buttons/Button';

const CarryImagePicker = () => {

    const [image, setImage] = useState(null);

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

    return (
        // <View style={styles.container}>
        //     <View style={styles.imageContainer}>
        //         <Image />
        //     </View>
        //     <View style={styles.button}>
        //         <Button
        //         title='Pick Image'
        //         onPress={pickImageHandler}
        //          />
        //     </View>
        // </View>
        <View >
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
         />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    )
}

export default CarryImagePicker

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    imageContainer: {
        borderWidth: 1,
        borderColor:'black',
        width: '80%',
        height: 150,
    },
    button: {
        margin: 8,
    }
})
