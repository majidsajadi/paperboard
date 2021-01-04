import React, { useEffect } from 'react';
import { message, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import routes from './app/routes';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function App() {
  const { errorMessage, successMessage } = useSelector((state) => state.notif);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }

    if (errorMessage) {
      message.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  return (
    <Layout className="layout">
      <Header />
      <Layout className="container">
        <Sidebar />
        <Layout.Content className="content">
          <Switch>
            {routes.map((route, index) => (
              <Route exact={route.exact} key={index} path={route.path}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
