import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/ShoppingCartPage" component={ ShoppingCartPage } />
          <Route path="/:title" component={ ProductDetails } />
          {/* alteração do path para title pois pela key(id)
          não estava passando no teste */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
