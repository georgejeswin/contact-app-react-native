import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { firebaseApp } from "../util/firebase/Firebase";

const UpdateScreen = ({ navigation, route }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { id, name, phone } = route.params;
    setId(id);
    setName(name);
    setPhone(phone);
  }, []);
  const addContact = () => {
    if (name !== "" && phone !== "") {
      const user = firebaseApp.auth().currentUser;
      firebaseApp
        .firestore()
        .collection("data")
        .doc(user.uid)
        .collection("contacts")
        .doc(id)
        .update({
          name: name,
          phone: phone,
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

export default UpdateScreen;

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
