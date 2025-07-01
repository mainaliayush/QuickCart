// /app/api/payment/checkout/route.js (for Next.js 13+)
import Stripe from "stripe";
import connectDB from '@/config/db';
import Product from '@/models/Product';


export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, email, addressId } = body;

    console.log("items: ", items)
    console.log("email: ", email)

    await connectDB();

    const productIds = items.map(item => item.productId);
    console.log("productIDs: ", productIds)

    const dbProducts = await Product.find({ _id: { $in: productIds } });
    console.log("dbProducts: ", dbProducts)
    

    const line_items = items.map((item) => {
      const product = dbProducts.find(p => p._id.toString() === item.productId);

      console.log("item.product:", item.product);
      console.log("dbProducts ids:", dbProducts.map(p => p._id.toString()));

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.offerPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-placed?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?canceled=true`,
      metadata: {
        addressId,
        cart: JSON.stringify(items),
      },
    });

    return Response.json({ url: session.url });

  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
