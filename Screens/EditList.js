import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import ColorSelector from "../components/ColorSelector"
import Button from "../components/Button"
import Colors from '../constants/Colors';

const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];
const EditList = ({navigation,route}) => {
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setColor] = useState(route.params.color || Colors.blue);   
    const [isValid, setValidity] = useState(false);
     return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label} >Add New List Here</Text>
                <View style={{ flexDirection: "row" }}>
                  {!isValid && (
                        <Text
                            style={{
                                marginLeft: 4,
                                color: Colors.red,
                                fontSize: 12,
                            }}
                        >
                            * List Name cannot be empty
                        </Text>
                         )}
                         </View>
                
                <TextInput
                    underlineColorAndroid={"transparent"}
                    selectionColor={"transparent"}
                    autoFocus={true}
                    value={title}
                    onChangeText={(text) =>
                    {
                        setTitle(text);
                        setValidity(true);
                    }}
                    placeholder={"Add new item here"}
                   
                    maxLength={30}
                    style={[styles.input, { outline: "none" }]}
                   
                />
                <Text style={styles.label}>Choose Color</Text>
                <ColorSelector
                    onSelect={(color) => {
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({ color }));
                    }}
                    selectedColor={color}
                    colorOptions={colorList}
                />
        </View>

                    <Button text="Save" onPress={() => {
                    if (title.length > 1) {
                        route.params.saveChanges({ title, color });
                        navigation.dispatch(CommonActions.goBack());
                    }
                    else 
                    {

                    }  
       }
       } />
      
       </View>
    )
}

export default EditList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    input: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 24,
    },
    saveButton: {
        borderRadius: 25,
        backgroundColor: Colors.darkGray,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Colors.black,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
});