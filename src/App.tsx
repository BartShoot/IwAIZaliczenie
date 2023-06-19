import React, { useEffect, useState } from 'react';
import RandomValueComponent from './title';
import RandomValueComponentImage from './image';
import RandomValueComponentDescription from './description';
import SavedNumbersComponent from './savedNumbers';
import { Col, Row, Divider, Button, Card, ConfigProvider, theme } from 'antd';

const App: React.FC = () => {
  const [number, setNumber] = useState<number>(() => {
    const savedNumbers = localStorage.getItem('savedNumbers');
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
    return numbers.length > 0 ? numbers[numbers.length - 1] : Math.floor(Math.random() * 151000);
  });

  const [rerenderKey, setRerenderKey] = useState<number>(1);
  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 151000);
    setNumber(newNumber);
    setRerenderKey(prevKey => prevKey + 1);
    console.log(newNumber);
  };

  const saveNumber = () => {
    const savedNumbers = localStorage.getItem('savedNumbers');
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
    const updatedNumbers = [...numbers, number];
    localStorage.setItem('savedNumbers', JSON.stringify(updatedNumbers));
  };

  useEffect(() => {
    const savedNumbers = localStorage.getItem('savedNumbers');
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
    if (numbers.length > 0) {
      setNumber(numbers[numbers.length - 1]);
    } else {
      setNumber(Math.floor(Math.random() * 151000));
    }
  }, []);

  const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers') || '[]');


  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, }}>
      <div key={rerenderKey}>
        <Row gutter={[64, 64]}>
          <Col offset={2} span={24}>
            <Card bordered={false} hoverable style={{ width: 600 }}>
              <RandomValueComponent randomNumber={number} />
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={[64, 64]}>
          <Col offset={2} span={8} >
            <Card title="Image" style={{ height: 550 }} bordered={false} hoverable>
              <RandomValueComponentImage randomNumber={number} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Description" bordered={false} style={{ width: 800 }} hoverable>
              <RandomValueComponentDescription randomNumber={number} />
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={[64, 64]}>
          <Col offset={2} span={8} >
            <Col>
              <Button type="primary" onClick={saveNumber}>Save number</Button>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <Button type="primary" onClick={generateRandomNumber}>Generate New Number</Button>
            </Col>
          </Col>
          <Col span={8}>
            <SavedNumbersComponent savedNumbers={savedNumbers} />
          </Col>
        </Row>

      </div>
    </ConfigProvider>

  );
};

export default App;
