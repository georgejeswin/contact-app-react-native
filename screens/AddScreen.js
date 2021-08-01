import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { firebaseApp } from "../util/firebase/Firebase";

const AddScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const addContact = () => {
    if (name !== "" && phone !== "") {
      const user = firebaseApp.auth().currentUser;
      // console.log(user.uid);
      firebaseApp
        .firestore()
        .collection("data")
        .doc(user.uid)
        .collection("contacts")
        .add({ name: name, phone: phone })
        .then((result) => {
          // console.log(result);
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Name and Phone number is required");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Contact</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        label="Name"
        placeholder="enter the name"
        style={styles.input}
      />
      <TextInput
        keyboardType="number-pad"
        placeholder="enter the number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        label="Phone Number"
        style={styles.input}
      />
      <Button
        mode="contained"
        style={styles.input}
        icon="plus"
        onPress={addContact}
      >
        Add Contact
      </Button>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginTop: 20,
  },
});
