import { combineReducers } from "redux";



const initialState = {
    blog: JSON.parse(localStorage.getItem("blog")) || [],
  };
  
  function blogReducer(state = initialState, action) {
  
    const { type, payload } = action;
  
    switch (type) {
  
      case "ADD":
          let updatedBlog = [...state.blog, {...payload}];
          localStorage.setItem('blog', JSON.stringify([...state.blog, {...payload}]))
        return {
          ...state,
          blog: [...updatedBlog],
        };
  
      case "DELETE":
          let newUpdate = state.blog.filter(
              (item) => item.id !== payload
          );

          let newArray = JSON.stringify(newUpdate);
          localStorage.blog = newArray
        return {
          ...state,
          blog: newUpdate,
        };
  
      case "EDIT":
          let EditUpdate = state.blog.filter((blog) => blog.id !== payload.id)
          let newEditUpdate = [...EditUpdate, payload]
          let newEditArray = JSON.stringify(newEditUpdate);
          localStorage.blog = newEditArray
        return {
          ...state,
          blog: newEditUpdate,
        };
  
      default:
        return state;
    }
  }
  

  
  const initialUserState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticating: false,
  };
  
  
  
  const userReducer = (state = initialUserState, action) => {
  
    const { type, payload } = action;
  
    switch (type) {
  
      case "SET_USER":
        const userJSON = JSON.stringify(payload);
        localStorage.setItem("user", userJSON);
        return { ...state, user: payload };
  
      case "TOGGLE_AUTH_STATE":
        return { ...state, isAuthenticating: !state.isAuthenticating };
  
      case "LOGOUT_USER":
        localStorage.removeItem("user");
        return { ...state, user: null };
        
      default:
        return state;
    }
  };




const rootReducer  = combineReducers({
    userState: userReducer,
    blogState: blogReducer,
    
})

export default rootReducer