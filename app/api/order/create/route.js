import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";

import { inngest } from "@/config/inngest";


export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid data' });
    }

    // Map to correct shape for DB & processing
    const itemsForDb = items.map(item => ({
      product: item.productId || item.product,
      quantity: item.quantity,
    }));

    // Calculate total amount
    const amount = await itemsForDb.reduce(async (accP, item) => {
      const acc = await accP;
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      return acc + product.offerPrice * item.quantity;
    }, 0);

    // Send event (with correct itemsForDb)
    await inngest.send({
      name: 'order/created',
      data: {
        userId,
        address,
        items: itemsForDb,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    // Clear cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: 'Order placed' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
  