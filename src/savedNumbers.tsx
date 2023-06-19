import React from 'react';
import { ConfigProvider, theme, List } from 'antd';

interface SavedNumbersComponentProps {
  savedNumbers: number[];
}

const SavedNumbersComponent: React.FC<SavedNumbersComponentProps> = ({ savedNumbers }) => {
  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm,}}>
    <div>
        <List
            header={<div>Saved Numbers</div>}
            bordered
            dataSource={savedNumbers}
            renderItem={(item)=><List.Item><a href={`https://anilist.co/anime/${+item}`}>{item}</a></List.Item>}/>
    </div>
    </ConfigProvider>
  );
};

export default SavedNumbersComponent;
