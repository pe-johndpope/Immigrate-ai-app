import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Onboarding from '../components/Onboarding';
import Button from '../components/Button'
import ButtonSignup from '../components/ButtonSignup'
import { AuthContext } from '../Contexts';

export default function LandingPage({navigation}){
    const { authenticated } = useContext(AuthContext)

    if (authenticated) {
        navigation.navigate("Dashboard")
    }

    return (
        <View style={styles.container}>
            <Onboarding />
            <Button style ={{marginBottom: "2%"}}
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </Button>
                <ButtonSignup style ={{marginBottom: "15%"}}
                    onPress={() => navigation.navigate('Register')}
                >
                    Sign Up
            </ButtonSignup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF5F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
