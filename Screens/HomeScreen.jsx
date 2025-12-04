import React, { useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const houseCount = 24;

  useEffect(() => {
    if (route.params?.fromSurvey) {
      Alert.alert("Success", "Survey completed successfully!");
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UDAY GRAM</Text>
        <Text style={styles.subtitle}>Adarsh Gram — Field Operations</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Houses</Text>
          <Text style={styles.cardValue}>{houseCount}</Text>
        </View>

        <TouchableOpacity style={styles.largeButton} onPress={() => navigation.navigate('CreateHouse')}>
          <Text style={styles.largeButtonText}>Create a House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.largeButtonOutline} onPress={() => navigation.navigate('DomainList')}>
          <Text style={styles.largeButtonOutlineText}>Physical Verification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewHouses} onPress={() => navigation.navigate('ViewHouses')}>
          <Text style={styles.viewHousesText}>View Houses</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Navbar */}
<View style={styles.bottomNav}>
  <TouchableOpacity onPress={() => navigation.navigate("Projects")}>
    <Text style={styles.navItem}>Projects</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
    <Text style={styles.navItem}>Map</Text>
  </TouchableOpacity>
</View>

    </SafeAreaView>
  );
}

// (Styles unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  header: { padding: 20, paddingTop: 36 },
  title: { fontSize: 28, fontWeight: "700", color: "#0B3D91" },
  subtitle: { color: "#556575", marginTop: 6 },
  content: { padding: 20 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 10, borderColor: "#E6EEF9", borderWidth: 1, marginBottom: 16, alignItems: "center" },
  cardLabel: { color: "#667B8A", fontSize: 13 },
  cardValue: { fontSize: 26, fontWeight: "700", color: "#0B62CC", marginTop: 6 },
  largeButton: { backgroundColor: "#0B62CC", padding: 16, borderRadius: 10, alignItems: "center", marginBottom: 12 },
  largeButtonText: { color: "#fff", fontWeight: "700" },
  largeButtonOutline: { borderWidth: 1, borderColor: "#0B62CC", padding: 16, borderRadius: 10, alignItems: "center", marginBottom: 12, backgroundColor: "#fff" },
  largeButtonOutlineText: { color: "#0B62CC", fontWeight: "700" },
  viewHouses: { marginTop: 10, alignItems: "center" },
  viewHousesText: { color: "#556575", textDecorationLine: "underline"},
  content: {
  padding: 20,
  content: { padding: 20 },
 // prevents overlap with bottom nav
},

bottomNav: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderColor: "#ccc",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
},

navItem: {
  fontSize: 16,
  color: "#0B62CC",
  fontWeight: "600",
},

});
