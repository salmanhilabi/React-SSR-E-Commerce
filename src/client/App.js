import React from "react";
import { renderRoutes } from "react-router-config";
import ErrorBoundary from "../client/component/ErrorBoundry";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../../config.json";

const promise = loadStripe(config.PUBLIC_KEY);

const App = ({ route }) => {
  return (
    <div className="container-fluid">
      <Elements stripe={promise}>
        <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
      </Elements>
    </div>
  );
};

export default {
  component: App,
};
