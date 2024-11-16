import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  data: TIngredient[];
  loading: boolean;
  error: null | string;
};

export const initialState: TInitialState = {
  data: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, thunkAPI) => {
    try {
      const data = await getIngredientsApi();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Не удалось получить ингредиенты';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла неизвестная ошибка';
      });
  }
});

export default ingredientsSlice.reducer;
