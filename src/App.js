import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import ReceivingForm from './components/ReceivingForm';
import ShippingForm from './components/ShippingForm';
import Layout from './components/Layout';
import Customers from './views/Customers';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';

const queryCache = new QueryCache();

const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Layout>
        <Switch>
          <Route path="/receiving" component={ReceivingForm} />
          <Route path="/shipping" component={ShippingForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/" component={Landing} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    </ReactQueryCacheProvider>
  );
};

export default App;
