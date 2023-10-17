import React from 'react';
import { Button, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Route } from '../types';
import { addToFavorites, removeRoute, selectRouteById } from '../features/routes/routeSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

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
    <Card title={route.title}>
      <p>{route.fullDescription}</p>
      <p>Length: {route.length} miles</p>
      {route.isFavorite ? <p>Favorite</p> : null}
      <Button onClick={handleAddToFavorites}>Add to Favorites</Button>
      <Button onClick={handleRemoveRoute}>Delete</Button>
      <Link to="/">Back to Route List</Link>
    </Card>
  );
};

export default RouteDetails;
