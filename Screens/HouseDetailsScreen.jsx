import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HouseDetailsScreen({ route, navigation }) {
  const { houseId, surveyStatus } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>House Details</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.label}>House ID</Text>
        <Text style={styles.value}>{houseId}</Text>

        <Text style={styles.label}>Survey Status</Text>
        <Text
          style={[
            styles.status,
            surveyStatus === "completed"
              ? styles.statusCompleted
              : styles.statusPending,
          ]}
        >
          {surveyStatus === "completed" ? "Completed" : "Pending"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startSurveyBtn}
        onPress={() =>
          navigation.navigate("UnifiedSurvey", { houseId: houseId })
        }
      >
        <Text style={styles.startSurveyText}>
          {surveyStatus === "completed" ? "Edit Survey" : "Start Survey"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#F3F4F6",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  detailsCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 12,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },

  status: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  statusCompleted: {
    backgroundColor: "#16A34A20",
    color: "#16A34A",
  },

  statusPending: {
    backgroundColor: "#DC262620",
    color: "#DC2626",
  },

  startSurveyBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  startSurveyText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "700",
  },
});
