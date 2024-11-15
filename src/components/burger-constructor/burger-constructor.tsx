import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from './../../services';
import { closeOrderModalData, requestOrder } from '@slices';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { constructorItems, orderModalData, orderRequest } = useSelector(
    (state) => state.ordersPlacement
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = constructorItems.ingredients.map((item) => item._id);
    dispatch(
      requestOrder([
        constructorItems.bun._id!,
        ...ingredientIds,
        constructorItems.bun._id!
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(closeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
