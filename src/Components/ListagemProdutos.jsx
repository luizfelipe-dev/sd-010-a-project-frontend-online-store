import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Categories from './Categories';

class ListagemProdutos extends Component {
  render() {
    return (
      <div>
        <Categories />
        <input type="text" />
        <aside>
          <Link to="/cart">
            <button type="button" data-testid="shopping-cart-button">Cart</button>
          </Link>
        </aside>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default ListagemProdutos;
