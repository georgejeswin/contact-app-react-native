import React from "react";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Button, FAB } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { firebaseApp } from "../util/firebase/Firebase";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchData();
    navigation.addListener("focus", () => {
      fetchData();
    });
  }, []);
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

  const fetchData = () => {
    const user = firebaseApp.auth().currentUser;

    firebaseApp
      .firestore()
      .collection("data")
      .doc(user.uid)
      .collection("contacts")
      .get()
      .then((querySnapshot) => {
        const contacts = [];
        querySnapshot.forEach((snapshot) => {
          contacts.push({
            id: snapshot.id,
            name: snapshot.data().name,
            phone: snapshot.data().phone,
          });
        });
        setContacts(contacts);
        setLoaded(true);
      });
  };

  const handleCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (item) => {
    const user = firebaseApp.auth().currentUser;
    firebaseApp
      .firestore()
      .collection("data")
      .doc(user.uid)
      .collection("contacts")
      .doc(item.id)
      .delete();

    let contactArray = contacts;
    contactArray = contactArray.filter((contact) => contact.id !== item.id);
    setContacts(contactArray);
  };

  return (
    <View style={styles.top}>
      {loaded ? (
        <View style={styles.container}>
          <FlatList
            data={contacts}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {}} style={styles.card}>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text>{item.phone}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginRight: 20 }}>
                      <MaterialIcons
                        name="delete"
                        size={32}
                        onPress={() => handleDelete(item)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="call"
                        size={32}
                        onPress={() => handleCall(item.phone)}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("Add")}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
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
  top: {
    flex: 1,
  },
  card: {
    backgroundColor: "#dedede",
    width: Dimensions.get("window").width - 40,
    margin: 10,
    padding: 20,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
