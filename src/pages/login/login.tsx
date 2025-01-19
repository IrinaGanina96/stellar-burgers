import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getIsAuthChecked } from '../../services/user/slice';
import { TLoginData } from '@api';
import { login } from '../../services/user/action';
import { Navigate} from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isAuth = useSelector(getIsAuthChecked);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userLogin: TLoginData = {
      email: email,
      password: password
    };
    dispatch(login(userLogin));
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
