import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ProjectsScreen({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "https://backendpmajay.onrender.com/api/verifications/projects",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // ✅ Corrected based on backend response
      setProjects(res.data.projects || res.data.data || []);
    } catch (err) {
      console.log("Error loading projects", err.response?.data || err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.heading}>Ongoing Projects</Text>

      {projects.map((p) => (
        <TouchableOpacity
          key={p._id}
          style={styles.card}
          onPress={() => navigation.navigate("ProjectDetail", { project: p })}
        >
          <Text style={styles.name}>{p.projectName || p.name}</Text>
          <Text style={styles.status}>{p.currentStatus || p.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#0B3D91" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "600" },
  status: { marginTop: 6, color: "#0B62CC" },
});
