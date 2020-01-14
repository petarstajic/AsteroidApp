export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ASTEROID_HISTORY':
      return [...state, action.payload];

    case 'DELETE_ASTEROID_HISTORY':
      return (state = []);

    default:
      return state;
  }
};
