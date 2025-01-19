import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getConstructorItems, getOrderModalData, getOrderRequest, resetOrderModalData } from '../../services/constructor/slice';
import { useNavigate } from 'react-router-dom';
import { getIsAuthChecked } from '../../services/user/slice';
import { getOrderBurger } from '../../services/constructor/action';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuth = useSelector(getIsAuthChecked);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login')
    }
    
    if (!constructorItems.bun || orderRequest) return;

    const bunId = constructorItems.bun._id;
    const ingredientsId = constructorItems.ingredients.map((ingredient) => ingredient._id);
    const order = [bunId, ...ingredientsId, bunId];
      
    dispatch(getOrderBurger(order))
  };
  
  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
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
