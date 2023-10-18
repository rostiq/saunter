import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Divider, Layout } from 'antd';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import AddRouteForm from './components/AddRouteForm';
import { Header } from 'antd/es/layout/layout';
import HeaderContent from './components/HeaderContent';

const { Content } = Layout;

function App(): ReactElement {
  return (
    <Router>
      <Layout className='layout'>
        <Header className='header'>
          <HeaderContent />
        </Header>
        <Divider />
        <Content className='content'>
          <Routes>
            <Route path="/" element={<RouteList />} >
              <Route path="/route/:id" element={<RouteDetails />} />
            </Route>
            <Route path="/add" element={<AddRouteForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;