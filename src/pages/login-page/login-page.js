import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {userAuthorize} from "../../services/user-actions/actions";

import styles from './login-page.module.css';
import {
  Button,
  EmailInput,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

  
export function LoginPage() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePass = e => {
    setPass(e.target.value)
  }
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = (event) => {
      event.preventDefault();
      dispatch(userAuthorize(email, pass, navigate))
  }

  return (
    <section className={styles.container}>
      <form onSubmit={login} className={styles.form}>
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
        <Button htmlType="submit" type="primary" size="medium">
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
