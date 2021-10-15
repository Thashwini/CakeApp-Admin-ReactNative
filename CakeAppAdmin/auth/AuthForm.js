import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, ActionSheetIOS } from 'react-native'
import { withFormik } from 'formik'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Formik } from 'formik'
import * as yup from 'yup'
import { string } from 'yup/lib/locale'
import { login, signup, subscribeToAuthChanges } from '../api/CategoriesApi'

const review = yup.object({
    email: yup.string().required().min(4),
    password: yup.string().required().min(8),
    displayName: yup.string().required().min(4)

})
const AuthForm = ({navigation}) => {

    const [authMode, setauthMode] = useState('login')

    useEffect(() => {
        subscribeToAuthChanges(onAuthStateChanged)
        
    }, [])

    switchAuthMode = () => {
        {authMode==='login' ? setauthMode('signup') : setauthMode('login')}
    }

    onAuthStateChanged = (user) =>{
        if(user !== null){
            navigation.navigate('AddCategories')
        }
        

    }

    

   
    return (
        <View>
            <Formik
            initialValues={{email:'',password:'',displayName:''}}
            validationSchema={review}
            onSubmit={(values, actions)=>{
                actions.resetForm()
                console.log(values)
                {authMode==='login'? login(values) : signup(values)}
            }}
            >
                {(props)=>(
                    <View>
            <Text>SIGN IN</Text>
            {authMode==='signup' ? 
            <View>
            <TextInput 
            style={styles.TextInput1}
            onChangeText={props.handleChange('displayName')}
            placeholder="Display Name"
            value={props.values.displayName}
            onBlur={props.handleBlur('displayName')}
            />
            {/* <Text>{props.errors.displayName}</Text> */}
        </View>: null}
            <TextInput
            style={styles.TextInput1}
            onChangeText={props.handleChange('email')}
            placeholder="Enter Email Address"
            value={props.values.email}
            onBlur={props.handleBlur('email')}
            />
            <Text>{props.touched.email && props.errors.email}</Text>
            <TextInput
            style={styles.TextInput1}
            secureTextEntry={true}
            onChangeText={props.handleChange('password')}
            placeholder="Enter Password"
            value={props.values.password}
            onBlur={props.handleBlur('password')}
            />
            <Text>{props.touched.email && props.errors.password}</Text>
            <Button
            style={{color:'black'}}
            style={styles.btn2}
            onPress={()=>props.handleSubmit()} 
            title={authMode==='login'? 'Login' : 'Create Account'}
            />
            <Button
            style={styles.btn2}
            onPress={()=>switchAuthMode()} 
            title={authMode==='login'? 'Switch to Sign Up' : 'Switch to Login'}
            />
            </View>

            )}
            </Formik>
        </View>
        
    )
}

export default AuthForm

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
    btn2: {
        color:'black',
        backgroundColor:'red',
        marginLeft:40,
        marginRight:40,
        marginHorizontal: 10,
        margin:20,
        borderRadius:10,
    },
})

// export default withFormik({
//     mapPropsToValues: () => ({email:'',password: ''}),
//     validate: (values,props)=>{
//         const errors = {};
//         const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//         if(!values.email){
//             errors.email = 'Email Required'
//         }
//         else if(!values.password){
//             errors.password = 'Password Required'

//         }
//         else if(!reg.test(email))(
//             errors.email='Invalid Email'
//         )

//         if(!values.password){
//             errors.password = 'Password Required'
//         }
//         else if(values.password.length<8){
//             errors.password='Minimum length of password is 8 characters'
//         }

//         if(props.authMode==='signup'){
//             if(!values.displayName){
//                 errors.displayName = 'Display Name Required'
//             }
            
//         }
//         return errors;
//     },
    
// })
