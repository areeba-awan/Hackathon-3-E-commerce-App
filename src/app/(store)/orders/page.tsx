import { getAllOrders } from '@/sanity/lib/order/getAllOrders';
import { Order, OrderItem } from '@/types/interfaces';
import React from 'react';

export default async function OrderPage() {
  const orders: Order[] = await getAllOrders();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order:Order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Order #{order._id}</h2>
            <p className="text-gray-700 mb-4">Date: {order.orderDate}</p>
            <p className="text-gray-700 mb-4">Total: ${order.totalPrice}</p>
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="list-disc list-inside">
              {order.products.map((item: OrderItem) => (
                <li key={item.product._id} className="text-gray-700">
                  {item.product.title} - ${item.product.price} x {item.product.quantity || 1}
                </li>
              ))} 
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}