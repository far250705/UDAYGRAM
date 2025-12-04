import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";   // ⭐ NEW
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProjectDetailScreen({ route }) {
  const { project } = route.params;

  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // ⭐ NEW — store GPS values
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // ------------------------------------------------
  // ⭐ FETCH CURRENT LOCATION ON SCREEN OPEN
  // ------------------------------------------------
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied!");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude.toString());
      setLongitude(loc.coords.longitude.toString());
    })();
  }, []);

  const capturePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission denied");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ------------------------------------------------
  // ⭐ UPLOAD FUNCTION WITH GPS VALUES
  // ------------------------------------------------
  const uploadVerification = async () => {
    if (!imageUri) {
      alert("Please capture a photo first!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("progressPercentage", "50");
      formData.append("workStatus", "in_progress");

      // ⭐ SEND LOCATION
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("address", "Auto-detected Location");

      formData.append("photo", {
        uri: imageUri,
        name: "verification.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        `https://backendpmajay.onrender.com/api/verifications/upload/${project._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("UPLOAD RESPONSE:", data);

      if (data.success) {
        alert("Uploaded Successfully!");
        setDescription("");
        setImageUri(null);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.log("Upload error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.heading}>{project.projectName || project.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Write project description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* ⭐ Latitude Input */}
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />

      {/* ⭐ Longitude Input */}
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={capturePhoto}>
        <Text style={styles.buttonText}>Capture Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={uploadVerification}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#0B3D91",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    height: 55,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0B62CC",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
