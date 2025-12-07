import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewHousesScreen({ navigation }) {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://backendpmajay.onrender.com/api/surveys/houses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setHouses(data.houses);
      }
    } catch (err) {
      console.log("Fetch Houses Error:", err);
    }
  };

  const renderHouse = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.houseNo}>{item.houseNumber}</Text>
          <Text style={styles.addr}>{item.address || "No address"}</Text>
        </View>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() =>
            navigation.navigate("HouseDetails", {
              houseId: item._id,
              surveyStatus: item.surveyStatus,
            })
          }
        >
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Houses</Text>

      <FlatList
        data={houses}
        keyExtractor={(i) => i._id}
        renderItem={renderHouse}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1F2937",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginBottom: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  houseNo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  addr: {
    marginTop: 4,
    fontSize: 15,
    color: "#6B7280",
  },

  viewBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  viewBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
