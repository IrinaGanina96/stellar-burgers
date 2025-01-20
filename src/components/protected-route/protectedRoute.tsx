import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader/preloader';
import { getLoading, getUserState } from '../../services/user/slice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps): React.ReactElement => {
  const isAuthChecked = useSelector(getLoading); // getIsAuthChecked — селектор получения состояния загрузки пользователя
  const user = useSelector(getUserState); // getUser — селектор получения пользователя из store
  const location = useLocation(); // используется для получения текущего местоположения

  if (isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    // если пользователя в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    // если пользователь есть в хранилище
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement => (
  <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
);
