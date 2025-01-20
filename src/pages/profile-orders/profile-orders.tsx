import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrder } from '../../services/order/action';
import { getLoading, getOrderState } from '../../services/order/slice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const orders: TOrder[] = useSelector(getOrderState);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
