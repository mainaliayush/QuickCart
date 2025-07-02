import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Order";
import Address from "@/models/Address";


export async function GET(request) {
    try {
      const { userId } = getAuth(request);
      const isSeller = await authSeller(userId);

      console.log("USerID: ", userId )
      console.log("isSeller: ", isSeller )


      if (!isSeller) {
        return NextResponse.json({ success: false, message: 'not authorized' })
      }

      await connectDB()

      Address.length

      const orders = await Order.find({ }).populate('address items.product')

      return NextResponse.json({ success: true, orders})

    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
    