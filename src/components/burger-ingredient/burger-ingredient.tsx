import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { addConstructorItem } from '@slices';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from '../../services';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addConstructorItem({ ...ingredient, id: ingredient._id }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
