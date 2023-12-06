import { refreshFetch } from "../../protect-request";
import { deleteCookie, getCookie, setCookie } from "../../coockie";
import {User} from "./reducers";
import { request } from "../../request";
import {AppDispatch, RootState} from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const POST_REGISTER_USER_REQUEST:'POST_REGISTER_USER_REQUEST' = "POST_REGISTER_USER_REQUEST";
export const POST_REGISTER_USER_SUCCESS:'POST_REGISTER_USER_SUCCESS' = "POST_REGISTER_USER_SUCCESS";
export const POST_REGISTER_USER_ERROR:'POST_REGISTER_USER_ERROR' = "POST_REGISTER_USER_ERROR";
export const POST_AUTHORIZE_USER_REQUEST:'POST_AUTHORIZE_USER_REQUEST' = "POST_AUTHORIZE_USER_REQUEST";
export const POST_AUTHORIZE_USER_SUCCESS:'POST_REGISTER_USER_SUCCESS' = "POST_REGISTER_USER_SUCCESS";
export const POST_AUTHORIZE_USER_ERROR:'POST_REGISTER_USER_ERROR' = "POST_REGISTER_USER_ERROR";

export const GET_USER_REQUEST:'GET_USER_REQUEST' = "GET_USER_REQUEST";
export const GET_USER_SUCCESS:'GET_USER_SUCCESS' = "GET_USER_SUCCESS";
export const GET_USER_ERROR:'GET_USER_ERROR' = "GET_USER_ERROR";

export const PATCH_USER_REQUEST:'PATCH_USER_REQUEST' = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS:'PATCH_USER_SUCCESS' = "PATCH_USER_SUCCESS";
export const PATCH_USER_ERROR:'PATCH_USER_ERROR' = "PATCH_USER_ERROR";

export const POST_LOGOUT_USER_REQUEST:'POST_LOGOUT_USER_REQUEST' = "POST_LOGOUT_USER_REQUEST";
export const POST_LOGOUT_USER_SUCCESS:'POST_LOGOUT_USER_SUCCESS' = "POST_LOGOUT_USER_SUCCESS";
export const POST_LOGOUT_USER_ERROR:'POST_LOGOUT_USER_ERROR' = "POST_LOGOUT_USER_ERROR";

export const POST_FORGOT_PASSWORD_REQUEST:'POST_FORGOT_PASSWORD_REQUEST' = "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_SUCCESS:'POST_FORGOT_PASSWORD_SUCCESS' = "POST_FORGOT_PASSWORD_SUCCESS";
export const POST_FORGOT_PASSWORD_ERROR:'POST_FORGOT_PASSWORD_ERROR' = "POST_FORGOT_PASSWORD_ERROR";

export const POST_RESET_PASSWORD_REQUEST:'POST_RESET_PASSWORD_REQUEST' = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_SUCCESS:'POST_RESET_PASSWORD_SUCCESS' = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_ERROR:'POST_RESET_PASSWORD_ERROR' = "POST_RESET_PASSWORD_ERROR";

export const GET_LAST_PUTH:'GET_LAST_PUTH' = "GET_LAST_PUTH";


export interface I_POST_REGISTER_USER_REQUEST_ACTION {
  readonly type: typeof POST_REGISTER_USER_REQUEST,
}
export interface I_POST_REGISTER_USER_SUCCESS_ACTION {
  readonly type: typeof POST_REGISTER_USER_SUCCESS,
  payload: User[]
}
export interface I_POST_REGISTER_USER_ERROR_ACTION {
  readonly type: typeof POST_REGISTER_USER_ERROR,
}
export interface I_POST_AUTHORIZE_USER_REQUEST_ACTION {
  readonly type: typeof POST_AUTHORIZE_USER_REQUEST,
}
export interface I_POST_AUTHORIZE_USER_SUCCESS_ACTION {
  readonly type: typeof POST_AUTHORIZE_USER_SUCCESS,
  payload: User
}
export interface I_POST_AUTHORIZE_USER_ERROR_ACTION {
  readonly type: typeof POST_AUTHORIZE_USER_ERROR,
}
export interface I_GET_USER_REQUEST_ACTION {
  readonly type: typeof GET_USER_REQUEST,
}
export interface I_GET_USER_SUCCESS_ACTION {
  readonly type: typeof GET_USER_SUCCESS,
  payload: User
}
export interface I_GET_USER_ERROR_ACTION {
  readonly type: typeof GET_USER_ERROR,
}
export interface I_PATCH_USER_REQUEST_ACTION {
  readonly type: typeof PATCH_USER_REQUEST,
}
export interface I_PATCH_USER_SUCCESS_ACTION {
  readonly type: typeof PATCH_USER_SUCCESS,
  payload: User
}
export interface I_PATCH_USER_ERROR_ACTION {
  readonly type: typeof PATCH_USER_ERROR,
}
export interface I_POST_LOGOUT_USER_REQUEST_ACTION {
  readonly type: typeof POST_LOGOUT_USER_REQUEST,
}
export interface I_POST_LOGOUT_USER_SUCCESS_ACTION {
  readonly type: typeof POST_LOGOUT_USER_SUCCESS,
  payload: User
}
export interface I_POST_LOGOUT_USER_ERROR_ACTION {
  readonly type: typeof POST_LOGOUT_USER_ERROR,
}
export interface I_POST_FORGOT_PASSWORD_REQUEST_ACTION {
  readonly type: typeof POST_FORGOT_PASSWORD_REQUEST,
}
export interface I_POST_FORGOT_PASSWORD_SUCCESS_ACTION {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS,
  payload: User
}
export interface I_POST_FORGOT_PASSWORD_ERROR_ACTION {
  readonly type: typeof POST_FORGOT_PASSWORD_ERROR,
}
export interface I_POST_RESET_PASSWORD_REQUEST_ACTION {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST,
}
export interface I_POST_RESET_PASSWORD_SUCCESS_ACTION {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS,
  payload: User
}
export interface I_POST_RESET_PASSWORD_ERROR_ACTION {
  readonly type: typeof POST_RESET_PASSWORD_ERROR,
}
export interface I_GET_LAST_PUTH {
  readonly type: typeof GET_LAST_PUTH,
}

export type TTypesActions =
    I_POST_REGISTER_USER_REQUEST_ACTION |
    I_POST_REGISTER_USER_SUCCESS_ACTION |
    I_POST_REGISTER_USER_ERROR_ACTION |
    I_POST_AUTHORIZE_USER_REQUEST_ACTION |
    I_POST_AUTHORIZE_USER_SUCCESS_ACTION |
    I_POST_AUTHORIZE_USER_ERROR_ACTION |
    I_GET_USER_REQUEST_ACTION |
    I_GET_USER_SUCCESS_ACTION |
    I_GET_USER_ERROR_ACTION |
    I_PATCH_USER_REQUEST_ACTION |
    I_PATCH_USER_SUCCESS_ACTION |
    I_PATCH_USER_ERROR_ACTION |
    I_POST_LOGOUT_USER_REQUEST_ACTION |
    I_POST_LOGOUT_USER_SUCCESS_ACTION |
    I_POST_LOGOUT_USER_ERROR_ACTION |
    I_POST_FORGOT_PASSWORD_REQUEST_ACTION |
    I_POST_FORGOT_PASSWORD_SUCCESS_ACTION |
    I_POST_FORGOT_PASSWORD_ERROR_ACTION |
    I_POST_RESET_PASSWORD_REQUEST_ACTION |
    I_POST_RESET_PASSWORD_SUCCESS_ACTION |
    I_POST_RESET_PASSWORD_ERROR_ACTION


export const userCreate = (
  email: string,
  password: string,
  name: string,
  navigate: Function
) => (dispatch: AppDispatch) => {
  dispatch({ type: POST_REGISTER_USER_REQUEST });
  request(`/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      let authToken = res.accessToken.split("Bearer ")[1];

      if (authToken) {
        setCookie("token", authToken);
      }
      setCookie("refreshToken", res.refreshToken);
      navigate("/profile");
      dispatch({ type: POST_REGISTER_USER_SUCCESS, payload: res.user });
    })
    .catch((err) => {
      dispatch({ type: POST_REGISTER_USER_ERROR });
      console.error(err);
    });
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  refreshFetch("/auth/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.user });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_ERROR });
      console.error(err);
    });
};

export const userAuthorize = (
  email: string,
  password: string,
  navigate: Function
) => (dispatch: AppDispatch) => {
  dispatch({ type: POST_AUTHORIZE_USER_REQUEST });
  refreshFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      let authToken = res.accessToken.split("Bearer ")[1];
      console.log(res);
      if (authToken) {
        setCookie("token", authToken);
      }
      setCookie("refreshToken", res.refreshToken);
      navigate("/");
      dispatch({ type: POST_AUTHORIZE_USER_SUCCESS, payload: res.user });
    })
    .catch((err) => {
      dispatch({ type: POST_AUTHORIZE_USER_ERROR });
      console.error(err);
    });
};

export const patchUser = (
  name: string,
  email: string,
  password: string,
  setInputDisable: Function,
  setIsInputEmailDisabled: Function 
) =>  (dispatch:AppDispatch) => {
  dispatch({ type: PATCH_USER_REQUEST });
  refreshFetch("/auth/user", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => {
      setInputDisable(true);
      setIsInputEmailDisabled(true);
      dispatch({ type: PATCH_USER_SUCCESS, payload: res.user });
    })
    .catch((err) => {
      dispatch({ type: PATCH_USER_ERROR });
      console.error(err);
    });
};



export const userLogout = (navigate: Function) => (
  dispatch: AppDispatch
) => {
  dispatch({ type: POST_LOGOUT_USER_REQUEST });
  refreshFetch("/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => {
      deleteCookie("refreshToken");
      deleteCookie("token");
      navigate("/login");
      dispatch({ type: POST_LOGOUT_USER_SUCCESS, payload: [] });
    })
    .catch((err) => {
      dispatch({ type: POST_LOGOUT_USER_ERROR });
      console.error(err);
    });
};

export const forgotPassword = (email: string, navigate: Function) => (
  dispatch: AppDispatch
) => {
  dispatch({ type: POST_FORGOT_PASSWORD_REQUEST });
  refreshFetch("/password-reset", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      console.log(res);
      navigate("/password-reset");
      dispatch({ type: POST_FORGOT_PASSWORD_SUCCESS, payload: [] });
    })
    .catch((err) => {
      dispatch({ type: POST_FORGOT_PASSWORD_ERROR });
      console.error(err);
    });
};

export const resetPassword = (
  password: string,
  code: string,
  navigate: Function
) => (dispatch:  AppDispatch) => {
  dispatch({ type: POST_RESET_PASSWORD_REQUEST });
  refreshFetch("/password-reset", {
    method: "POST",
    body: JSON.stringify({
      password: password,
      code: code,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      alert("Пароль был успешно обновлен");
      navigate("/");
      dispatch({ type: POST_RESET_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: POST_RESET_PASSWORD_ERROR });
      console.error(err);
    });
};
