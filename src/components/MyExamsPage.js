import React, { useEffect, useState } from 'react';
import { Card, List, Spin, Typography } from 'antd';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';


const { Title } = Typography;

const MyExamsPage = () => {
  const [userExams, setUserExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const fetchUserExams = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserExams(userData.exams || []);
          }
        } catch (error) {
          console.error('Error fetching user exams:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserExams();
  }, [user]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  }

  return (
    <div style={{ padding: '24px' }}>

      <Title level={2}>My Exams</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={userExams}
        renderItem={(exam) => (
          <List.Item>
            <Card title={`Exam ID: ${exam.examId}`}>
              <p>Score: {exam.score}</p>
              <p>Date: {new Date(exam.timestamp.seconds * 1000).toLocaleDateString()}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyExamsPage;