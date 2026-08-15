import Stripe from "stripe";

// Inicializamos Stripe con la clave secreta del .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { items } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No hay productos en el carrito" });
    }

    // Mapeamos los productos al formato que Stripe requiere
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur", 
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe procesa los montos en centavos (ej: $10.00 = 1000)
      },
      quantity: item.quantity,
    }));

    // Creamos la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    // Devolvemos la URL generada por Stripe para que el frontend redirija al usuario
    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

export default { createCheckoutSession };