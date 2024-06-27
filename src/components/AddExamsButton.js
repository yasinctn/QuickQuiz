import React from "react";
import { db } from "../firebase"; // Firebase yapılandırma dosyanızı import edin
import { setDoc, doc } from "firebase/firestore";

const addSampleExams = async () => {
  const exams = [
    {
      examId: "GE101",
      questions: [
        {
          id: "q1",
          question: "Which is the largest continent?",
          options: ["Asia", "Africa", "Europe", "Australia"],
          correctOption: "Asia"
        },
        {
          id: "q2",
          question: "What is the capital of Australia?",
          options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
          correctOption: "Canberra"
        },
        {
          id: "q3",
          question: "Which is the longest river in the world?",
          options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
          correctOption: "Nile"
        },
        {
          id: "q4",
          question: "Which country has the largest population?",
          options: ["China", "India", "USA", "Indonesia"],
          correctOption: "China"
        },
        {
          id: "q5",
          question: "Which is the smallest country by area?",
          options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
          correctOption: "Vatican City"
        },
      ],
    },
    {
      examId: "LG101",
      questions: [
        {
          id: "q1",
          question: "If all bloops are razzies and all razzies are lazzies, are all bloops lazzies?",
          options: ["Yes", "No", "Maybe", "None of the above"],
          correctOption: "Yes"
        },
        {
          id: "q2",
          question: "If it rains, then the ground will be wet. It is raining. What can you conclude?",
          options: ["The ground is wet", "The ground is dry", "It is cloudy", "None of the above"],
          correctOption: "The ground is wet"
        },
        {
          id: "q3",
          question: "If Tom is taller than Jerry and Jerry is taller than Mike, who is the shortest?",
          options: ["Tom", "Jerry", "Mike", "Cannot be determined"],
          correctOption: "Mike"
        },
        {
          id: "q4",
          question: "All apples are fruits. Some fruits are oranges. Are all apples oranges?",
          options: ["Yes", "No", "Maybe", "None of the above"],
          correctOption: "No"
        },
        {
          id: "q5",
          question: "If 2 + 2 = 4 and 3 + 3 = 6, what is 4 + 4?",
          options: ["6", "8", "10", "12"],
          correctOption: "8"
        },
      ],
    }
  ];

  try {
    for (const exam of exams) {
      const examDocRef = doc(db, "Exams", exam.examId);
      await setDoc(examDocRef, exam);
    }

    console.log("Exams added successfully!");
  } catch (error) {
    console.error("Error adding exams: ", error);
  }
};

const AddExamsButton = () => {
  return (
    <button onClick={addSampleExams}>Add Sample Exams</button>
  );
};

export default AddExamsButton;