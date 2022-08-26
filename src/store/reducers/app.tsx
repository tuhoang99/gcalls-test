
const initialState = {
  data: {},
};

export const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'data': {
      return {...state, data: action.payload}
    }
    default: return { ...state }
  }
}