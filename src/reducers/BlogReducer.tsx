export default function BlogReducer(state, action) {
    switch (action.type) {
        case "GET_BLOGS":
            return {
                ...state,
                blogs: action.blogs
            }
        case "GET_BLOG":
            return {
                ...state,
                blog: action.blog
            }
    
        default:
            return state;
    }
}
