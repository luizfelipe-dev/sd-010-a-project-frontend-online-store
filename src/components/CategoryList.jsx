import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((categories) => this.setState({ categories }))
      .catch((error) => console.log(error));
  }

  render() {
    const { categories } = this.state;
    const { handleChange, checked } = this.props;
    return (
      <div className="category-box">
        {categories.map((item) => (
          <label
            htmlFor="category"
            key={ item.id }
            className="category"
          >
            <input
              type="radio"
              data-testid="category"
              checked={ checked }
              name="category"
              value={ item.id }
              // onChange={ handleChange }
              onClick={ handleChange }
              className="category-checkbox"
            />
            {item.name}
          </label>
        ))}
      </div>
    );
  }
}

CategoryList.propTypes = {
  handleChange: PropTypes.func,
  request: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;