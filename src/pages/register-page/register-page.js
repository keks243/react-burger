import {React, useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './register-page.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";

  
export function RegisterPage() {

  const [name, setName] = useState('bob')
  const [email, setEmail] = useState('bob@example.com')
  const [pass, setPass] = useState('123')

  const onChangeName = e => {
    setName(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePass = e => {
    setPass(e.target.value)
  }
  


  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Регистрация</h1>
        <Input 
          onChange={onChangeName}
          value={name}
          name={'name'}
          placeholder={'Имя'}
        />
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
          Зарегистрироваться
        </Button>
        <div className={styles.linkRow}>
          <span>
            Уже зарегистрированы?
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

export default RegisterPage;
