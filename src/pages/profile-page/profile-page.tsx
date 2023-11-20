import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import styles from "./profile-page.module.css";
import {
  Button,
  EmailInput as BaseEmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserDate } from "../../services/user-actions/selectors";
import { NavLink, useNavigate } from "react-router-dom";
import { patchUser, userLogout } from "../../services/user-actions/actions";

interface IUser {
  name: string;
  email: string;
}

interface EmailInputProps {
  value: string;
  name: string;
  isIcon?: boolean;
  disabled?: boolean;
  onIconClick?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {
  return <BaseEmailInput {...props} />;
};

export function ProfilePage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [isInputEmailDisabled, setIsInputEmailDisabled] = useState<boolean>(true);
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [isInputEmailActive, setIsInputEmailActive] = useState<boolean>(false);

  const user: IUser = useSelector(getUserDate);

  const nameRefInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch<any>(patchUser(
        name,
        email,
        password,
        setIsInputDisabled,
        setIsInputEmailDisabled
      )
    );
  };

  useEffect(() => {
    if (!isInputDisabled && nameRefInput.current) {
      nameRefInput.current.focus();
    }
  }, [isInputDisabled]);

  const iconClick = () => {
    setIsInputDisabled(!isInputDisabled);
  };

  const iconClickEmail = () => {
    setIsInputEmailDisabled(!isInputEmailDisabled);
  };

  const handleDefaultValue = () => {
    setIsInputDisabled(true);
    setIsInputActive(false);

    setIsInputEmailDisabled(true);
    setIsInputEmailActive(false);

    setName(user.name);
    setEmail(user.email);
  };

  useEffect(() => {
    if (user.name !== undefined) {
      setName(user.name);
      setEmail(user.email);
      console.log(user.name);
    }
  }, [user]);

  const logout = () => {
    dispatch<any>(userLogout(navigate));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerLeftMenu}>
        <div className={styles.containerLink}>
          <NavLink to="/profile" className={styles.link}>
            {({ isActive }) => (
              <span className={isActive ? styles.selectLink : styles.link}>
                Профиль
              </span>
            )}
          </NavLink>
          <NavLink to="orders" className={styles.link}>
            {({ isActive }) => (
              <span className={isActive ? styles.selectLink : styles.link}>
                История заказов
              </span>
            )}
          </NavLink>
          <button className={styles.exitButton} onClick={logout}>
            Выход
          </button>
        </div>

        <div className={styles.infoContainer}>
          <span className={styles.info}>В этом разделе вы можете</span>
          <span className={styles.info}>изменить свои персональные данные</span>
        </div>
      </div>
      <form onSubmit={updateUser} className={styles.form}>
        <div className={styles.inputsContainer}>
          <Input
            value={name}
            type={"text"}
            disabled={isInputDisabled}
            icon="EditIcon"
            onIconClick={iconClick}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            ref={nameRefInput}
          />

          <EmailInput
            value={email}
            name={"email"}
            isIcon={true}
            disabled={isInputEmailDisabled}
            onIconClick={iconClickEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            icon="EditIcon"
          />
        </div>

        <>
          <Button
            htmlType="button"
            type="secondary"
            size="small"
            onClick={handleDefaultValue}
          >
            Отменить
          </Button>
          <Button htmlType="submit" type="primary" size="small">
            Сохранить
          </Button>
        </>
      </form>
    </div>
  );
}

export default ProfilePage;
