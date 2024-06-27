import React, { useState, useEffect, useCallback } from "react";
import { Progress, Button, Typography, Radio, Space, Spin } from "antd";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const QuestionPage = ({ examId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useAuthState(getAuth());
  const [userAnswers, setUserAnswers] = useState([]);
  const [hasTakenExam, setHasTakenExam] = useState(false);
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const examDoc = await getDoc(doc(db, 'Exams', examId));
        if (examDoc.exists()) {
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

    const checkUserExam = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const examTaken = userData.exams.some(exam => exam.examId === examId);
          setHasTakenExam(examTaken);
        }
      }
    };
    fetchQuestions();
    checkUserExam();
  }, [examId, user]);

  const nextQuestion = useCallback(() => {
    const updatedUserAnswers = [
      ...userAnswers,
      { questionId: questions[currentQuestionIndex].id, answer: selectedOption || "" }
    ];
    setUserAnswers(updatedUserAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(0);
      setRemainingTime(30);
    } else {
      saveResults(updatedUserAnswers);
      navigate('/myExams');
    }
  }, [currentQuestionIndex, questions, selectedOption, userAnswers, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextQuestion();
          return 0;
        }
        return prev + 3.33; 
      });

      setRemainingTime((prev) => {
        if (prev <= 1) {
          nextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, [currentQuestionIndex, selectedOption, nextQuestion]);

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const saveResults = async (finalAnswers) => {
    const score = calculateScore(finalAnswers);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        exams: arrayUnion({
          examId: examId,
          answers: finalAnswers,
          score: score,
          timestamp: new Date()
        })
      });
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const calculateScore = (answers) => {
    let score = 0;
    let wrongAnswersCount = 0;

    answers.forEach((answer, index) => {
      if (answer.answer === questions[index].correctOption) {
        score += 1;
      } else {
        wrongAnswersCount += 1;
      }
    });

    // 4 yanlış bir doğru
    if (wrongAnswersCount >= 4) {
      score = Math.max(score - 1, 0);
    }

    return score * 10;
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (hasTakenExam) {
    return <div>You have already taken this exam.</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={4}>{`Time remaining: ${remainingTime} seconds`}</Title>
        <Progress  percent={progress} status="success" />
      </div>
      <div>
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
      </div>
      <Button type="primary" onClick={nextQuestion} style={{ marginTop: 20 }}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
      </Button>
    </div>
  );
};

export default QuestionPage;