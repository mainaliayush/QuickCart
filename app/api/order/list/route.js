import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Order";
import Address from "@/models/Address";


export async function GET(request) {
    try {
      const { userId } = getAuth(request);

      await connectDB()

      Address.length
      Product.length

      const orders = await Order.find({userId}).populate('address items.product')

      return NextResponse.json({ success: true, orders})

    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
    