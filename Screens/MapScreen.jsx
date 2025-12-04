import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function MapScreen() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        "https://backendpmajay.onrender.com/api/verifications/map",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 12.9901,
        longitude: 80.2333,
        latitudeDelta: 1,
        longitudeDelta: 1
      }}
    >
      {projects.map((p) => (
        <Marker
          key={p._id}
          coordinate={{
            latitude: p.location.coordinates[1],
            longitude: p.location.coordinates[0]
          }}
          title={p.projectName}
          description={p.schemeName || "Project"}
        />
      ))}
    </MapView>
  );
}
