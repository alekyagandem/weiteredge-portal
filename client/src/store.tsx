import { legacy_createStore as createStore} from 'redux';

const initialState = {
  appData: null
};

const rootReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'ROLE':
      return { ...state, role: action.payload }
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
