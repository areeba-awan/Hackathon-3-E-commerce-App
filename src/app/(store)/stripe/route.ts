
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../actions/createCheckoutSession";



export async function POST(req: NextRequest){
  if (!req.body) {
    return new Response(JSON.stringify({ error: 'Request body is null' }), { status: 400 });
  }
  const body = await req.json();
  const headersList = await headers()
  const sig = headersList.get('stripe-signature');

  if(!sig){
    return new Response(JSON.stringify({ error: 'Stripe signature is missing' }), { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if(!webhookSecret){
    console.log("⚠️ Stripe webhook secret is missing");
    return NextResponse.json({error: "Stripe webhook secret is missing"}, {status: 400});
  }

  let event: Stripe.Event

  try{
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (error){
    console.error("❌ Error verifying webhook event", error)
    return NextResponse.json({error: "Error verifying webhook event"}, {status: 400})
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderSanity(session);
      console.log("✅ Order created in Sanity:", order);
    } catch (error){
      console.error("❌ Error creating order in Sanity", error);
      return NextResponse.json({error: "Error creating order in Sanity"}, {status: 400});
    }
  }

  return NextResponse.json({received: true});
}

async function createOrderSanity(session: Stripe.Checkout.Session){
  const {
    id,
    payment_intent,
    customer,
    customer_details,
    total_details,
    metadata,
    customer_email,
    

  } = session

  if (!metadata) {
    throw new Error("Metadata is null");
  }
  const {orderNumber, customerName, customerEmail, clerkUserId, address, phone} = metadata as unknown as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id,{
    expand: ['data.price.product']
  })

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: 'reference',
      _ref: (item.price?.product as Stripe.Product)?.metadata.id
    },

    quantity: item.quantity || 0
  }))

  const order = await backendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    stripeCustomerId: customer,
    stripeCustomerEmail: customer_email,
    stripeCustomerName: customer_details?.name,
    stripeCustomerPhone: customer_details?.phone,
    stripeCustomerAddress: customer_details?.address,
    clerkUserId: clerkUserId,
    currency: session.currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    email: customerEmail,
    name: customerName,
    address: address,
    phone: phone,
    products: sanityProducts,
    status: 'paid',
    orderDate: new Date().toISOString(),
  })

  return order

}




