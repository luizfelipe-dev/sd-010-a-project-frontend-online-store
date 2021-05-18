import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.handle = this.handle.bind(this);
    this.state = {
      inputValue: '',
    };
  }

  handle({ target: { value } }) {
    this.setState({ inputValue: value });
  }

  render() {
    const { onClick } = this.props;
    const { inputValue } = this.state;

    return (
      <section className="search">
        <label data-testid="home-initial-message" htmlFor="searchBar">
          <input
            onChange={ this.handle }
            data-testid="query-input"
            id="searchBar"
            type="search"
          />
          <br />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <Link
          to="/cartContent"
          data-testid="shopping-cart-button"
        >
          <img
            style={ { width: '40px' } }
            src="./images/shoppingCart.png"
            alt="Carrinho de compras"
          />
        </Link>
        <button
          type="button"
          onClick={ () => onClick(inputValue) }
          data-testid="query-button"
        >
          PESQUISAR
        </button>
      </section>
    );
  }
}

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
