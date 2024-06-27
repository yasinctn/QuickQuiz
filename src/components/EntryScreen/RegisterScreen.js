import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Button, Form, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import AlertView from '../AlertView';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        exams: []
      });

      setError(null);
      setSuccess("Kayıt başarılı, hoşgeldiniz!");
      console.log('User registered:', user);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setError('Form submission failed. Please check the fields and try again.');
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
      > 
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      {error && 
        <AlertView 
          type="warning" 
          title="Hata" 
          description={error} 
        />} 
      {success &&
        <AlertView
          type='success'
          title='Kayıt Başarılı'
          description={success}
        />
      }
    </div>
  );
};

export default Register;