import React from "react"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const Checkout = class extends React.Component {
  const stripe = Stripe('pk_test_XYEVg3qXuaS0mjYj0guWzruG00rI8j4Aml')
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys
  componentDidMount() {
    this.stripe = window.Stripe('pk_test_XYEVg3qXuaS0mjYj0guWzruG00rI8j4Aml')
  }

  async redirectToCheckout(event) {
    event.preventDefault()
    const { error } = await this.stripe.redirectToCheckout({
      items: [{ sku: "sku_DjQJN2HJ1kkvI3", quantity: 1 }],
      successUrl: `http://localhost:8001/page-2/`,
      cancelUrl: `http://localhost:8001/`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  render() {
    return (
      <button
        style={buttonStyles}
        onClick={event => this.redirectToCheckout(event)}
      >
        BUY MY BOOK
      </button>
    )
  }
}

export default Checkout
