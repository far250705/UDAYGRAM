// DomainListScreen.jsx
import React from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const DOMAINS = [
  { id: "d1", name: "Drinking Water & Sanitation" },
  { id: "d2", name: "Education" },
  { id: "d3", name: "Health & Nutrition" },
  { id: "d4", name: "Social Security" },
  { id: "d5", name: "Rural Roads & Housing" },
  { id: "d6", name: "Electricity & Clean Fuel" },
  { id: "d7", name: "Agricultural Practices" },
  { id: "d8", name: "Financial Inclusion" },
  { id: "d9", name: "Digitization" },
  { id: "d10", name: "Livelihood & Skill Development" },
];

export default function DomainListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Physical Verification Domains</Text>

      <FlatList
        data={DOMAINS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DomainDetails', { domainId: item.id, domainName: item.name })}>
            <Text style={styles.domainName}>{item.name}</Text>
            <Text style={styles.domainHint}>Tap to enter observation & capture evidence</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { padding: 16, fontSize: 20, fontWeight: "700", color: "#0B3D91" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6EEF9",
    marginBottom: 12,
  },
  domainName: { fontWeight: "700", color: "#0B62CC" },
  domainHint: { marginTop: 8, color: "#667B8A", fontSize: 13 },
});
