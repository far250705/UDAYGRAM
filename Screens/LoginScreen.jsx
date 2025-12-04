import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://backendpmajay.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      // Save JWT token locally
      await AsyncStorage.setItem("token", response.data.token);

      Alert.alert("Success", "Login successful!");
      setLoading(false);

      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);

      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Invalid username or password"
      );
    }
  };

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
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F9FF" },
  header: { padding: 30, marginTop: 30 },
  title: { fontSize: 30, fontWeight: "800", color: "#0B3D91" },
  subtitle: { marginTop: 6, color: "#5E6C80" },
  form: { padding: 20, marginTop: 10 },
  label: { marginBottom: 6, color: "#3A4A5A", fontSize: 14 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#D8E2F1",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkButton: { marginTop: 15, alignItems: "center" },
  linkText: { color: "#0B62CC", fontWeight: "600" },
});
