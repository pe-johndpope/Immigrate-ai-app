import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Chat from '../Screens/Chat/Chat'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import ForgotPassword from '../Screens/ForgotPassword'
import LandingPage from '../Screens/LandingPage'
import ProfileScreen from '../Screens/ProfileMain'
import Dashboard from '../Screens/Home/Dashboard'
import Home from '../Screens/Home/Home'

interface RoutesProps{};

const Stack = createStackNavigator();

export const Routes: React.FC<RoutesProps>= ({}) =>{
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#fff' }}}>
                <Stack.Screen name = "LandingPage" component={LandingPage} options={{headerShown: false,}}/>
                <Stack.Screen name = "Chat" component={Chat}options={{headerShown: false,}}/>
                <Stack.Screen name = "Login" component={Login}options={{headerShown: false,}}/>
                <Stack.Screen name = "Register" component={Register}options={{headerShown: false,}}/>
                <Stack.Screen name = "ProfileScreen" component={ProfileScreen}/>

                <Stack.Screen name = "ForgotPassword" component={ForgotPassword}
                                                        options={{headerShown: false,}}/>
                <Stack.Screen name = "Dashboard" component={Dashboard} options={{headerShown: false,}}/>
                <Stack.Screen name = "Home" component={Home} options={{headerShown: false,}}/>


            </Stack.Navigator>
        </NavigationContainer>
    )
}
