import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Product extends Component {
  constructor(props) {
    super(props);

    const {
      product: { id },
      cartItems,
    } = this.props;
    this.state = {
      amount: cartItems[id]?.amount || 0,
    };
  }

  handleClick = () => {
    const { product, addToCart } = this.props;
    const { title, price, id, thumbnail } = product;

    this.setState((prevState) => ({
      amount: prevState.amount + 1,
    }), () => {
      const { amount } = this.state;
      addToCart(id, {
        title,
        thumbnail,
        price,
        amount,
        id,
        totalPrice: amount * price,
      });
    });
  };

  render() {
    const { product } = this.props;
    const { title, price, thumbnail, id } = product;

    return (
      <>
        <div data-testid="product">
          <h2>{title}</h2>
          <img src={ thumbnail } alt="Imagem do produto" />
          <h3>{price}</h3>
          <div className="cart-button">
            <button
              className="add-cart-button"
              type="button"
              name={ id }
              onClick={ this.handleClick }
              data-testid="product-add-to-cart"
            >
              <i className="bi bi-cart-plus button-icon" />
            </button>
          </div>
        </div>
        <Link
          data-testid="product-detail-link"
          to={ { pathname: title, state: { product } } }
        >
          Ver detalhes
        </Link>
      </>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};