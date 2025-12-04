import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
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
  "Are sustainable drinking water sources available to cover the village?",
  "% of drains available along internal roads (is it adequate?)",
  "Have toilets been provided in all schools and Anganwadis?",
  "Are existing drains functioning?",
  "% of solid & liquid waste being disposed effectively",
  "Is the village connected by all-weather roads?",
  "What % of internal roads are pakka (CC/brick/tiled)?",
  "Does the village have electricity / electrification?",
  "Does the village have internet connectivity?",
  "Does the village have a Common Service Centre (CSC)?",
];

export default function InfrastructureSurveyScreen({ navigation, route }) {
  const { surveyId } = route.params;     // <-- IMPORTANT FIX

  const [answers, setAnswers] = useState(
    QUESTIONS.map(() => ({ yesNo: null, score: null }))
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [tempScore, setTempScore] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate all questions
  const allAnswered = useMemo(
    () => answers.every(a => a.yesNo !== null || a.score !== null),
    [answers]
  );

  const setYesNo = (index, value) => {
    const copy = [...answers];
    copy[index].yesNo = value;
    setAnswers(copy);
  };

  const openScore = (index) => {
    setActiveIndex(index);
    setTempScore(answers[index].score ?? 5);
    setModalVisible(true);
  };

  const saveScore = () => {
    const copy = [...answers];
    copy[activeIndex].score = tempScore;
    setAnswers(copy);
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      Alert.alert("Error", "Please answer all questions and assign scores.");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await AsyncStorage.getItem("token");

      const payload = {
        surveyId,      // <-- CRITICAL FIX
        infrastructureAnswers: answers.map(a => ({
          answer: a.yesNo,
          score: a.score
        }))
      };

      const response = await fetch(
        "https://backendpmajay.onrender.com/api/surveys/submit-infrastructure",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Infra Submit Response:", data);

      if (!data.success) {
        Alert.alert("Error", data.message || "Failed to submit infrastructure survey");
        setIsSubmitting(false);
        return;
      }

      Alert.alert("Success", "Infrastructure survey submitted successfully!");
      navigation.navigate("Home");     // or SurveyType if needed
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Network or server error");
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Infrastructure Survey</Text>

        {QUESTIONS.map((q, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.qIndex}>Q{i + 1}</Text>
            <Text style={styles.qText}>{q}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.option,
                  answers[i].yesNo === "yes" && styles.optionSel,
                ]}
                onPress={() => setYesNo(i, "yes")}
              >
                <Text style={styles.optText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.option,
                  answers[i].yesNo === "no" && styles.optionSel,
                ]}
                onPress={() => setYesNo(i, "no")}
              >
                <Text style={styles.optText}>NO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scoreBtn}
                onPress={() => openScore(i)}
              >
                <Text style={styles.scoreText}>
                  {answers[i].score !== null
                    ? `Score: ${answers[i].score}`
                    : "Score (1-10)"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.submit,
            (!allAnswered || isSubmitting) && { backgroundColor: "#A9C6F2" },
          ]}
          disabled={!allAnswered || isSubmitting}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            {isSubmitting ? "Submitting..." : "Submit Infrastructure Survey"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Score Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>Select Score (1-10)</Text>

            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={tempScore}
              onValueChange={setTempScore}
              style={{ width: "100%", marginVertical: 10 }}
            />

            <Text style={{ textAlign: "center", fontSize: 20 }}>{tempScore}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={styles.modalAction}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalAction, { backgroundColor: "#0B62CC" }]}
                onPress={saveScore}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6EEF9",
    marginBottom: 12,
  },
  qIndex: { color: "#0B62CC", fontWeight: "700", marginBottom: 6 },
  qText: { fontSize: 15, color: "#233444", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  option: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCEBF9",
    minWidth: 80,
    alignItems: "center",
  },
  optionSel: { backgroundColor: "#E6F0FF", borderColor: "#0B62CC" },
  optText: { fontWeight: "600", color: "#425569" },
  scoreBtn: { padding: 10, borderWidth: 1, borderColor: "#E6EEF9", borderRadius: 8 },
  scoreText: { fontWeight: "600" },
  submit: {
    backgroundColor: "#0B62CC",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16,24,32,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: "#fff", padding: 16, borderRadius: 10 },
  modalAction: { padding: 12, minWidth: 100, alignItems: "center", borderRadius: 8 },
});
