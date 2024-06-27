import React, { useState } from "react";
import { Flex, Button, Input, Typography } from 'antd';

import QuestionPage from "./QuestionPage"; 




const { Title } = Typography;

const QuizScreen = () => {

  const [examStarted, setExamStarted] = useState(false);
  const [examId, setExamId] = useState("");

  const startExam = () => {
    if (examId.trim() === "") {
      alert("Please enter a valid exam code");
      return;
    }
    setExamStarted(true);
  };

  return (
    <div>
      {examStarted ? (
            <QuestionPage examId={examId} />
          ) : (
            <Flex gap="middle" align="center" vertical>
              <Title level={5}>Please type exam id</Title>
              <Input style={{width: "500px", textAlign: "center"}} value={examId} onChange={(e) => setExamId(e.target.value)} />
              <Button type="primary" onClick={startExam}>
                Start Exam
              </Button>
            </Flex>
          )}
    </div>
  );
};

export default QuizScreen;