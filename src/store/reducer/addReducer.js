export const initialState = {
    data: {},
    loading: true,
  };
  
  export function loginReducer(state = initialState, action) {
    switch (action.type) {
      case "ADMIN_LOGIN":
        return { data: action.payload, loading: false };
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  }