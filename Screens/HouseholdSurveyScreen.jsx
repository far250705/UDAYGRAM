
// ✅ FIXED HOUSEHOLD SURVEY SCREEN
import React, { useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QUESTIONS = [
  "Are children (6-10 yrs) attending primary school?",
  "Are children (11-13 yrs) attending middle school?",
  "Are eligible SC students receiving pre-matric scholarship?",
  "Do households have individual toilets (IHHL)?",
  "Are households covered under any health protection scheme?",
  "Are pregnant women receiving regular antenatal care?",
  "Are children fully immunized (<1 year)?",
  "Does the household have a bank account (Jan Dhan)?",
  "Is Aadhaar possession >95% in household?",
  "Is at least one member part of an SHG / livelihood group?",
];

export default function HouseholdSurveyScreen({ navigation, route }) {
  const { houseId } = route.params;

  const [answers, setAnswers] = useState(
    QUESTIONS.map(() => ({ yesNo: null, score: null }))
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [tempScore, setTempScore] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIXED: requires BOTH yes/no AND score
  const allAnswered = useMemo(
    () => answers.every(a => a.yesNo !== null || a.score !== null),
    [answers]
  );

  const setYesNo = (index, value) => {
    const updated = [...answers];
    updated[index].yesNo = value;
    setAnswers(updated);
  };

  const openScore = (index) => {
    setActiveQ(index);
    setTempScore(answers[index].score ?? 5);
    setModalVisible(true);
  };

  const saveScore = () => {
    const updated = [...answers];
    updated[activeQ].score = tempScore;
    setAnswers(updated);
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      Alert.alert("Error", "Please answer all questions and assign scores");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = await AsyncStorage.getItem("token");

      // ❗ Backend expects { answer: "yes", score: 8 }
      const formattedAnswers = answers.map(a => ({
        answer: a.yesNo,
        score: a.score,
      }));

      const response = await fetch(
        "https://backendpmajay.onrender.com/api/surveys/submit-v2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ houseId, answers: formattedAnswers }),
        }
      );

      const data = await response.json();
      console.log("Household Submit API Response:", data);

      if (!data.success) {
        Alert.alert("Error", data.message || "Failed to submit survey");
        setIsSubmitting(false);
        return;
      }

      // BACKEND RETURNS survey._id
      const surveyId = data.survey?._id;

      if (!surveyId) {
        Alert.alert("Error", "Survey ID missing from backend response.");
        setIsSubmitting(false);
        return;
      }

      Alert.alert("Success", "Household survey submitted successfully");

      // ✅ FIXED: must pass surveyId to next screen
      navigation.navigate("InfrastructureSurvey", { surveyId: data.survey._id });


      setIsSubmitting(false);
    } catch (err) {
      console.log("Submit household error:", err);
      Alert.alert("Error", "Network / server error");
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#F7FAFF" }}>
      <Text style={styles.title}>Household Survey</Text>

      {QUESTIONS.map((q, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.qIndex}>Q{i + 1}</Text>
          <Text style={styles.qText}>{q}</Text>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.optionButton, answers[i].yesNo === "yes" && styles.optionSelected]}
              onPress={() => setYesNo(i, "yes")}
            >
              <Text style={[styles.optionText, answers[i].yesNo === "yes" && styles.optionTextSelected]}>YES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, answers[i].yesNo === "no" && styles.optionSelected]}
              onPress={() => setYesNo(i, "no")}
            >
              <Text style={[styles.optionText, answers[i].yesNo === "no" && styles.optionTextSelected]}>NO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scoreButton} onPress={() => openScore(i)}>
              <Text style={styles.scoreButtonText}>
                {answers[i].score !== null ? `Score: ${answers[i].score}` : "Score (1-10)"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.submitButton, (!allAnswered || isSubmitting) && { backgroundColor: "#A9C6F2" }]}
        disabled={!allAnswered || isSubmitting}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Submitting..." : "Complete Household Survey"}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>Select score (1-10)</Text>

            <Slider
              minimumValue={1}
              maximumValue={10}
              value={tempScore}
              step={1}
              onValueChange={setTempScore}
              style={{ width: "100%", marginVertical: 10 }}
            />

            <Text style={{ fontSize: 20, textAlign: "center" }}>{tempScore}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveScore} style={styles.saveBtn}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderColor: "#E6EEF9",
    borderWidth: 1,
  },
  qIndex: { fontSize: 12, color: "#0B62CC", fontWeight: "700", marginBottom: 6 },
  qText: { fontSize: 15, color: "#233444", marginBottom: 8 },
  optionsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderColor: "#DCEBF9",
    borderWidth: 1,
    backgroundColor: "#fff",
    minWidth: 80,
    alignItems: "center",
  },
  optionSelected: { backgroundColor: "#E6F0FF", borderColor: "#0B62CC" },
  optionText: { color: "#425569", fontWeight: "600" },
  optionTextSelected: { color: "#0B62CC" },
  scoreButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#E6EEF9",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  scoreButtonText: { color: "#425569", fontWeight: "600" },
  submitButton: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    margin: 16,
  },
  submitButtonText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(20,30,40,0.45)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: "#fff", borderRadius: 10, padding: 18 },
  modalAction: { padding: 12, borderRadius: 8, minWidth: 100, alignItems: "center" },
});
