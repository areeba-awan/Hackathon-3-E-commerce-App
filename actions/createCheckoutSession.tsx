
import stripe from "@/lib/stripe";
import { v4 as uuidv4 } from "uuid";
import { CartItemType } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";


export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  address: string;
  phone: string;
};

export async function createCheckoutSession(
  items: CartItemType[],
  metadata: Metadata
) {
  
  try {
    console.log("Items received for checkout:", items);

    // const baseUrl =
    //   process.env.NODE_ENV === "production"
    //     ? `https://${process.env.VERCEL_URL}`
    //     : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://hackathon-3-e-commerce-app.vercel.app//" // Fallback URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}`

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/cancel`;

    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            description: `Product ID : ${item._id}`,
            metadata: {
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
              title: item.title,
            },
            images: [item.imageUrl],
            
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        address: metadata.address,
        phone: metadata.phone,
      },
    });



    const order = {
      _type: "order",
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId,
      address: metadata.address,
      phone: metadata.phone,
      products: items.map(item => ({
        _key: uuidv4(),
        product: {
          _type: "reference",
          _ref: item._id,
        },
        quantity: item.quantity,
      })),
      totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "pending",
      orderDate: new Date().toISOString(),
      stripeSessionId: session.id,

    };

    console.log("Order Created in Sanity ", order);

    await client.create(order);
   

    return { success: true, sessionId: session.id };
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}
// import { NextRequest } from 'next/server';
// import stripe from '@/lib/stripe';

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const session_id = searchParams.get('session_id');

//   if (!session_id || typeof session_id !== 'string') {
//     return Response.json({ error: 'Invalid session ID' }, { status: 400 });
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id, {
//       expand: ['line_items'],
//     });

//     return Response.json(session, { status: 200 });
//   } catch (error) {
//     console.error('Error retrieving session:', error);
//     return Response.json({ error: 'Failed to retrieve session' }, { status: 500 });
//   }
// }
