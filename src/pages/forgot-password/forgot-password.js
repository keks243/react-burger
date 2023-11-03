import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../services/user-actions/actions";
import { GET_LAST_PUTH } from "../../services/user-actions/actions";

import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const puth = useSelector((state) => state.usersInfo.lastPuth);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgot = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(email, navigate));
    dispatch({ type: GET_LAST_PUTH, payload: "/forgot" });
    navigate("/password-reset");
  };

  return (
    <section className={styles.container}>
      <form onSubmit={forgot} className={styles.form}>
        <h1 className={styles.heading}>Восставновление пароля</h1>

        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
        />

        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <div className={styles.linkRow}>
          <span>Вспомнили пароль?</span>
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordPage;
