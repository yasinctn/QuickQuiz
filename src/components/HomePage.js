import React, { useState } from "react";
import { Layout, Menu, Button, Typography, Input, Space, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { auth } from "../firebase";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('exam');
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onChange = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps = {
    onChange,
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      auth.signOut().then(() => {
        console.log('User signed out');
        navigate('/login');
      }).catch((error) => {
        console.error('Sign out error', error);
      });
    } else {
      setSelectedMenu(e.key);
      navigate(`/${e.key}`);
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
          <Button
            type="primary"
            style={{ float: 'right', marginRight: '16px' }}
            onClick={() => navigate('/login')}
          >
            Giriş Yap
          </Button>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;