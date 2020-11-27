import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ToastContainer } from 'react-toastify';

import ReceivingForm from './components/ReceivingForm';
import Layout from './components/Layout';
import Landing from './views/Landing';
import Customers from './views/Customers';
import Parts from './views/Parts';
import Shipping from './views/Shipping';

const queryCache = new QueryCache();

const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Layout>
        <Switch>
          <Route path="/receiving" component={ReceivingForm} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/customers" component={Customers} />
          <Route path="/parts" component={Parts} />
          <Route path="/" component={Landing} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
      <ToastContainer autoClose={4000} newestOnTop={true} limit={3} />
    </ReactQueryCacheProvider>
  );
};

export default App;
