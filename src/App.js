import React from 'react';
import './App.css';
import ListCategories from './components/ListCategories';

class App extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="input">
          <input type="text" id="input" />
        </label>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <aside>
          <ListCategories />
        </aside>
      </div>
    );
  }
}

export default App;
