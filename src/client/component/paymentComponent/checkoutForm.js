import React from "react";
import axios from "axios";
import ModalClearIcon from "./modalClearIcon";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";

class CheckoutForm extends React.Component {
  state = {
    total: "",
    error: null,
    processing: false,
    disabled: true,
    clientSecret: "",
    stripe: null,
    elements: null,
    name: "",
    street: "",
    zipCode: "",
    state: "",
    city: "",
    country: "US",
  };

  componentDidMount() {
    const total = document.querySelectorAll(".total-number h6")[3].textContent;
    this.setState({ total });
    const body = [];
    document.querySelectorAll(".table-row").forEach((item) => {
      let id = item.id;
      let qty = item.childNodes[3].firstChild.nextSibling.value;
      body.push({ id, qty, coupon: this.props.state.state.coupon });
    });
    axios.post("/checkout", body).then((res) => {
      this.setState({ clientSecret: res.data.clientSecret });
    });
  }

  handleChange = async (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handlePaymentEvent = async (event) => {
    this.setState({
      disabled: event.empty,
      error: event.error ? event.error.message : "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, elements } = this.props;
    const { name, street, zipCode, city, state, country } = this.state;

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.confirmCardPayment(this.state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          address: {
            line1: street,
            line2: null,
            postal_code: zipCode,
            city: city,
            state: state,
            country: country,
          },
        },
      },
    });

    if (payload.error) {
      this.setState({
        error: `Payment failed ${payload.error.message}`,
        processing: false,
      });
    } else {
      this.setState({
        error: null,
        processing: false,
      });
      alert("Payment Successfully Completed");
      window.location.href = "/";
    }
  };

  render() {
    const cardStyle = {
      hidePostalCode: true,
      style: {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {},
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
    const { error, processing } = this.state;
    const { stripe } = this.props;
    return (
      <form id="payment-form" onSubmit={this.handleSubmit}>
        <div className="payment-modal-wrapper">
          <ModalClearIcon />
          <div className="inputs-wrapper">
            <input
              id="name"
              type="text"
              placeholder="Card Holder Name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              id="street"
              type="text"
              placeholder="Street Name"
              required
              value={this.state.street}
              onChange={this.handleChange}
            />
            <input
              id="zipCode"
              type="number"
              placeholder="Zip Code"
              required
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            <input
              id="city"
              type="text"
              placeholder="City"
              required
              value={this.state.city}
              onChange={this.handleChange}
            />
            <input
              id="state"
              type="text"
              placeholder="State"
              required
              value={this.state.state}
              onChange={this.handleChange}
            />
            <input
              id="country"
              type="text"
              readOnly
              autocomplete="off"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </div>
          <div className="FormRow">
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={this.handlePaymentEvent}
            />
          </div>
          <button disabled={!stripe} id="submit">
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner">
                  Loading...
                </div>
              ) : (
                `Pay ${this.state.total}`
              )}
            </span>
          </button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
        </div>
      </form>
    );
  }
}

const InjectedCheckoutForm = (props) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} state={props} />
    )}
  </ElementsConsumer>
);

export default InjectedCheckoutForm;
