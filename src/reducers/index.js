import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dataReducer from './dataReducer';
import historyReducer from './historyReducer';
import selectedReducer from './selectedReducer';

export default combineReducers({
  data: dataReducer,
  history: historyReducer,
  selected: selectedReducer,
  form: formReducer
});
