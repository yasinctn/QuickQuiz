import React from 'react';
import { Alert, Space } from 'antd';


const AlertView = ({type = "success", title="am", description = "parolanız 6 haneden kısa olamaz"}) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    align='center'
    
  >
    
    <Alert
      message={title}
      description={description}
      type={type}
      
      showIcon
      closable
    />
    
  </Space>
);
export default AlertView;