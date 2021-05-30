const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.user,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: state.posts.concat(action.user),
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.user),
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.user,
      };
    default:
      return state;
  }
};

export default Reducer;
