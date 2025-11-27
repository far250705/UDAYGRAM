import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Slider from "@react-native-community/slider";

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

export default function InfrastructureSurveyScreen({ navigation }) {
  const [answers, setAnswers] = useState(QUESTIONS.map(() => ({ yesNo: null, score: null })));
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [tempScore, setTempScore] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false); // NEW

  function setYN(i, v) {
    const copy = [...answers];
    copy[i] = { ...copy[i], yesNo: v };
    setAnswers(copy);
  }

  function openScore(i) {
    setActive(i);
    setTempScore(answers[i].score ?? 5);
    setModalVisible(true);
  }

  function saveScore() {
    const copy = [...answers];
    copy[active] = { ...copy[active], score: tempScore };
    setAnswers(copy);
    setModalVisible(false);
  }

  const allAnswered = answers.every((a) => a.yesNo !== null || a.score !== null);

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
                style={[styles.option, answers[i].yesNo === "yes" && styles.optionSel]}
                onPress={() => !isSubmitted && setYN(i, "yes")}
                disabled={isSubmitted}
              >
                <Text style={[styles.optText, answers[i].yesNo === "yes" && { color: "#0B62CC" }]}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, answers[i].yesNo === "no" && styles.optionSel]}
                onPress={() => !isSubmitted && setYN(i, "no")}
                disabled={isSubmitted}
              >
                <Text style={[styles.optText, answers[i].yesNo === "no" && { color: "#0B62CC" }]}>NO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scoreBtn}
                onPress={() => !isSubmitted && openScore(i)}
                disabled={isSubmitted}
              >
                <Text style={styles.scoreText}>{answers[i].score ? `Score: ${answers[i].score}` : "Score (1-10)"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
  style={[styles.submit, !allAnswered && { backgroundColor: "#A9C6F2" }]}
  disabled={!allAnswered}
  onPress={() => {
    setIsSubmitted(true);
    navigation.navigate("Home");
  }}
>
  <Text style={styles.submitText}>Complete Infrastructure Survey</Text>
</TouchableOpacity>

      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>Select Score (1-10)</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={tempScore}
              onValueChange={(v) => setTempScore(v)}
            />
            <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 8 }}>{tempScore}</Text>
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
  title: { fontSize: 20, fontWeight: "700", color: "#0B3D91", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: "#E6EEF9" },
  qIndex: { color: "#0B62CC", fontWeight: "700", marginBottom: 8 },
  qText: { fontSize: 15, color: "#233444", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  option: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#DCEBF9", minWidth: 80, alignItems: "center" },
  optionSel: { backgroundColor: "#E6F0FF", borderColor: "#0B62CC" },
  optText: { fontWeight: "600", color: "#425569" },
  scoreBtn: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#E6EEF9", alignItems: "center" },
  scoreText: { fontWeight: "600" },
  submit: { backgroundColor: "#0B62CC", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  submitText: { color: "#fff", fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(16,24,32,0.45)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: "#fff", padding: 16, borderRadius: 10 },
  modalAction: { padding: 12, minWidth: 100, alignItems: "center", borderRadius: 8 },
});
