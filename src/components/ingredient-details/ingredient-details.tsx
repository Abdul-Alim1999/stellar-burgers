import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector((state) => state.ingredients.data);

  const { id } = useParams();

  const ingredient = useMemo(
    () => ingredientData.find((item) => item._id === id),
    [ingredientData, id]
  );

  if (!ingredientData || !ingredient) {
    return <Preloader />;
  }

  // if (!ingredient) {
  //   return <div>No data</div>;
  // }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
