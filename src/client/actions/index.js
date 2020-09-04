import {
  ADD_PRODUCTS_TO_LIST,
  ADD_FILTERED_LIST,
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  TOGGLE_MODAL,
  ADD_COUPON_TO_STATE,
} from "./actionType";

export const AddProductsToList = (store, data) => {
  store.dispatch({ type: ADD_PRODUCTS_TO_LIST, payload: data });
};

export const AddFilteredList = (id) => async (dispatch) => {
  await dispatch({ type: ADD_FILTERED_LIST, payload: id });
};

export const AddProductToCart = (item) => async (dispatch) => {
  await dispatch({ type: ADD_TO_CART, payload: item });
};

export const IncrementQty = (id) => async (dispatch) => {
  await dispatch({ type: INCREMENT_QUANTITY, payload: id });
};

export const DecrementQty = (id) => async (dispatch) => {
  await dispatch({ type: DECREMENT_QUANTITY, payload: id });
};

export const RemoveFromCart = (id) => async (dispatch) => {
  await dispatch({ type: REMOVE_FROM_CART, payload: id });
};

export const RemoveAllFromCart = () => async (dispatch) => {
  dispatch({ type: REMOVE_ALL_FROM_CART, payload: [] });
};

export const ToggleModal = () => async (dispatch) => {
  dispatch({ type: TOGGLE_MODAL, payload: {} });
};

export const AddCouponToState = (coupon) => async (dispatch) => {
  dispatch({ type: ADD_COUPON_TO_STATE, payload: coupon });
};
