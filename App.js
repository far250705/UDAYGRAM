// App.jsx
// Entrypoint that wires up navigation for all UDAY GRAM screens.
//
// IMPORTANT:
//  - Make sure this file is the project's entry (App entry in package.json).
//  - 'react-native-gesture-handler' must be imported first on the entry point for Android.
import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens (make sure these files exist under ./screens)
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateHouseScreen from './Screens/CreateHouseScreen';
import SurveyTypeScreen from './Screens/SurveyTypeScreen';
import HouseholdSurveyScreen from './Screens/HouseholdSurveyScreen';
import InfrastructureSurveyScreen from './Screens/InfrastructureSurveyScreen';
import ViewHousesScreen from './Screens/ViewHouseScreen';
import DomainListScreen from './Screens/DomainListScreen';
import DomainDetailsScreen from './Screens/DomainDetailScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#F7FAFF' },
          headerTintColor: '#0B3D91',
          headerTitleStyle: { fontWeight: '700' },
          animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'UDAY GRAM' }} />
        <Stack.Screen name="CreateHouse" component={CreateHouseScreen} options={{ title: 'Create House' }} />
        <Stack.Screen name="SurveyType" component={SurveyTypeScreen} options={{ title: 'Select Survey' }} />
        <Stack.Screen
          name="HouseholdSurvey"
          component={HouseholdSurveyScreen}
          options={{ title: 'Household Survey' }}
        />
        <Stack.Screen
          name="InfrastructureSurvey"
          component={InfrastructureSurveyScreen}
          options={{ title: 'Infrastructure Survey' }}
        />
        <Stack.Screen name="ViewHouses" component={ViewHousesScreen} options={{ title: 'Houses' }} />
        <Stack.Screen name="DomainList" component={DomainListScreen} />

        <Stack.Screen
          name="DomainDetails"
          component={DomainDetailsScreen}
          options={{ title: 'Domain Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
