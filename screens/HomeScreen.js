import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, FAB } from "react-native-paper";
import { firebaseApp } from "../util/firebase/Firebase";

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            firebaseApp
              .auth()
              .signOut()
              .then(() => {
                navigation.replace("Login");
              })
              .catch((err) => {
                console.log(err);
              })
          }
          icon="logout"
        ></Button>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Add")}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 25,
  },
});
