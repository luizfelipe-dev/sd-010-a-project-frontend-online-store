import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as api from '../services/api';
import ProductInfo from '../components/ProductInfo';

class ProductDetail extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     product: {},
  //   };
  //   this.fetchProductDetails = this.fetchProductDetails.bind(this);
  // }

  // componentDidMount() {
  //   this.fetchProductDetails();
  // }

  // async fetchProductDetails() {
  //   const { match } = this.props;
  //   const { id } = match.params;
  //   const request = await api.getProductsFromQuery(id);
  //   console.log(request);
  //   this.setState({ product: request });
  // }
  render() {
    const { location } = this.props;
    const { product } = location.state;
    // const { title, price, thumbnail } = product;

    return (
      <>
        {/* <h1 data-testid="product-detail-name">{title}</h1>
        <p>{price}</p>
        <img src={ thumbnail } alt={ title } /> */}
        <ProductInfo product={ product } />
        {/* <ProductRating />
        <AddToCart /> */}
      </>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: {
      product: PropTypes.shape({
        title: PropTypes.string,
        price: PropTypes.string,
        thumnail: PropTypes.string,
      }),
    },
  }).isRequired,
};

export default ProductDetail;
