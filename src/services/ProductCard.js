import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfoFreeShipping from '../components/InfoFreeShipping';

class ProductCard extends React.Component {
  render() {
    const { title, price, imagePath, id, children, shipping } = this.props;
    // const products = this.props;

    return (
      <div data-testid="product" id={ id }>
        <h2>{title}</h2>
        <img
          src={ imagePath }
          width="250"
          alt="Imagem do produto"
        />
        <span>{price}</span>
        { children }
        <Link
          to={ {
            pathname: `/details/products/${id}`,
            // state: products,
          } }
          data-testid="product-detail-link"
        >
          Detalhes
        </Link>
        <InfoFreeShipping shipping={ shipping } />
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  imagePath: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductCard;
