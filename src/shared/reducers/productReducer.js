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
} from "../../client/actions/actionType";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  carts: [],
  modal: false,
  coupon: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS_TO_LIST:
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: action.payload,
      };
    case ADD_FILTERED_LIST:
      let products = state.allProducts.filter(
        (item) => item.category === action.payload
      );
      return {
        ...state,
        filteredProducts:
          action.payload === "all" ? state.allProducts : products,
      };
    case ADD_TO_CART:
      return {
        ...state,
        carts: state.carts.concat(action.payload),
      };
    case REMOVE_FROM_CART:
      let item = state.carts.find((cart) => cart._id === action.payload);
      let items = state.carts.filter((cart) => cart._id !== action.payload);
      item.salePrice = item.mainPrice;
      item.stockQty = 1;
      items.push(item);
      return {
        ...state,
        carts: state.carts.filter((cart) => cart._id !== action.payload),
      };
    case INCREMENT_QUANTITY:
      let inc_product_qty = state.carts.find(
        (item) => item._id === action.payload
      );
      let inc_carts = state.carts.filter((item) => item._id != action.payload);
      inc_product_qty.stockQty = inc_product_qty.stockQty + 1;
      inc_product_qty.salePrice =
        inc_product_qty.salePrice + inc_product_qty.mainPrice;
      inc_carts.push(inc_product_qty);
      return {
        ...state,
        carts: inc_carts,
      };
    case DECREMENT_QUANTITY:
      let dec_product_qty = state.carts.find(
        (item) => item._id === action.payload
      );
      let dec_carts = state.carts.filter((item) => item._id != action.payload);
      if (dec_product_qty.stockQty <= 1) {
        dec_product_qty.stockQty = 1;
        dec_carts.push(dec_product_qty);
      } else {
        dec_product_qty.stockQty = dec_product_qty.stockQty - 1;
        dec_product_qty.salePrice =
          dec_product_qty.salePrice - dec_product_qty.mainPrice;
        dec_carts.push(dec_product_qty);
      }
      return {
        ...state,
        carts: dec_carts,
      };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        carts: action.payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    case ADD_COUPON_TO_STATE:
      return {
        ...state,
        coupon: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
