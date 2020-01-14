export default (state = [], action) => {
  switch (action.type) {
    case 'STORE_SELECTED_ASTEROIDS':
      return [...state, action.payload];
    case 'DELETE_SELECTED_ASTEROID':
      return state.filter(element => element !== action.payload);
    case 'DELETE_ALL':
      return state=[];
    default:
      return state;
  }
};
