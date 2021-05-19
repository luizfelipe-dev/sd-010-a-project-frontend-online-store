import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as api from '../services/api';

import ProductCard from './ProductCard';
import Categories from './Categories';
import CartSize from './CartSize';

class ListagemProdutos extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productsOnCart: [],
      productsQuantity: {},
      isLoading: false,
      query: '',
      category: '',
    };
  }

  fetchAPI = () => {
    const { query, category } = this.state;
    this.setState(
      { isLoading: true },
      async () => {
        const { results } = await api.getProductsFromCategoryAndQuery(category, query);
        this.setState({
          products: results,
          isLoading: false,
        });
      },
    );
  }

  handleChangeInput = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  handleChangeCategory = (category) => {
    this.setState(
      { category },
      () => this.fetchAPI(),
    );
  }

  handleAddToCart = ({ title, id, price }) => {
    const { productsQuantity } = this.state;
    console.log(title, id, price);
    if (productsQuantity[title] === undefined) {
      this.setState((prevState) => ({
        productsOnCart: [...prevState.productsOnCart, {
          title,
          id,
          price,
        }],
        productsQuantity: {
          ...prevState.productsQuantity,
          [title]: 1,
        },
      }));
    } else {
      this.setState((prevState) => ({
        productsOnCart: [...prevState.productsOnCart, {
          title,
          id,
          price,
        }],
        productsQuantity: { ...prevState.productsQuantity,
          [title]: prevState.productsQuantity[title] + 1 },
      }));
    }
  }

  render() {
    const { size } = this.props;
    const { products, productsOnCart, productsQuantity, isLoading } = this.state;
    if (isLoading) {
      return (
        <p>Carregando...</p>
      );
    }

    return (
      <div>
        <CartSize size={ size } />
        <label htmlFor="query-input">
          <input
            data-testid="query-input"
            type="text"
            onChange={ (e) => this.handleChangeInput(e) }
          />
        </label>
        <button data-testid="query-button" type="button" onClick={ this.fetchAPI }>
          Pesquisar
        </button>

        <Categories onClick={ this.handleChangeCategory } />
        <aside>
          <Link
            to={ {
              pathname: '/cart',
              search: '',
              hash: '',
              state: {
                products: productsOnCart,
                productsQuantity,
              },
            } }
          >
            <button type="button" data-testid="shopping-cart-button">Cart</button>
          </Link>
        </aside>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        { products === []
          ? (<p>Nenhum produto foi encontrado</p>)
          : products.map((product) => (
            <ProductCard
              product={ product }
              id={ product.id }
              key={ product.id }
              title={ product.title }
              price={ product.price }
              imagePath={ product.thumbnail }
              onClick={ this.handleAddToCart }
            />
          ))}

      </div>
    );
  }
}

ListagemProdutos.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ListagemProdutos;
