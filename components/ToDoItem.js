import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from "react-native";
import Colors from "../constants/Colors";
import CheckBox from "./CheckBox";

const EditableText = ({ checked, onChangeText,isNewItem, title, 
    ...props }) => {
        const [isEditMode, setEditMode] = useState(props.new)
        return(
            <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => !checked && setEditMode(true)}
        >     
        {isEditMode ? (
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={title}
                    onChangeText={onChangeText}
                    placeholder={"Add new item here"}
                    onSubmitEditing={() => {}}
                    maxLength={30}
                    style={[styles.input, { outline: "none" }]}
                    onBlur={() => {
                        props.onBlur && props.onBlur();
                        setEditMode(false);
                    }}
                /> )
                :
              (<Text style={[styles.icon, { 
                  color: checked ?
                  Colors.lightGray :  Colors.red ,
                  textDecoration:checked ? 
                  "line-through" 
                  :"none"

                }]}>{title}</Text>)
                }
        </TouchableOpacity>
        )
    }
const ToDoItem = ({title,checked,onChecked,onChangeText,onDelete, ...props}) => {
  
    return (
       <View style={styles.container}>
           <View style={{flexDirection:"row",flex:1}}>
        <CheckBox 
        checked={checked} 
        onChecked={onChecked}/>
        <EditableText 
        title={title}
        onChangeText={onChangeText}
        checked={checked}
        {...props}        />
        <TouchableOpacity onPress={onDelete}>
        <Text style={[styles.icon],{color:Colors.red}}>X</Text>
        </TouchableOpacity>
           </View>
       </View>
    )
}

export default ToDoItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    icon: {
        padding: 5,
        fontSize: 16,
    },
    input: {
        color: Colors.black,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 25,
        fontSize: 16,
    },
    text: {
        padding: 3,
        fontSize: 16,
    },
});