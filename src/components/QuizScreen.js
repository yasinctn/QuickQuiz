import React, { useState } from "react";
import { Flex, Button, Input, Typography, Layout, Menu, theme, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import QuestionPage from "./components/QuestionPage";

import { auth } from "./firebase";



const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [examStarted, setExamStarted] = useState(false); // Sınavın başlatılıp başlatılmadığını kontrol edeceğiz
  const [selectedMenu, setSelectedMenu] = useState('exam');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onChange = (text) => {
    //alınan sınav id si
    console.log('onChange:', text);
  };
  const sharedProps = {
    onChange,
  };

  const startExam = () => {
    setExamStarted(true); 
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleSignOut = () => {
    
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });

  };

 
  return (

<Layout>
<Sider trigger={null} collapsed={collapsed}>
  <div className="demo-logo-vertical" />
  <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['exam']}
    onClick={handleMenuClick}
    items={[
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Profile',
        children: [
          {
            key: 'myExams',
            icon: <ProfileOutlined />,
            label: 'My Exams',
          },
        ],
      },
      {
        key: 'exam',
        icon: <SettingOutlined />,
        label: 'Exam',
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
        children: [
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Sign Out',
            onClick: handleSignOut,
          },
        ],
      },
    ]}
  />
</Sider>
<Layout>
  <Header
    style={{
      padding: 0,
      background: colorBgContainer,
    }}
  >
    <Flex>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Flex>
  </Header>
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 700,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
  >
    {examStarted ? (
      <QuestionPage />
    ) : (
      <Flex gap="middle" align="center" vertical>
        <Title level={5}>Please type exam id</Title>
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
        
        <Button type="primary" onClick={startExam}>
          Sınava Gir
        </Button>
      </Flex>
    )}
  </Content>
</Layout>
</Layout>
  );
};
export default App;