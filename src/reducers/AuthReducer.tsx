// src/reducers/AuthReducer.ts
type Auth = { 
  id: string
  username: string
  email: string
  role: string
  favorites: string[]
} | null

type State = {
  auth: Auth
}

type Action =
  | { type: "GET_USER"; auth: Auth }
  | { type: "TOGGLE_FAVORITE"; blogId: string }

export default function AuthReducer(state: State, action: Action): State {
  switch (action.type) {
    case "GET_USER":
      return { ...state, auth: action.auth }

    case "TOGGLE_FAVORITE":
      if (!state.auth) return state
      const isFav = state.auth.favorites.includes(action.blogId)
      const newFavs = isFav
        ? state.auth.favorites.filter(id => id !== action.blogId)
        : [...state.auth.favorites, action.blogId]
      return {
        ...state,
        auth: { ...state.auth, favorites: newFavs }
      }

    default:
      return state
  }
}
