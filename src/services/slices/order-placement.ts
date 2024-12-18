import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findAllByTestId } from '@testing-library/react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid4 } from 'uuid';

type TInitialState = {
  constructorItems: {
    bun: {
      price: number;
      _id?: string;
    };
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: null | TOrder;
  loading: boolean;
  error: null | string;
};

export const requestOrder = createAsyncThunk(
  'order/request',
  async (array: string[], thunkAPI) => {
    try {
      const data = await orderBurgerApi(array);

      return thunkAPI.fulfillWithValue(data.order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: TInitialState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,

  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addConstructorItem: {
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: {
          ...ingredient,
          uniqueId: uuid4()
        }
      }),
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient & { uniqueId: string }>
      ) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.constructorItems.bun = item;
        } else {
          state.constructorItems.ingredients.push(item);
        }
      }
    },
    deleteConstructorItemByIndex: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== action.payload
        );
    },
    closeOrderModalData: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    moveConstructorItems: (state, action) => {
      const index =
        action.payload.type === 'up'
          ? action.payload.index - 1
          : action.payload.index + 1;

      const moveItem = state.constructorItems.ingredients[action.payload.index];

      state.constructorItems.ingredients.splice(action.payload.index, 1);

      state.constructorItems.ingredients.splice(index, 0, moveItem);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(requestOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(requestOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.error = null;
        state.orderRequest = false;
        state.constructorItems = {
          bun: { price: 0 },
          ingredients: []
        };
      })
      .addCase(requestOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.orderRequest = false;
      });
  }
});

export const {
  addConstructorItem,
  deleteConstructorItemByIndex,
  moveConstructorItems,
  closeOrderModalData
} = ordersSlice.actions;

export default ordersSlice.reducer;
