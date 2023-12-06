import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userCreate } from '../../services/user-actions/actions';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks-redux";

import styles from './register-page.module.css';
import {
  Button,
  EmailInput as BaseEmailInput,
  PasswordInput,
  Input as BaseInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface RegisterPageProps {}

interface EmailInputProps {
  value: string;
  name: string;
  isIcon?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {
  return <BaseEmailInput {...props} />;
};

interface InputProps {
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return <BaseInput {...props} />;
};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('bob@example.com');
  const [pass, setPass] = useState('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const register = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userCreate(email, pass, name, navigate));
  };

  return (
    <section className={styles.container}>
      <form onSubmit={register} className={styles.form}>
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className={styles.linkRow}>
          <span>Уже зарегистрированы?</span>
          <Link to={'/login'} className={styles.link}>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
