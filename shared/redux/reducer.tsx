interface AuthState {
  lang: string;
  dir: string;
  class: string;
  dataMenuStyles: string;
  dataNavLayout: string;
  dataHeaderStyles: string;
  dataVerticalStyle: string;
  dataToggled: string;
  dataNavStyle: string;
  horStyle: string;
  dataPageStyle: string;
  dataWidth: string;
  dataMenuPosition: string;
  dataHeaderPosition: string;
  loader: string;
  iconOverlay: string;
  colorPrimaryRgb: string;
  colorPrimary: string;
  bodyBg: string;
  Light: string;
  darkBg: string;
  inputBorder: string;
  bgImg: string;
  iconText: string;
  body: {
      class: string;
  };
  token: string | null;
  username: string | null;
  isAuth: boolean;
}
let initialState:AuthState = {
  lang: "en",
  dir: "ltr",
  class: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "light",
  dataVerticalStyle: "overlay",
  dataToggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "",
  colorPrimary: "",
  bodyBg: "",
  Light: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: ""
  },
  // add initial for auth ,token ,user
  token:  typeof window !== 'undefined' ? sessionStorage.getItem("jwt") : null,
  username: null,
  isAuth: false,
};

export default function reducer(state = initialState, action: any):AuthState {
  let { type, payload } = action;

  switch (type) {

    // case "ThemeChanger":
    //   state = payload
    //   return state
    //   break;

    //   return state;
    case "ThemeChanger":
      return {
        ...state,
        ...payload,
      };
      case "LOGIN":
            return {
                ...state,
                token: payload.token,
                username: payload.username,
                isAuth: true,
            };

        case "LOGOUT":
            return {
                ...state,
                token: null,
                username: null,
                isAuth: false,
            };

        case "CHECK_AUTHENTICATION":
            return {
                ...state,
                isAuth: payload.isAuth,
                token: payload.token,
                username: payload.username,
            };
    default:
      return state;
  }
}

