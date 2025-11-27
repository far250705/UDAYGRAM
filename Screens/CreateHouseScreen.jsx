// CreateHouseScreen.jsx
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function CreateHouseScreen({ navigation }) {
  // assume village/district prefilled from registration (mocked here)
  const [houseNo, setHouseNo] = useState("");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("Mockpur");
  const [district, setDistrict] = useState("Mockdistrict");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Create House</Text>

        <Text style={styles.label}>House Number</Text>
        <TextInput style={styles.input} value={houseNo} onChangeText={setHouseNo} placeholder="e.g., H-102" />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Street / Landmark" />

        <Text style={styles.label}>Village Name</Text>
        <TextInput style={styles.input} value={village} onChangeText={setVillage} placeholder="Village" />

        <Text style={styles.label}>District Name</Text>
        <TextInput style={styles.input} value={district} onChangeText={setDistrict} placeholder="District" />

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('SurveyType')}>
          <Text style={styles.primaryButtonText}>Proceed to Survey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 16 },
  label: { fontSize: 13, color: "#425569", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#E6EEF9",
    borderWidth: 1,
    marginBottom: 12,
  },
  primaryButton: { backgroundColor: "#0B62CC", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  primaryButtonText: { color: "#fff", fontWeight: "600" },
});
