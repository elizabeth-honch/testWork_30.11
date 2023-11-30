import products from '../data/data.json';

const defaultState = {
  products: products,
  productDates: [],
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_UNIQUE_DATES': 
      return {
        ...state,
        productDates: products.map(product => product.date
          ).filter(
            (product, index, self) => self.indexOf(product) === index
          ).sort((productPrev, productNext) => productPrev - productNext)
      };
    default: 
      return state;
  }
};
