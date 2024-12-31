import { createSlice } from "@reduxjs/toolkit";

const tokenFromLocalStorage = localStorage.getItem("token");
console.log("Token from localStorage:", tokenFromLocalStorage);

let initialState = {
    signupData: null,
    loading: false,
    token: tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignUpData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

export const { setSignUpData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
