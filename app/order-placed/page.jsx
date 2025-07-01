// 'use client'
// import { assets } from '@/assets/assets'
// import { useAppContext } from '@/context/AppContext'
// import Image from 'next/image'
// import { useEffect } from 'react'

// const OrderPlaced = () => {

//   const { router, setCartItems } = useAppContext()

//   useEffect(() => {
//     setCartItems({})
//     setTimeout(() => {
//       router.push('/my-orders')
//     }, 2000)
//   }, [])

//   return (
//     <div className='h-screen flex flex-col justify-center items-center gap-5'>
//       <div className="flex justify-center items-center relative">
//         <Image className="absolute p-5" src={assets.checkmark} alt='' />
//         <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
//       </div>
//       <div className="text-center text-2xl font-semibold">Order Placed Successfully</div>
//     </div>
//   )
// }

// export default OrderPlaced

'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const OrderPlaced = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken, setCartItems } = useAppContext();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      toast.error('Missing session info');
      return;
    }

    const createOrderAfterPayment = async () => {
      try {
        // Get Stripe session metadata
        const res = await fetch(`/api/payment/checkout-session?sessionId=${sessionId}`);
        const { metadata } = await res.json();

        if (!metadata) throw new Error('Missing metadata');

        const token = await getToken();

        // Send order create request to your existing endpoint
        const orderRes = await fetch('/api/order/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            address: metadata.addressId,
            items: JSON.parse(metadata.cart)
          }),
        });

        const orderData = await orderRes.json();

        if (orderData.success) {
          setCartItems({});
          toast.success('Order placed successfully!');
          setTimeout(() => router.push('/my-orders'), 3000);
        } else {
          toast.error(orderData.message || 'Failed to create order');
        }

      } catch (error) {
        toast.error(error.message || 'Error creating order');
      }
    };

    createOrderAfterPayment();

  }, [searchParams, router, getToken, setCartItems]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      <div className="text-center text-2xl font-semibold">Processing your order...</div>
    </div>
  );
};

export default OrderPlaced;
