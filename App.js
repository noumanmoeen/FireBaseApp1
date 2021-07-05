// import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Login from './Screens/Login'
import todoList from './Screens/todoList';
import EditList from './Screens/EditList';
import Colors from './constants/Colors';
import firebase from "firebase/app";
import "firebase/firestore";
import Settings from './Screens/Settings';
const Stack = createStackNavigator();
const Auth = createStackNavigator();


const AuthScreens = () => {
    return (
        <Auth.Navigator>
            <Auth.Screen name="Login" component={Login} />
        </Auth.Navigator>
    );
};
const Screens = () =>
{
  return (

    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TodoList" component={todoList} 
        options={({ route }) => {
          return {
              title: route.params.title,
              headerStyle: {
                  backgroundColor: route.params.color,
              },
              headerTintColor: "white",
          };
      }}/>
      <Stack.Screen name="Editer"  component={EditList}
      options={({ route }) => {
        return {
          title: route.params.title
          ? `Edit ${route.params.title} list`
          : "Create new list",
            headerStyle: {
                backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
        };
    }}/>
    <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
  )

}
export default function App() {

      const [isAuthenticated, setIsAuthenticated] = useState(false);
      useEffect(() => {
        if (firebase.auth().currentUser) {
            setIsAuthenticated(true);
        }
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Checking auth state...");
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

  return (
    <NavigationContainer>
   {isAuthenticated ? <Screens /> : <AuthScreens />}    </NavigationContainer>
  );
}


// const firebaseConfig = {
//   apiKey: "AIzaSyBj_YmeDl1rVt3TaW74mSkp2NphtVXqNMg",
//   authDomain: "sampletodo-6ab2b.firebaseapp.com",
//   projectId: "sampletodo-6ab2b",
//   storageBucket: "sampletodo-6ab2b.appspot.com",
//   messagingSenderId: "533002581315",
//   appId: "1:533002581315:web:dbaa8de441e342344eebf6"
// };
// firebase.initializeApp(firebaseConfig)
// export const auth = firebase.auth();
// export const db = firebase.firestore();
