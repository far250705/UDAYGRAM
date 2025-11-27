// SurveyTypeScreen.jsx
import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SurveyTypeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Survey Type</Text>
        <Text style={styles.subtitle}>Complete both surveys to enable submit</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('HouseholdSurvey')}>
          <Text style={styles.buttonPrimaryText}>Household Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('InfrastructureSurvey')}>
          <Text style={styles.buttonOutlineText}>Infrastructure Survey</Text>
        </TouchableOpacity>

        <View style={styles.noteCard}>
          <Text style={{ fontWeight: "600", color: "#0B62CC" }}>Note</Text>
          <Text style={{ color: "#556575", marginTop: 6 }}>
            Both household and infrastructure surveys must be completed for each house before submission.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  header: { padding: 20 },
  title: { fontSize: 22, color: "#0B3D91", fontWeight: "700" },
  subtitle: { color: "#667B8A", marginTop: 6 },
  actions: { padding: 20 },
  buttonPrimary: { backgroundColor: "#0B62CC", padding: 14, borderRadius: 10, marginBottom: 12, alignItems: "center" },
  buttonPrimaryText: { color: "#fff", fontWeight: "700" },
  buttonOutline: { borderWidth: 1, borderColor: "#0B62CC", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonOutlineText: { color: "#0B62CC", fontWeight: "700" },
  noteCard: {
    marginTop: 18,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6EEF9",
  },
});
