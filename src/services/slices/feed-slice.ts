import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';

type TInitialState = {
  data: TOrdersData;
  loading: boolean;
  error: null | string;
  order: any;
};

const initialState: TInitialState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null,
  order: null
};

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async (_, thunkAPI) => {
    try {
      const data = await getFeedsApi();

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFeedById = createAsyncThunk(
  'feeds/getFeed',
  async (id: number, thunkAPI) => {
    try {
      const data = await getOrderByNumberApi(id);

      return thunkAPI.fulfillWithValue(data.orders[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getFeedById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(getFeedById.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeedById.rejected, (state, action) => {
        state.error = null;
        state.loading = false;
      });
  }
});

export default feedsSlice.reducer;
