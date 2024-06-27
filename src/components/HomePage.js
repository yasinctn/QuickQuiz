import React, { useState } from "react";
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

const { Header, Sider, Content } = Layout;


const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('exam');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


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
          selectedKeys={selectedMenu}
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
              key: 'quiz',
              icon: <FileTextOutlined />,
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
          {user ? (
            <div style={{ float: 'right', marginRight: '16px' }}>
              {user.email}
            </div>
          ) : (
            <Button
              type="primary"
              style={{ float: 'right', marginRight: '16px' }}
              onClick={() => navigate('/login')}
            >
              Giriş Yap
            </Button>
          )}
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