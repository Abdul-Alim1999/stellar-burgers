import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services';
import { getOrdersByUser } from '@slices';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orderBurger } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersByUser());
  }, []);
  const orders: TOrder[] = orderBurger;

  return <ProfileOrdersUI orders={orders} />;
};
