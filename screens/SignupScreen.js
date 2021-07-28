import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignupScreen</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
