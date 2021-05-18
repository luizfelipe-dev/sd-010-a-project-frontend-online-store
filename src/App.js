import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route
          render={ (routeProps) => <ProductDetail { ...routeProps } /> }
          path="/productdetail/:id"
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
