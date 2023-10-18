import React from 'react';

import { Card, Flex } from 'antd';
import { FullscreenOutlined, RightOutlined, StarFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { RouteProps } from '../types';

const { Text } = Typography;


const RouteItem: React.FC<RouteProps> = ({ route, isActive }) => {

  const { title, shortDescription, length, isFavorite, id } = route;

  const isActiveStyles = {
    color: isActive ? 'white' : 'inherit'
  }

  return (
    <Card size="small" style={{width: '100%', backgroundColor: isActive? '#1677ff' : '#f5f5f5', cursor: 'pointer' }}  >
      <Flex justify='space-evenly' gap='large' align='center'>

        {/* ICON */}

        <FullscreenOutlined style={{ fontSize: '2rem',color: isActive ? 'white' : 'inherit'  }} />

        {/* META */}

        <Flex vertical gap="small" align="start" justify="center" style={{ width: '64%',  }}>
          <Title level={5} style={{ margin: '0',color: isActive ? 'white' : 'inherit' }}>
            {isFavorite && <StarFilled style={{ marginRight: '0.5rem', color: 'orange', }} />}
            {title}
          </Title>
          <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '0',color: isActive ? 'white' : 'inherit' }}>{shortDescription}</Paragraph>
        </Flex>

        {/* LENGTH */}

        <Text style={{color: isActive ? 'white' : 'inherit'}}>{length} km</Text>

        {/* RIGHT ICON */}

        <RightOutlined style={{ color: isActive ? 'white' : 'inherit'  }} />

      </Flex>
    </Card>
  );
}

export default RouteItem;
