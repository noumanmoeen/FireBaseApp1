import React,{useState,useLayoutEffect,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import Colors from '../constants/Colors';
import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore"
import { onSnapshot,addDoc,updateDoc,removeDoc } from '../services/collection';

const ListItem = ({title,color,onPress,onDelete,onOptions}) =>{

        return(
            
            <TouchableOpacity onPress={onPress} style={[styles.itemContainer],{backgroundColor:color}}>
                <View><Text style={styles.itemTitle}>{title}</Text></View>
                <View style={{flexDirection:"row"}}>  <TouchableOpacity onPress={onOptions} style={styles.itemContainer}>
                    <Ionicons name="options-outline" size={24}
                    color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>onDelete()} style={styles.itemContainer}>
                    <Ionicons  name="trash-outline" size={24}
                    color="white"/>
                    </TouchableOpacity></View>
            </TouchableOpacity>
        
        )
}

const AddListIcon = (navigation,addItem) =>
{
    return(
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={() =>{navigation.navigate("Editer",{saveChanges:addItem})} }>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={{ justifyContent: "center", marginRight: 4 }}
                onPress={() => navigation.navigate("Settings")}

            >
                <Ionicons name="settings" size={24} />
            </TouchableOpacity>
        </View>
    )
}


const Home = ({navigation}) => {

    const [Lists,setLists]=useState([   ])
    const listsRef = db
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("lists");

    useEffect(() => {
        onSnapshot(
            listsRef,
            (newLists) => {
                setLists(newLists);
            },
            {
                sort: (a, b) => {
                    if (a.index < b.index) {
                        return -1;
                    }

                    if (a.index > b.index) {
                        return 1;
                    }

                    return 0;
                },
            }
        );
    }, []);

 const addItem = ({title,color}) =>
 {
    
     const index = Lists.length > 1 ? lists[Lists.length - 1].index + 1 : 0;
     addDoc(listsRef, { title,color, index });
 }
 const removeItem = (id) =>
 {
    removeDoc(listsRef, id);
};

 const updateItemFromLists = (id, item) => {
    updateDoc(listsRef, id, item);
    };
 useLayoutEffect(() =>
 {
     navigation.setOptions(
         {
             headerRight : () => AddListIcon(navigation,addItem)
         }
     )
 })
    return (
        <View>
       <FlatList data={Lists} 
       renderItem={({ item: { title, color,id,index} }) =>{
            return(
                <ListItem title={title} 
                color={color} 
                navigation={navigation} 
                onPress={() =>{navigation.navigate("TodoList",{title,color,listId:id})}} 
                  onOptions={() => {
                                navigation.navigate("Editer", {
                                    title,
                                    color,
                                    saveChanges: (newItem) =>
                                        updateItemFromLists(id,{index, ...newItem}),
                                });
                            }} 
                onDelete={() => removeItem(id)}/>
            )
       }}
       />
      
    
       </View>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
    },
    icon: {
        padding: 5,
        fontSize: 36,
        
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

const firebaseConfig = {
    apiKey: "AIzaSyBj_YmeDl1rVt3TaW74mSkp2NphtVXqNMg",
    authDomain: "sampletodo-6ab2b.firebaseapp.com",
    projectId: "sampletodo-6ab2b",
    storageBucket: "sampletodo-6ab2b.appspot.com",
    messagingSenderId: "533002581315",
    appId: "1:533002581315:web:dbaa8de441e342344eebf6"
  };
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const db = firebase.firestore();


