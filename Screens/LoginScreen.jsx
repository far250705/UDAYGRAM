// LoginScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UDAY GRAM</Text>
        <Text style={styles.subtitle}>PM-AJAY — Field Officer Login</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter username"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  header: { padding: 24, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "700", color: "#0B3D91" },
  subtitle: { fontSize: 14, color: "#556575", marginTop: 6 },
  form: { padding: 20, marginTop: 10 },
  label: { color: "#425569", marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#E6EEF9",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  primaryButtonText: { color: "#fff", fontWeight: "600" },
  linkButton: { padding: 14, alignItems: "center", marginTop: 10 },
  linkButtonText: { color: "#0B62CC", fontWeight: "600" },
});
