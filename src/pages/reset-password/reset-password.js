import { React, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPasswordPage() {
  const [newPass, setNewPass] = useState("");
  const [kode, setKode] = useState("");


  const onChangeNewPass = (e) => {
    setNewPass(e.target.value);
  };
  const onChangeKode = (e) => {
    setKode(e.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Восставновление пароля</h1>

        <Input
          onChange={onChangeNewPass}
          value={newPass}
          placeholder="Введите новый пароль"
        />

        <Input
          onChange={onChangeKode}
          value={kode}
          placeholder="Введите код из письма"
        />

        <Button htmlType="button" type="primary" size="medium">
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
