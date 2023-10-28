import React from 'react';
import { Flex, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Route, RouteDetailsProps } from '../types';
import { addToFavorites, removeRoute, selectRouteById } from '../features/routes/routeSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Paragraph from "antd/es/typography/Paragraph";
import { deleteDocument, updateDocument } from '../services/firebase';
import MyMap from './MyMap';

const { Title, Text } = Typography;



const RouteDetails: React.FC<RouteDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const route: Route | undefined = useAppSelector(selectRouteById(id));

  if (!route) {
    return <div>Route not found.</div>;
  }
  const handleAddToFavorites = () => {
    updateDocument(route?.id, { isFavorite: true });
    dispatch(addToFavorites(route?.id));
  };

  const handleRemoveRoute = () => {
    deleteDocument(route?.id);
    dispatch(removeRoute(route?.id));
    navigate('/');
  };

  return (
    <Flex vertical gap="large" align="center" justify="start" style={{ width: '60%', height: '80vh', overflow: 'scroll'}}>
      <Flex align="start" justify="space-between" style={{ width: '100%' }}>
        <Title level={5} style={{ margin: '0' }}>{route.title}</Title>
        <Text style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0' }}>{route.length} km</Text>
      </Flex>
      <Paragraph style={{ marginBottom: '0', width: '100%', textAlign: 'justify' }}>{route.fullDescription}</Paragraph>
      <MyMap />
      <Text underline style={{ color: "#1677ff", textAlign: 'right', width: '100%', cursor: 'pointer' }} onClick={handleAddToFavorites}>{route.isFavorite? 'Remove from favorites': 'Add to favorites'}</Text>
      <Text type="danger" underline style={{ textAlign: 'right', width: '100%', cursor: 'pointer' }} onClick={handleRemoveRoute}>Remove</Text>
    </Flex>);
};

export default RouteDetails;
