import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const addFeatureImage = createAsyncThunk(
  "/order/addFeaturesList",

  async (image) => {
    const result = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      {
        image,
      }
    );

    return result.data;
  }
);

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImage",

  async () => {
    const result = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );

    return result.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/order/deleteFeatureImage",

  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`
    );

    return result.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = state.featureImageList.filter(
          (imageItem) => imageItem._id !== action.payload.data._id
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
  },
});

export default commonSlice.reducer;
