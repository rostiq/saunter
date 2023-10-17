import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';
import AddRouteForm from './components/AddRouteForm';
import { Header } from 'antd/es/layout/layout';

const { Content } = Layout;

function App(): ReactElement {
  return (
    <Router>
      <Layout >
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<RouteList />} />
            <Route path="/route/:id" element={<RouteDetails />} />
            <Route path="/add" element={<AddRouteForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;