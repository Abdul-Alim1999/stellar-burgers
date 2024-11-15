import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import ordersReducer from './slices/order-placement';
import userReducer from './slices/user-slice';
import feedReducer from './slices/feed-slice';
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  ordersPlacement: ordersReducer,
  feeds: feedReducer
});
