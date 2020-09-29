import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing';
import ReceivingForm from './components/ReceivingForm';

const App = () => {
  return (
    <Switch>
      <Route path="/receiving" component={ReceivingForm} />
      <Route path="/" component={Landing} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default App;
