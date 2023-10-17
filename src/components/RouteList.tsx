import React, { useEffect, useState } from 'react';
import { List, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Route, RouteListProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchRoutes, selectRouteList } from '../features/routes/routeSlice';
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { routesCollection } from '../services/firebase';
const { Search } = Input;



const RouteList: React.FC<RouteListProps> = () => {

const routes: Route[] = useAppSelector(selectRouteList);
const dispatch = useAppDispatch();
const setRoutes: any = (value: Route[]) => dispatch(fetchRoutes(value));

useEffect(() => {
  onSnapshot(routesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
    setRoutes(snapshot.docs.map((doc) => {
          return {
              id: doc.id,
              ...doc.data(),
          }
      }));
  });
}, []);

  const [searchText, setSearchText] = useState('');

  const filteredRoutes = routes.filter((route) =>
    route.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Search
          placeholder="Search routes"
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          prefix={<SearchOutlined />}
        />
      </Space>
      <List
        itemLayout="vertical"
        dataSource={filteredRoutes}
        renderItem={(route) => (
          <List.Item>
            <Link to={`/route/${route.id}`}>
              <h2>{route.title}</h2>
            </Link>
            <p>{route.shortDescription}</p>
            <p>Length: {route.length} miles</p>
            {route.isFavorite ? <span>Favorite</span> : null}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RouteList;
