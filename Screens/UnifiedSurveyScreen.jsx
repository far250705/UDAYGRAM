import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UnifiedSurveyScreen({ route, navigation }) {
  const { houseId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get(
        "https://backendpmajay.onrender.com/api/surveys/questions",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const domains = res.data?.domains || {};

      // Convert backend format → flat question list
      const allQuestions = Object.values(domains).flatMap((domain) =>
        domain.indicators.map((ind, index) => ({
          key: ind.id,                 // UNIQUE KEY
          id: ind.id,                  // backend ID for answers
          question: ind.question,      // correct field
          type: ind.type,              // yes_no or percentage
          domain: domain.name,
        }))
      );

      setQuestions(allQuestions);
    } catch (err) {
      console.log("Error loading questions:", err);
      Alert.alert("Error loading questions");
    }
  };

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitSurvey = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("token");

    // Convert {id:value} → [{indicatorId, value}]
    const answersArray = Object.entries(answers).map(([id, value]) => ({
      indicatorId: id,
      value: value,
    }));

    const payload = {
      houseId,
      answers: answersArray,
      latitude: 0,
      longitude: 0,
    };

    console.log("FINAL PAYLOAD:", payload);

    await axios.post(
      "https://backendpmajay.onrender.com/api/surveys/submit-v2",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Alert.alert("Success", "Survey submitted");
    navigation.navigate("Home");
  } catch (err) {
    console.log("Submit Error:", err.response?.data || err.message);
    Alert.alert("Error submitting survey");
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unified Survey</Text>

      {questions.map((q) => (
        <View key={q.key} style={styles.questionBox}>
          <Text style={styles.q}>{q.question}</Text>

          {/** YES / NO TYPE */}
          {q.type === "yes_no" ? (
  <View style={{ flexDirection: "row", marginTop: 10 }}>
    <TouchableOpacity
      style={[
        styles.yesNoBtn,
        answers[q.id] === 1 && styles.selectedBtn,   // highlight when Yes is selected
      ]}
      onPress={() => updateAnswer(q.id, 1)}
    >
      <Text
        style={[
          styles.yesNoText,
          answers[q.id] === 1 && styles.selectedText,
        ]}
      >
        Yes
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.yesNoBtn,
        answers[q.id] === 0 && styles.selectedBtn,   // highlight when No is selected
      ]}
      onPress={() => updateAnswer(q.id, 0)}
    >
      <Text
        style={[
          styles.yesNoText,
          answers[q.id] === 0 && styles.selectedText,
        ]}
      >
        No
      </Text>
    </TouchableOpacity>
  </View>
) : null}


          {/** PERCENTAGE TYPE */}
          {q.type === "percentage" ? (
            <>
              <View style={{ paddingVertical: 10 }}>
  <Slider
    minimumValue={0}
    maximumValue={100}
    step={1}
    value={answers[q.id] || 0}
    onValueChange={(v) => updateAnswer(q.id, v)}
    style={{ width: "100%", height: 40 }}   // REDUCED TOUCH AREA
  />
</View>

              <Text style={styles.score}>
                {answers[q.id] || 0}%
              </Text>
            </>
          ) : null}
        </View>
      ))}

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={submitSurvey}
        disabled={loading}
      >
        <Text style={styles.submitTxt}>
          {loading ? "Submitting..." : "Submit Survey"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  questionBox: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  q: { fontSize: 16, fontWeight: "600" },
  yesNoBtn: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 10,
  },
  score: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
  submitBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitTxt: { color: "white", fontSize: 18, fontWeight: "bold" },
  yesNoBtn: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 10,
  },
  yesNoText: {
    color: "#000",
  },
  selectedBtn: {
    backgroundColor: "green",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});
