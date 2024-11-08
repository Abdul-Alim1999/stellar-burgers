import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie } from './../../utils/cookie';

type TInitialState = {
  data: TUser;
  loading: boolean;
  error: null | { message: string };
  orderBurger: TOrder[];
};

const initialState: TInitialState = {
  data: {
    name: '',
    email: ''
  },
  loading: false,
  error: null,
  orderBurger: []
};

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const data = await getUserApi();

    return thunkAPI.fulfillWithValue(data.user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrdersByUser = createAsyncThunk(
  'user/getOrders',
  async (_, thunkAPI) => {
    try {
      const data = await getOrdersApi();

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (fields: TLoginData, thunkAPI) => {
    try {
      const data = await loginUserApi(fields);

      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      return thunkAPI.fulfillWithValue(data.user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (fields: TRegisterData, thunkAPI) => {
    try {
      const data = await registerUserApi(fields);

      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      return thunkAPI.fulfillWithValue(data.user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (fields: Partial<TUser>, thunkAPI) => {
    try {
      const data = await updateUserApi(fields);

      return thunkAPI.fulfillWithValue(data.user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      })

      .addCase(getOrdersByUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.orderBurger = action.payload;
        state.error = null;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.error = action.payload as { message: string };
        state.loading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string };
      });
  }
});

export default userSlice.reducer;
