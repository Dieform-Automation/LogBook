import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import ReceivingForm from './components/ReceivingForm';
import ShippingForm from './components/ShippingForm';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/receiving" component={ReceivingForm} />
        <Route path="/shipping" component={ShippingForm} />
        <Route path="/" component={Landing} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  );
};

export default App;
