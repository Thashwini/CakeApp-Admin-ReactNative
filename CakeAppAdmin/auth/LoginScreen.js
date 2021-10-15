import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthForm from './AuthForm'


const LoginScreen = () => {

    const [authMode, setauthMode] = useState('login')

    useEffect(() => {
        
    }, [])

    switchAuthMode = () => {
        {authMode==='login' ? setauthMode('signup') : setauthMode('login')}
    }

    return (
        <AuthForm 
        authMode={authMode}
        switchAuthMode={switchAuthMode()}
        />
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
