
export const ThemeChanger = (value:any) => async (dispatch:any) => {
    dispatch({
      type: "ThemeChanger",
      payload: value,
    });
  
  };
  export const AddToCart = (id: string) => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: id
    });
  };
  export const ProductReduxData = (id:any) => async (dispatch: (arg0: { type: string; payload:any; }) => void) => {
    dispatch({
        type: "PRODUCT",
        payload: id
    });
  };

// Authentication Actions
export const login = (token: string, username: string) => async (dispatch: (arg0: { type: string; payload: { token: string; username: string; }; }) => void) => {
  dispatch({
      type: "LOGIN",
      payload: { token, username },
  });
};

export const logout = () => async (dispatch: (arg0: { type: string; }) => void) => {
  dispatch({
      type: "LOGOUT",
  });
};

export const checkAuthentication = (isAuth: boolean, token?: string, username?: string) => async (dispatch: (arg0: { type: string; payload: { isAuth: boolean; token?: string; username?: string; }; }) => void) => {
  dispatch({
      type: "CHECK_AUTHENTICATION",
      payload: { isAuth, token, username },
  });
};
