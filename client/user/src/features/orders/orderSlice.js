import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const orderSlice = createSlice({
  name: "Orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    loading: false,
    error: null,
    topOrder: [],
    detailOrder: [],
    paymentStatus: "",
  },
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTopOrder: (state, action) => {
      state.topOrder = action.payload;
    },
    setNewOrder: (state, action) => {
      const { status, id } = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
    },
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    setDetailOrder: (state, action) => {
      state.detailOrder = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
});

export const {
  setOrder,
  setLoading,
  setError,
  setTopOrder,
  setNewOrder,
  setTotalOrders,
  setDetailOrder,
  setPaymentStatus,
} = orderSlice.actions;

export const fetchOrder = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await instance({
        method: "get",
        url: "/orders",
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setOrder(data));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const handleNotificationPayment = (order_id, transaction_status) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await instance({
        method: "post",
        url: "/orders/webhook",
        data: { order_id, transaction_status },
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setNewOrder({ status: transaction_status, id: order_id }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchInputOrder = (products, contactUser) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await instance({
        method: "post",
        url: "/orders",
        data: {
          products,
          addressShiping: contactUser.addressShiping,
          phoneNumber: contactUser.phoneNumber,
        },
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(fetchPayment(data.newOrder.id));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchPayment = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const payment = await instance({
        method: "post",
        url: "/orders/payment",
        data: { orderId },
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const token = payment.data.token;

      window.snap.pay(token, {
        onSuccess: async (result) => {
          dispatch(setPaymentStatus(result.transaction_status))
          await dispatch(
            handleNotificationPayment(
              Number(result.order_id.split("-")[1]),
              result.transaction_status
            )
          );
          dispatch(setPaymentStatus(""))
        },
        onPending: async (result) => {
          dispatch(setPaymentStatus(result.transaction_status))
          await dispatch(
            handleNotificationPayment(
              Number(result.order_id.split("-")[1]),
              result.transaction_status
            )
          );
          dispatch(setPaymentStatus(""))
        },
        onError: async (result) => {
          dispatch(setPaymentStatus(result.transaction_status))
          await dispatch(
            handleNotificationPayment(
              Number(result.order_id.split("-")[1]),
              result.transaction_status
            )
          );
          dispatch(setPaymentStatus(""))
        },
        onClose: () => {
          dispatch(setPaymentStatus(""))
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
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

export const fetchTotalOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/orders/data",
      });

      dispatch(setTotalOrders(data.length));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDetailOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await instance({
        method: "get",
        url: `/orders/detail/${id}`,
      });

      dispatch(setDetailOrder(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export default orderSlice.reducer;
