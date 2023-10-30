import { useEffect, useRef, useState } from "react";
import styles from "./profile-page.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
// import { getUserDate } from "../../services/users/selectors";
import { NavLink, useNavigate } from "react-router-dom";
// import { patchUser, postLogoutUser } from "../../services/users/actions";

export function ProfilePage() {
  //   const user = useSelector(getUserDate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isInputActive, setIsInputActive] = useState(false);

  const nameRefInput = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePostRequestUpdateUser = (event) => {
    event.preventDefault();
    // dispatch(patchUser(name, email, password, setIsInputDisabled));
  };

  useEffect(() => {
    if (!isInputDisabled) {
      nameRefInput.current.focus();
    }
  }, [isInputDisabled]);

  const handleOnIconClick = () => {
    setIsInputDisabled(!isInputDisabled);
  };
  const handleDefaultValue = () => {
    setIsInputDisabled(true);
    setIsInputActive(false);

    // setName(user.name);
    // setEmail(user.email);
  };
  //   useEffect(() => {
  //     if (user.name !== undefined) {
  //       setName(user.name);
  //       setEmail(user.email);
  //     }
  //   }, [user]);

  const handleLogout = () => {
    // dispatch(postLogoutUser(navigate));
  };

  const inputChangeValue = (e) => {
    setIsInputActive(true);
    console.log(e.target.value);
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
          <button className={styles.exitButton} onClick={handleLogout}>
            Выход
          </button>
        </div>

        <div className={styles.infoContainer}>
          <span className={styles.info}>В этом разделе вы можете</span>
          <span className={styles.info}>изменить свои персональные данные</span>
        </div>
      </div>
      <form onSubmit={handlePostRequestUpdateUser} className={styles.form}>
        <div className={styles.inputsContainer}>
          <Input
            value={name}
            type={"text"}
            disabled={isInputDisabled}
            icon="EditIcon"
            onIconClick={handleOnIconClick}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            ref={nameRefInput}
          />

          <EmailInput
            onChange={(e) => inputChangeValue(e)}
            value={email}
            name={"email"}
            isIcon={true}
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
