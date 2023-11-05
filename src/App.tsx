import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Divider, Layout } from 'antd';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import { Header } from 'antd/es/layout/layout';
import HeaderContent from './components/HeaderContent';
import AddForm from './components/AddForm';

const { Content } = Layout;

function App(): ReactElement {
  return (
    <Router basename='/saunter'>
      <Layout className='layout'>
        <Header className='header'>
          <HeaderContent />
        </Header>
        <Divider className='divider'/>
        <Content className='content'>
          <Routes >
            <Route path="/" element={<RouteList />} >
              <Route path="/route/:id" element={<RouteDetails />} />
            </Route>
              <Route path="/add" element={<AddForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;