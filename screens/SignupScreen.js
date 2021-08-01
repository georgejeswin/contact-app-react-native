import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { firebaseApp } from "../util/firebase/Firebase";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // console.log(result);
          navigation.navigate("Login");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("provide correct details");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Sign up</Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          keyboardType="email-address"
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          keyboardType="visible-password"
          secureTextEntry={true}
          value={password}
          placeholder="Enter your password"
          type="outlined"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          label="Confirm Password"
          keyboardType="visible-password"
          secureTextEntry={true}
          value={confirmPassword}
          placeholder="Repeat your password"
          type="outlined"
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignup} style={styles.input}>
          Signup now
        </Button>
        <Button
          onPress={() => navigation.navigate("Login")}
          style={styles.input}
        >
          Already a user? sign in !
        </Button>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginTop: 15,
  },
});
