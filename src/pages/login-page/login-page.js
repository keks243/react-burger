import {React, useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './login-page.module.css';
import {
  Button,
  EmailInput,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

  
export function LoginPage() {

  const [email, setEmail] = useState('bob@example.com')
  const [pass, setPass] = useState('123')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePass = e => {
    setPass(e.target.value)
  }
  


  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChangePass}
          value={pass}
          name={'password'}
          extraClass="mb-2"
        />
        <Button htmlType="button" type="primary" size="medium">
          Вход
        </Button>
        <div className={styles.linkRow}>
          <span>
            Вы - новый пользователь?
          </span>
          <Link
            to={'/register'}
            className={styles.link}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.linkRow}>
          <span>
            Забыли пароль?
          </span>
          <Link
            to={'/forgot'}
            className={styles.link}
          >
            Восстановить пароль
          </Link>
        </div>
       
      </form>
    </section>
  );
} 

export default LoginPage;
