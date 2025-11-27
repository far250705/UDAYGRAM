// Screens/RegisterScreen.jsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Register — UDAY GRAM</Text>

        <Text style={styles.label}>Village Name</Text>
        <TextInput
          style={styles.input}
          value={village}
          onChangeText={setVillage}
          placeholder="Village name"
        />

        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={setDistrict}
          placeholder="District"
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm password"
          secureTextEntry
        />

        {/* 👉 After registration go back to Login */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 22, color: "#0B3D91", fontWeight: "700", marginBottom: 18 },
  label: { fontSize: 13, color: "#425569", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderColor: "#E6EEF9",
    borderWidth: 1,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  primaryButtonText: { color: "#fff", fontWeight: "600" },
});
