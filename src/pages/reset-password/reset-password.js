import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/user-actions/actions";

import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPasswordPage() {
  const [newPass, setNewPass] = useState("");
  const [code, setCode] = useState("");

  const onChangeNewPass = (e) => {
    setNewPass(e.target.value);
  };
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reset = (event) => {
    event.preventDefault();
    dispatch(resetPassword(newPass, code, navigate));
  };

  return (
    <section onSubmit={reset} className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Восставновление пароля</h1>

        <Input
          onChange={onChangeNewPass}
          value={newPass}
          placeholder="Введите новый пароль"
        />

        <Input
          onChange={onChangeCode}
          value={code}
          placeholder="Введите код из письма"
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

export default ResetPasswordPage;
