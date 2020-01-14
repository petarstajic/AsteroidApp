import React from 'react';
import FormRequest from './FormRequest';
import Charts from './Charts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="ui container">
        <Switch>
          <Route path="/" exact component={FormRequest} />
          <Route path="/charts" component={Charts} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
