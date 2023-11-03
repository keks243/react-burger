import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorize } from "../../services/user-actions/actions";
import { GET_LAST_PUTH } from "../../services/user-actions/actions";

import styles from "./login-page.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  const login = (event) => {
    event.preventDefault();
    dispatch(userAuthorize(email, pass, navigate));
  };

  const toForgot = () => {
    dispatch({ type: GET_LAST_PUTH, payload: "/forgot" });
    navigate("/forgot");
  };

  return (
    <section className={styles.container}>
      <form onSubmit={login} className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChangePass}
          value={pass}
          name={"password"}
          extraClass="mb-2"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Вход
        </Button>
        <div className={styles.linkRow}>
          <span>Вы - новый пользователь?</span>
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.linkRow}>
          <span>Забыли пароль?</span>
          <button onClick={toForgot} className={styles.buttonToForgot}>
            Восстановить пароль
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
