const { STRIPE_SECRET_KEY, CLIENT_URL } = require("../config");
const Order = require("../models/order");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

class OrderController {
  static async create(request, response) {
    const data = request.body;
    const user = request.user;

    const order = await (
      await Order.create({
        user: user._id,
        ...data,
      })
    ).populate("products.product");

    const session = await stripe.checkout.sessions.create({
      line_items: order.products.map(({ product, quantity }) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      })),
      client_reference_id: order._id.toString(),
      customer_email: user.email,
      mode: "payment",
      success_url: CLIENT_URL,
      cancel_url: CLIENT_URL,
    });

    return response.status(201).json({
      url: session.url,
    });
  }

  static async stripeWebhook(request, response) {
    const event = request.body;

    switch (event.type) {
      case "checkout.session.completed":
        const client_reference_id = event.data.object.client_reference_id;
        const payment_intent = event.data.object.payment_intent;
        const payment_intent_status = event.data.object.payment_status;

        const order = await Order.findById(client_reference_id);
        order.payment.id = payment_intent;
        order.payment.status =
          payment_intent_status === "paid" ? "success" : "failed";
        await order.save();

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response.json({ received: true });
  }

  static async list(request, response) {}

  static async detail(request, response) {}

  static async cancel(request, response) {}
}

module.exports = OrderController;
