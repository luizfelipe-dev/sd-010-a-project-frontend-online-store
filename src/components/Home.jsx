import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesList from './CategoriesList';
import * as api from '../services/api';
import ProductCard from './ProductCard';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchedProducts: '',
      filteredCategory: '',
      products: [],
    };
  }

  filterCategory = async (event) => {
    const { id } = event.target;
    const { searchedProducts } = this.state;
    const currCatergory = await api.getProductsFromCategoryAndQuery(id, searchedProducts);
    const arrProducts = currCatergory.results.map((product) => ({
      quant: 1,
      ...product,
    }));
    this.setState({
      products: arrProducts,
      filteredCategory: id,
    });
  }

  productName = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  }

  filterSearchedProducts = async () => {
    const { inputValue, filteredCategory } = this.state;
    const productsList = await
    api.getProductsFromCategoryAndQuery(filteredCategory, inputValue);
    const arrProducts = productsList.results.map((product) => ({
      quant: 1,
      ...product,
    }));
    this.setState({
      products: arrProducts,
      searchedProducts: inputValue,
    });
  }

  render() {
    const { inputValue, products } = this.state;
    const { cartItemMethod } = this.props;
    return (
      <div>
        <input
          data-testid="query-input"
          onChange={ this.productName }
          value={ inputValue }
          type="text"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.filterSearchedProducts }
        >
          Consultar
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">Cart</Link>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <CategoriesList filterCategory={ this.filterCategory } />
        { products.length < 1
          ? <h2>Nenhum Produto foi encontrado</h2>
          : products.map((item) => (
            <ProductCard
              key={ item.id }
              title={ item.title }
              img={ item.thumbnail }
              price={ item.price }
              id={ item.id }
              currItem={ item }
              cartItemMethod={ cartItemMethod }
            />
          )) }
      </div>
    );
  }
}

Home.propTypes = {
  cartItemMethod: PropTypes.func,
}.isRequired;
export default Home;
