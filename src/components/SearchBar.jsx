import React from 'react';
import { Link } from 'react-router-dom';
import * as apiUrl from '../services/api';
import Categories from './Categories';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      status: false,
      products: [],
      buyList: [],
    };
    this.eventFilter = this.eventFilter.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.products = this.products.bind(this);
    this.handleFilterCategory = this.handleFilterCategory.bind(this);
  }

  async handleFilter() {
    const { filter, status } = this.state;
    const { getProductsFromCategoryAndQuery } = apiUrl;
    if (status === true) {
      const result = await getProductsFromCategoryAndQuery('', filter);
      this.setState({
        products: result.results,
      }, () => {
      });
    }
  }

  async handleFilterCategory(event) {
    const category = event.target.value;
    const { getProductsFromCategoryAndQuery } = apiUrl;
    const result = await getProductsFromCategoryAndQuery(category, '');
    const { results } = result;
    this.setState({
      products: results,
    });
  }

  addItem = (event) => {
    const { value } = event.target;
    this.setState((previ) => ({
      buyList: [...previ.buyList, JSON.parse(value)],
    }));
  }

  renderButtonAdd = (item) => (
    <button
      data-testid="product-add-to-cart"
      onClick={ this.addItem }
      value={ item }
      type="button"
    >
      add
    </button>
  )

  products() {
    const { products } = this.state;
    if (products.length === 0) {
      return <p>Nenhum produto foi encontrado</p>;
    }
    return (
      products.map((product, i) => (
        <div
          data-testid="product"
          key={ product.id }
        >
          <img src={ product.thumbnail } alt={ product.id } />
          <Link
            to={ {
              pathname: `/Product-Details/${product.id}`,
              state: { product: products[i] },
            } }
            data-testid="product-detail-link"
          >
            <h6>{product.title}</h6>
          </Link>
          <p>{` R$ ${product.price} `}</p>
          { this.renderButtonAdd(JSON.stringify(product)) }
        </div>
      ))
    );
  }

  eventFilter(event) {
    const seach = event.target.value;
    if (seach.length !== 0) {
      this.setState({
        filter: seach,
        status: true,
      });
    } else {
      this.setState({
        status: false,
      });
    }
  }

  render() {
    const { buyList } = this.state;
    return (
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <input type="search" data-testid="query-input" onChange={ this.eventFilter } />
        <button type="button" data-testid="query-button" onClick={ this.handleFilter }>
          Search
        </button>
        <Link
          to={ { pathname: '/cart', state: { buyList } } }
          data-testid="shopping-cart-button"
        >
          <img
            src="https://image.flaticon.com/icons/png/512/126/126083.png"
            alt="Icone Cart"
            id="cart-image"
          />
        </Link>
        { this.products()}
        <Categories func={ this.handleFilterCategory } />
      </div>
    );
  }
}

export default SearchBar;
