import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import CardItem from './CardItem';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetail from '../pages/ProductDetail';

export default class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route
          exact
          path="/product/:id"
          render={ (props) => <ProductDetail { ...props } /> }
        />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}
