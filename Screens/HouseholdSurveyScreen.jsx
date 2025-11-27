import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";

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

export default function HouseholdSurveyScreen({ navigation }) {
  const [answers, setAnswers] = useState(QUESTIONS.map(() => ({ yesNo: null, score: null })));
  const [modalVisible, setModalVisible] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [tempScore, setTempScore] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false); // NEW

  function setYesNo(index, value) {
    const copy = [...answers];
    copy[index] = { ...copy[index], yesNo: value };
    setAnswers(copy);
  }

  function openScore(index) {
    setActiveQ(index);
    setTempScore(answers[index].score ?? 5);
    setModalVisible(true);
  }

  function saveScore() {
    const copy = [...answers];
    copy[activeQ] = { ...copy[activeQ], score: tempScore };
    setAnswers(copy);
    setModalVisible(false);
  }

  const allAnswered = answers.every((a) => a.yesNo !== null || a.score !== null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Household Survey</Text>
        {QUESTIONS.map((q, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.qIndex}>Q{i + 1}</Text>
            <Text style={styles.qText}>{q}</Text>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[styles.optionButton, answers[i].yesNo === "yes" && styles.optionSelected]}
                onPress={() => !isSubmitted && setYesNo(i, "yes")}
                disabled={isSubmitted}
              >
                <Text style={[styles.optionText, answers[i].yesNo === "yes" && styles.optionTextSelected]}>
                  YES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, answers[i].yesNo === "no" && styles.optionSelected]}
                onPress={() => !isSubmitted && setYesNo(i, "no")}
                disabled={isSubmitted}
              >
                <Text style={[styles.optionText, answers[i].yesNo === "no" && styles.optionTextSelected]}>
                  NO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scoreButton}
                onPress={() => !isSubmitted && openScore(i)}
                disabled={isSubmitted}
              >
                <Text style={styles.scoreButtonText}>
                  {answers[i].score ? `Score: ${answers[i].score}` : "Score (1-10)"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
  style={[styles.submitButton, !allAnswered && { backgroundColor: "#A9C6F2" }]}
  onPress={() => {
    setIsSubmitted(true);
    navigation.navigate("SurveyType");
  }}
  disabled={!allAnswered}
>
  <Text style={styles.submitButtonText}>Complete Household Survey</Text>
</TouchableOpacity>

      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>Select score (1-10)</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={tempScore}
              onValueChange={(v) => setTempScore(v)}
            />
            <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 6 }}>{tempScore}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalAction}>
                <Text style={{ color: "#556575" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveScore} style={[styles.modalAction, { backgroundColor: "#0B62CC" }]}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// (Styles unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFF" },
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 12, paddingLeft: 4 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 12, marginBottom: 12, borderColor: "#E6EEF9", borderWidth: 1 },
  qIndex: { fontSize: 12, color: "#0B62CC", fontWeight: "700", marginBottom: 6 },
  qText: { fontSize: 15, color: "#233444", marginBottom: 8 },
  optionsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionButton: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderColor: "#DCEBF9", borderWidth: 1, backgroundColor: "#fff", minWidth: 80, alignItems: "center" },
  optionSelected: { backgroundColor: "#E6F0FF", borderColor: "#0B62CC" },
  optionText: { color: "#425569", fontWeight: "600" },
  optionTextSelected: { color: "#0B62CC" },
  scoreButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderColor: "#E6EEF9", borderWidth: 1, backgroundColor: "#fff" },
  scoreButtonText: { color: "#425569", fontWeight: "600" },
  submitButton: { backgroundColor: "#0B62CC", padding: 14, borderRadius: 10, alignItems: "center", margin: 16 },
  submitButtonText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(20,30,40,0.45)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: "#fff", borderRadius: 10, padding: 18 },
  modalAction: { padding: 12, borderRadius: 8, minWidth: 100, alignItems: "center" },
});
