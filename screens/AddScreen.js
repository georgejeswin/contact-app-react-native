import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AddScreen</Text>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
