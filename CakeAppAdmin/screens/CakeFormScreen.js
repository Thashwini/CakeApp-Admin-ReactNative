import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { addCategories } from '../api/CategoriesApi'
import firebase from 'firebase';
import { config } from '../firebaseconfig';

const review = yup.object({
    name: yup.string().required().min(4),
    // category: yup.string().required().min(8),
    // price: yup.string().required().min(4)

})

const CakeFormScreen = ({navigation}) => {

    const [cakeName, setcakeName] = useState(null)
    const [cakeCategory, setcategory] = useState(null)
    const [price, setprice] = useState(null)

    useEffect(() => {
        if(!firebase.apps.length){
          firebase.initializeApp(config)
        }
        else{
          firebase.app()
        }
        
      }, [])

    const setName = (text) => {
        setcakeName(text)
    }

    const setCakeCategory = (text) => {
        setcategory(text)
    }

    const setCakePrie = (text) => {
        setprice(text)
    }


    
    return (
        <View>
            {/* <Formik
            initialValues={{name:'',category:'',price:''}}
            validationSchema={review}
            onSubmit={()=>{
                actions.resetForm()
                console.log(values)
                console.log('pressed')
                addCategories(values,navigation.state.params)
            }}
            >
            {(props)=>(
                <View>
            <TextInput 
            style={styles.TextInput1}
            onChangeText={props.handleChange('name')}
            placeholder="Cake Name"
            value={props.values.name}
            onBlur={props.handleBlur('name')}
            />
            <TextInput 
            style={styles.TextInput1}
            onChangeText={props.handleChange('category')}
            placeholder="Cake Category"
            value={props.values.category}
            onBlur={props.handleBlur('cakeCategory')}
            />
            <TextInput 
            style={styles.TextInput1}
            onChangeText={props.handleChange('price')}
            placeholder="Price"
            value={props.values.price}
            onBlur={props.handleBlur('price')}
            />

            <Button
            
            onPress={()=>props.handleSubmit()} 
            title='ADD CAKE'
            />
            </View>

            )}
            </Formik> */}


            <Formik
            initialValues={{name:'', category:'', price:''}}
            validationSchema={review}
            onSubmit={(values, actions)=>{
                actions.resetForm()
                console.log(values)
                addCategories(values,navigation.state.params)
                console.log('values')
                
            }}
            >
                {(props)=>(
                    <View>
            
            <TextInput
            style={styles.TextInput1}
            onChangeText={props.handleChange('name')}
            placeholder="Enter Cake Name"
            value={props.values.name}
            onBlur={props.handleBlur('name')}
            />

            <TextInput
            style={styles.TextInput1}
            onChangeText={props.handleChange('category')}
            placeholder="Enter Category"
            value={props.values.category}
            onBlur={props.handleBlur('category')}
            />

<TextInput
            style={styles.TextInput1}
            onChangeText={props.handleChange('price')}
            placeholder="Enter Category"
            value={props.values.price}
            onBlur={props.handleBlur('price')}
            />
            
            <Button
            onPress={()=>props.handleSubmit()} 
            title='tttw'
            />
            
            </View>

            )}
            </Formik>
        </View>
    )
}

export default CakeFormScreen

const styles = StyleSheet.create({
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
})
