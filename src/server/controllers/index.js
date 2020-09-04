import express from "express";
import Products from "../models/products";
import renderer from "../../shared/helpers/renderer";
import createStore from "../../shared/store/index";
import Routes from "../../shared/Routes";
import { matchRoutes } from "react-router-config";
import config from "../../../config.json";
import Stripe from "stripe";

const stripe = new Stripe(config.SECRET_KEY);
const router = express();

router.get("*", (req, res) => {
  const store = createStore();
  const routes = matchRoutes(Routes, req.path);

  const promises = routes
    .map(({ route }) => {
      return route.loadData
        ? Products.find({}, (err, users) => {
            if (err) throw err;
            route.loadData(store, users);
          })
        : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(reject);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

const calculateOrderAmount = (objs) => {
  let arr = [];
  let discount = 0;

  objs.map((obj) => {
    let price = obj.price;
    price = price * obj.qty;
    if (obj.coupon !== "cart40") {
      discount = 0;
    } else {
      discount = 40;
    }
    arr.push(price);
  });

  let subTotal = arr.reduce((sum, num) => sum + num);
  let tax = subTotal * 0.12;
  tax = tax.toFixed(2);
  let sum = parseFloat(subTotal) + parseFloat(tax) - discount;
  let total = Math.round(sum * 100);
  return total;
};

const getAllItemsInCart = async (items) => {
  let arr = [];
  for (let item of items) {
    await Products.findById(item.id, (err, data) => {
      if (err) console.log(err);
      return arr.push({
        qty: item.qty,
        price: data.mainPrice,
        coupon: item.coupon,
      });
    });
  }
  return arr;
};

router.post("/checkout", async (req, res) => {
  let items = await getAllItemsInCart(req.body);
  let total = await calculateOrderAmount(items);

  const paymentIntent = await stripe.paymentIntents.create({
    description: "E-Commerce Web App",
    amount: total,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;
