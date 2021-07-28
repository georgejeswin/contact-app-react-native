import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { firebaseApp } from "../util/firebase/Firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((result) => {
      if (result) {
        navigation.replace("HomeScreen");
      }
    });
  }, []);
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          navigation.replace("HomeScreen");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Email or password is wrong");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
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
        <Button mode="contained" onPress={handleLogin} style={styles.input}>
          Login now
        </Button>
        <Button
          onPress={() => navigation.navigate("Signup")}
          style={styles.input}
        >
          New user? sign up !
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

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
