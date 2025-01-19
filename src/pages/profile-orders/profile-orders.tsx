import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrder } from '../../services/order/action';
import { getFeedState } from '../../services/feed/slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedState);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
