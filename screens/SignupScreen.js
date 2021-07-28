import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <Button
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.input}
        >
          Signup now
        </Button>
        <Button
          onPress={() => navigation.navigate("Login")}
          style={styles.input}
        >
          Already a user? sign in !
        </Button>
      </View>
      <Text>{email}</Text>
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
  },
  input: {
    marginTop: 15,
  },
});
