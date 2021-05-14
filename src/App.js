import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListagemProdutos from './Components/ListagemProdutos';
import ShoppingCart from './Pages/ShoppintCart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ ListagemProdutos } />
          <Route path="/cart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
