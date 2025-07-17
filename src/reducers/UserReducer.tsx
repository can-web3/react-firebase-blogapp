const UserReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
        return {
            ...state,
            // users: 
        }
        break;
  
    default:
        break;
  }
}

export default UserReducer