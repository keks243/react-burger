import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/user-actions/actions';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks-redux";
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPasswordPage: React.FC = () => {
  const [newPass, setNewPass] = useState('');
  const [code, setCode] = useState('');

  const onChangeNewPass = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPass(e.target.value);
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const reset = (event: FormEvent) => {
    event.preventDefault();
    dispatch(resetPassword(newPass, code, navigate));
  };

  return (
    <section>
      <form onSubmit={reset} className={styles.container}>
        <h1 className={styles.heading}>Восстановление пароля</h1>

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
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
