import React, { useState, useLayoutEffect,useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import ToDoItem from "../components/ToDoItem";
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import { onSnapshot,addDoc,removeDoc,updateDoc } from "../services/collection";
// import Colors from "../constants/Colors";



const AddListIcon = ({ADD}) =>
{

    
    return(
        <TouchableOpacity onPress={() =>ADD({title:"",checked:false,
        isNewItem:true})}>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    )
}


const todoList = ({navigation,route}) => {
    let [newItems,setnewItems]=useState([
    //   {title:"Eating",
    //   checked:false,
    // }
    ])
    const [newItem, setNewItem] = useState();


    const toDoItemsRef = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("lists")
        .doc(route.params.listId)
        .collection("todoItems");

        useEffect(() => {
            onSnapshot(
                toDoItemsRef,
                (newToDoItems) => {
                    setnewItems(newToDoItems);
                },
                {
                    sort: (a, b) => {
                        if (a.checked && !b.checked) {
                            return 1;
                        }
                        if (b.checked && !a.checked) {
                            return -1;
                        }
    
                        return 0;
                    },
                }
            );
        }, []);

        

    const addItem = ( ) =>
    {
        setNewItem({ tile: "", checked: false, new: true });
    }
    const removeItem = (index) =>
    {
        newItems.splice(index,1);
        setnewItems([...newItems]);
    }

    const   updateItems = (index,item) =>
    {
        newItems[index]= item;
        setnewItems([...newItems])
    }
   
    useLayoutEffect(() =>
    {
        navigation.setOptions(
            {
                headerRight : () => <AddListIcon ADD={addItem} />
            }
        )
    })

    if (newItem) {
        newItems=[newItem, ...newItems]
    }
    return (
       <View style={styles.container}>
           <FlatList 
           data={newItems}
           renderItem={({item:{id,title,checked, ...params},index}) =>
            {
            return(
                   <ToDoItem
                   {...params}
                    title={title} 
                   checked={checked}
                   onChecked={() => 
                    {  
                    let data = { title, checked: !checked };
                    if (id) {
                        data.id = id;
                    }
                    addDoc(toDoItemsRef, data);
                }}
                onChangeText={(inputText) =>
                {
                    if (params.new) {
                        setNewItem({
                            title: inputText,
                            checked,
                            new: params.new,
                        });
                    } else {
                        newItems[index].title = inputText;
                        setnewItems([...newItems]);
                    }
                }}
                onDelete={() => {
                    params.new
                        ? setNewItem(null)
                        : removeItem(index);
                    id && removeDoc(toDoItemsRef, id);
                }}              
                  
                
                onBlur={() => {
                    if (title.length > 1) {
                        let data = { title, checked };
                        if (id) {
                            data.id = id;
                        }
                        addDoc(toDoItemsRef, data);
                        params.new && setNewItem(null);
                    } else {
                        params.new
                            ? setNewItem(null)
                            : removeItem(index);
                    }
                }}
                />

         )
                }
            }/>
       </View>
    )
}

export default todoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    icon: {
        padding: 5,
        fontSize: 32,
        color: "white",
    },
});
export const auth = firebase.auth();
export const db = firebase.firestore();
