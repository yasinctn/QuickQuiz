import React, { useState, useEffect } from "react";
import { Progress, Button, Typography, Radio, Space } from "antd";
import { db } from "../firebase";
const { Title } = Typography;

const QuestionPage = ({ examId = "0GK101" }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const examDoc = await db.collection('Exams').doc(examId).get();
        if (examDoc.exists) {
          setQuestions(examDoc.data().questions);
        } else {
          throw new Error("Exam does not exist");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setProgress(0);
    } else {
      console.log("Exam finished!");
      // Sınav bittiğinde yapılacak işlemler
    }
  };

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div>
      <Progress percent={progress} status="active" />
      <Title level={4}>{questions[currentQuestionIndex].question}</Title>
      <Radio.Group onChange={onOptionChange} value={selectedOption}>
        <Space direction="vertical">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <Button type="primary" onClick={nextQuestion} style={{ marginTop: 20 }}>
        İleri
      </Button>
    </div>
  );
};

export default QuestionPage;
