import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/feed/action';
import { getLoading, getFeedState } from '../../services/feed/slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedState);
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!orders.length || loading ) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  };
