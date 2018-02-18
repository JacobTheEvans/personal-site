const defaultState = {
  articles: [],
  portfolioItems: [],
  token: null,
  isLoading: false
}

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        [action.key]: action.data
      }
    case "LOGIN":
      return {
        ...state,
        token: action.token
      }
    case "LOGOUT":
      return {
        ...state,
        token: null
      }
    default:
      return {
        ...state
      };
  }
}

export default mainReducer;
