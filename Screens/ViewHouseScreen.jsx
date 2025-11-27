// ViewHousesScreen.jsx
import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const MOCK_HOUSES = [
  { id: "H001", houseNo: "H-101", address: "Near Temple Road", village: "Mockpur", district: "Mockdistrict" },
  { id: "H002", houseNo: "H-102", address: "Station Lane", village: "Mockpur", district: "Mockdistrict" },
  { id: "H003", houseNo: "H-103", address: "Market Street", village: "Mockpur", district: "Mockdistrict" },
];

export default function ViewHousesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Houses</Text>

      <FlatList
        data={MOCK_HOUSES}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.houseNo}>{item.houseNo}</Text>
              <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('HouseDetails', { houseId: item.id })}>
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.addr}>{item.address}</Text>
            <Text style={styles.meta}>{item.village} • {item.district}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 22, fontWeight: "700", color: "#0B3D91", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderColor: "#E6EEF9",
    borderWidth: 1,
  },
  houseNo: { fontWeight: "700", color: "#0B62CC", fontSize: 16 },
  addr: { color: "#425569", marginTop: 6 },
  meta: { color: "#667B8A", marginTop: 6, fontSize: 13 },
  viewBtn: { backgroundColor: "#E6F0FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  viewBtnText: { color: "#0B62CC", fontWeight: "700" },
});
