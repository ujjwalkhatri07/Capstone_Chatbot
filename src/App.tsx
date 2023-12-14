import { ConfigProvider } from 'antd';
import React from 'react';
import Outer from './Outer';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#8f5db7', borderRadius: 0 } }}>
    <Outer />
  </ConfigProvider>
);

export default App;
