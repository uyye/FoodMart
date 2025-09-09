import { createSlice } from "@reduxjs/toolkit";
import instance from "../api/axiosInstance";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderMontly: [],
    topOrder: [],
    orderDetail: [],
    showAll: true,
    page: 1,
    totalItems: 0,
    filter: "",
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.totalItems = action.payload.totalItems;
    },
    setOrderMontly: (state, action) => {
      state.orderMontly = action.payload;
    },
    setTopOrder: (state, action) => {
      state.topOrder = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
    resetOrderDetail: (state, action) => {
      state.orderDetail = [];
    },
    setShowAll: (state, action) => {
      state.showAll = action.payload;
    },
    pushOneOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setOrders,
  setOrderMontly,
  setTopOrder,
  setOrderDetail,
  resetOrderDetail,
  setShowAll,
  pushOneOrder,
  setPage,
  setFilter
} = orderSlice.actions;

export const fetchDataOrder = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/orders/data",
      });

      dispatch(setOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOrderMontly = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/orders/current-month",
      });

      dispatch(setOrderMontly(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTopOrder = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/orders/top-order",
      });

      dispatch(setTopOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOrderById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/orders/detail/${id}`,
      });

      console.log(data, "DATA DETAIL ORDER DI SLICE");

      dispatch(setOrderDetail(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOrderData = () => {
  return async (dispatch, getState) => {
    const { showAll, page, filter } = getState().order;

    try {
      const { data } = await instance({
        method: "get",
        url: "/orders/list",
        params: {
          showAll,
          page,
          filter,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(setOrders({ orders: data.orders, totalItems: data.totalItems }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMarkOrder = (id) => {
  return async (dispatch) => {
    try {
      await instance({
        method: "put",
        url: `/orders/read/${id}`,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("MARKING DONE");
    } catch (error) {
      console.log(error);
    }
  };
};

export default orderSlice.reducer;
