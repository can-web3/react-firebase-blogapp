const AuthReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        auth: action.auth 
      }
  
    default:
      return state
  }
}

export default AuthReducer