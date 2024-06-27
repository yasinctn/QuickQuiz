import React from "react";
import { db } from "../firebase"; 
import { setDoc, doc } from "firebase/firestore";

//firebase e sınav yüklemek için yazdım
const addSampleExams = async () => {
  const exams = [
    {
      "examId": "GE101",
      "questions": [
        {
          id: "q1",
          question: "En büyük kıta hangisidir?",
          options: ["Asya", "Afrika", "Avrupa", "Avustralya"],
          correctOption: "Asya"
        },
        {
          id: "q2",
          question: "Avustralya'nın başkenti neresidir?",
          options: ["Sidney", "Canberra", "Melbourne", "Brisbane"],
          correctOption: "Canberra"
        },
        {
          id: "q3",
          question: "Dünyanın en uzun nehri hangisidir?",
          options: ["Nil", "Amazon", "Yangtze", "Mississippi"],
          correctOption: "Nil"
        },
        {
          id: "q4",
          question: "En kalabalık ülke hangisidir?",
          options: ["Çin", "Hindistan", "ABD", "Endonezya"],
          correctOption: "Çin"
        },
        {
          id: "q5",
          question: "Yüzölçümü bakımından en küçük ülke hangisidir?",
          options: ["Vatikan", "Monako", "San Marino", "Lihtenştayn"],
          correctOption: "Vatikan"
        },
        {
          id: "q6",
          question: "Dünyanın en yüksek dağı hangisidir?",
          options: ["Everest", "K2", "Kangchenjunga", "Lhotse"],
          correctOption: "Everest"
        },
        {
          id: "q7",
          question: "ABD'nin ilk başkanı kimdir?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
          correctOption: "George Washington"
        },
        {
          id: "q8",
          question: "En büyük okyanus hangisidir?",
          options: ["Pasifik", "Atlantik", "Hint", "Arktik"],
          correctOption: "Pasifik"
        },
        {
          id: "q9",
          question: "Dünyanın en büyük çölü hangisidir?",
          options: ["Sahra", "Gobi", "Arabistan", "Kalahari"],
          correctOption: "Sahra"
        },
        {
          id: "q10",
          question: "Mona Lisa tablosunun sanatçısı kimdir?",
          options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
          correctOption: "Leonardo da Vinci"
        }
      ]
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