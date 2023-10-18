import React, { useEffect, useState } from 'react';
import { List, Input, Space, Flex } from 'antd';
import { Link, Outlet, useParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Route, RouteListProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchRoutes, selectRouteList } from '../features/routes/routeSlice';
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { routesCollection } from '../services/firebase';
import RouteItem from './RouteItem';
const { Search } = Input;



const RouteList: React.FC<RouteListProps> = () => {

  const routes: Route[] = useAppSelector(selectRouteList);
  const dispatch = useAppDispatch();
  const setRoutes = (value: Route[]) => dispatch(fetchRoutes(value));

  const params = useParams<{ id: string }>();

  const isMainPage = !params.id;


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

  const filteredRoutes = routes
  .filter((route) => route.title?.toLowerCase().includes(searchText.toLowerCase()))
  .sort((routeA, routeB) => {
    if (routeA.isFavorite && !routeB.isFavorite) {
      return -1;
    }
    if (!routeA.isFavorite && routeB.isFavorite) {
      return 1;
    }
    return 0;
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <Flex gap="large" align="start" justify="start" >

      <Space direction="vertical" style={{ width: '40%' }} size={['large', 'large']}>
        <Search placeholder="Search..." onSearch={handleSearch} />
        <List
          style={{ height: '74vh', overflow: 'auto', borderRadius: '0.5rem',  }}
          grid={{ column: 1 }}
          dataSource={filteredRoutes}
          renderItem={(route) => (
            <List.Item >
              <Link to={`/route/${route.id}`}>
                <RouteItem route={route} isActive={route.id === params.id}/>
              </Link>
            </List.Item>
          )}
        />

      </Space>

      {isMainPage && 'Select any path'}

      <Outlet/>



    </Flex>

  );
};

export default RouteList;
