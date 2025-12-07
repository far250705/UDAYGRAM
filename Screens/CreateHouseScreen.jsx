import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateHouseScreen({ navigation }) {
  const [houseNo, setHouseNo] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateHouse = async () => {
    if (!houseNo.trim()) {
      Alert.alert("Error", "House Number is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Not logged in. Please login again.");
        navigation.navigate("Login");
        return;
      }

      const response = await fetch(
        "https://backendpmajay.onrender.com/api/surveys/create-house",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            houseNumber: houseNo,
            address: address,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.success) {
        Alert.alert("Error", data.message || "Failed to create house");
        setIsSubmitting(false);
        return;
      }

      // Navigate to SurveyTypeScreen with houseId
      navigation.navigate("UnifiedSurvey", { houseId: data.house._id });
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Network/Server error");
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#F7FAFF" }}>
      <Text style={styles.title}>Create House</Text>

      <Text style={styles.label}>House Number</Text>
      <TextInput
        style={styles.input}
        value={houseNo}
        onChangeText={setHouseNo}
        placeholder="e.g., H-102"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Street / Landmark"
      />

      <TouchableOpacity
        style={[styles.button, isSubmitting && { backgroundColor: "#A9C6F2" }]}
        onPress={handleCreateHouse}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Creating..." : "Create & Continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 16 },
  label: { fontSize: 14, color: "#425569", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#E6EEF9",
    borderWidth: 1,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
