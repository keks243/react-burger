import {React, useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './forgot-password.module.css';
import {
  Button,
  EmailInput,
  
} from "@ya.praktikum/react-developer-burger-ui-components";

  
export function ForgotPasswordPage() {

  const [email, setEmail] = useState('bob@example.com')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Восставновление пароля</h1>
       
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          isIcon={false}
        />
       
        <Button htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
        <div className={styles.linkRow}>
          <span>
            Вспомнили пароль?
          </span>
          <Link
            to={'/login'}
            className={styles.link}
          >
            Войти
          </Link>
        </div>
    
       
      </form>
    </section>
  );
} 

export default ForgotPasswordPage;
