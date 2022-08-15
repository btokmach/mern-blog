import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registrationUser = createAsyncThunk(
  "auth/registrationUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/registration", {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log("error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log("error");
    }
  }
);

export const getMe = createAsyncThunk("auth/loginUser", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log("error");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoading = false
      state.status = null
    },
  },
  extraReducers: {
    // Registration
    [registrationUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registrationUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registrationUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Get me перевірка авторизації
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;

export default authSlice.reducer;
