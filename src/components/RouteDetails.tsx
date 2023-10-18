import React from 'react';
import { Flex, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { Route } from '../types';
import { addToFavorites, removeRoute, selectRouteById } from '../features/routes/routeSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Paragraph from "antd/es/typography/Paragraph";
import Map from './Map';

const { Title, Text } = Typography;

interface RouteDetailsProps {
}

const RouteDetails: React.FC<RouteDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const route: Route | undefined = useAppSelector(selectRouteById(id));

  if (!route) {
    return <div>Route not found.</div>;
  }
  const handleAddToFavorites = () => {
    dispatch(addToFavorites(route?.id));
  };

  const handleRemoveRoute = () => {
    dispatch(removeRoute(route?.id));
  };

  return (
    <Flex vertical gap="large" align="center" justify="start" style={{ width: '60%', height: '100%' }}>
      <Flex align="start" justify="space-between" style={{ width: '100%' }}>
        <Title level={5} style={{ margin: '0' }}>{route.title}</Title>
        <Text style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0' }}>{route.length} km</Text>
      </Flex>
      <Paragraph style={{ marginBottom: '0', width: '100%', textAlign: 'justify' }}>{route.fullDescription}</Paragraph>
      <Map />
      <Text underline style={{ color: "#1677ff", textAlign: 'right', width: '100%' }}>Add to favorites</Text>
      <Text type="danger" underline style={{ textAlign: 'right', width: '100%' }}>Remove</Text>
    </Flex>);
};

export default RouteDetails;
