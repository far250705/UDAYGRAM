// DomainDetailsScreen.jsx
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function DomainDetailsScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(null); // "poor" | "medium" | "good"
  const [captured, setCaptured] = useState(null); // mock uri

  function captureMock() {
    // just a mock action — toggles a placeholder "captured" state
    setCaptured("mock-image"); // in real app you'll launch camera
  }

  // fields are immutable after saved — so we reflect that in UI by disabling inputs after save.
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Domain: Drinking Water & Sanitation</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Describe Issue / Observation</Text>
        <TextInput
          style={[styles.input, saved && { backgroundColor: "#F0F3FA" }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Write a brief description..."
          multiline
          editable={!saved}
        />

        <Text style={[styles.label, { marginTop: 10 }]}>Rating</Text>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <TouchableOpacity
            style={[styles.tag, rating === "poor" && styles.tagSelected]}
            onPress={() => !saved && setRating("poor")}
          >
            <Text style={[styles.tagText, rating === "poor" && { color: "#7A1B1B" }]}>Poor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tag, { marginLeft: 8 }, rating === "medium" && styles.tagSelectedMedium]}
            onPress={() => !saved && setRating("medium")}
          >
            <Text style={[styles.tagText, rating === "medium" && { color: "#744C00" }]}>Medium</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tag, { marginLeft: 8 }, rating === "good" && styles.tagSelectedGood]}
            onPress={() => !saved && setRating("good")}
          >
            <Text style={[styles.tagText, rating === "good" && { color: "#0A6C33" }]}>Good</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 14 }]}>Photo Evidence</Text>
        <TouchableOpacity style={styles.cameraBox} onPress={captureMock} disabled={saved}>
          {captured ? (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: "#fff" }}>Captured Image</Text>
            </View>
          ) : (
            <Text style={{ color: "#556575" }}>Capture Image</Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 14 }}>
          <TouchableOpacity style={[styles.saveBtn, saved && { backgroundColor: "#E6EEF9" }]} onPress={save}>
            <Text style={{ color: saved ? "#667B8A" : "#fff", fontWeight: "700" }}>{saved ? "Saved (Immutable)" : "Save"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={{ color: "#0B62CC", fontWeight: "700" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 18, fontWeight: "700", color: "#0B3D91", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 10, margin: 16, padding: 14, borderColor: "#E6EEF9", borderWidth: 1 },
  label: { color: "#425569", fontWeight: "600", marginBottom: 6 },
  input: {
    minHeight: 80,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#E6EEF9",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6EEF9",
    backgroundColor: "#fff",
  },
  tagSelected: { backgroundColor: "#FDECEC", borderColor: "#E6B7B7" },
  tagSelectedMedium: { backgroundColor: "#FFF7E6", borderColor: "#F2D7A0" },
  tagSelectedGood: { backgroundColor: "#E9F7EF", borderColor: "#C6E8D0" },
  tagText: { color: "#425569", fontWeight: "700" },

  cameraBox: {
    marginTop: 10,
    minHeight: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6EEF9",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
  width: "100%",
  height: 120, // same as cameraBox minHeight
  backgroundColor: "#0B62CC",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
},


  saveBtn: { backgroundColor: "#0B62CC", padding: 12, borderRadius: 8, minWidth: 120, alignItems: "center" },
  cancelBtn: { padding: 12, borderRadius: 8, minWidth: 120, alignItems: "center", justifyContent: "center" },
});
