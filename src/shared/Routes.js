import Home from "../client/pages/Home";
import NotFoundPage from "../client/pages/NotFoundPage";
import App from "../client/App";
import ProductDetail from "../client/pages/ProductDetail";
import ShoppingCart from "../client/pages/ShoppingCart";

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true,
      },
      {
        ...ProductDetail,
        path: "/product-detail",
      },
      {
        ...ShoppingCart,
        path: "/shopping-cart",
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
