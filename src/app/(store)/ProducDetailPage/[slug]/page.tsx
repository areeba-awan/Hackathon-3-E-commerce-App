// import { client } from '@/sanity/lib/client';
// import { Product } from '@/types/interfaces';
// import React from 'react'
// import Image from 'next/image';
// import Link from 'next/link';
// import { TrolleyIcon } from '@sanity/icons';
// import { fetchFeatureProducts } from '@/sanity/lib/product/getFeatureProducts';
// import { useCart } from '@/context/CartContext'


// export default async function page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;}
// ) {

//   const {addToCart} = useCart()
  
//   const { slug } = await params;
//   const query = `*[_type == "products" && slug.current == $slug][0]{
//   _id,
//     title,
//     "imageUrl": image.asset->url,
//     price,
//     badge,
//     priceWithoutDiscount,
//     inventory,
//     description,
//   }` ;
//   const product: Product | null = await client.fetch(query, { slug });
//   const featureProduct = await fetchFeatureProducts();
  

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div>
//       <div className=" px-4 py-8 ">
//       <div className="flex gap-8 flex-col md:flex-row items-center justify-center">
        
//         <div className=" h-full md:h-96">
//           <Image
//             src={product.imageUrl}
//             alt={product.title}
//             height={450}
//             width={450}
//             className="rounded-lg shadow-md"
//           />
//         </div>

        
//         <div className="flex flex-col justify-center items-center md:items-start">
//           <div className="flex flex-col justify-center md:items-start items-center">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               {product.title}
//             </h1>
//             <div className="w-28 py-2 bg-[#029FAE] text-center rounded-3xl text-white font-semibold ">
//             {product.priceWithoutDiscount && (
//               <span className="text-gray-500 line-through mr-2">
//                 ${product.priceWithoutDiscount}
//               </span>
//             )}
//             <span className="text-white font-bold">${product.price}</span>
//             </div>
//           </div>

//           <hr className="my-6 w-80" />
//           <div className="w-96 flex flex-col justify-center items-center md:items-start">
//             <p className="text-gray-400 md:text-start text-center">{product.description}</p>
//             <div className="mt-6 w-48 py-3 bg-[#029FAE] text-white text-lg font-medium rounded-md hover:bg-teal-600 transition duration-300 flex text-center justify-center items-center">
            
//             <button onClick={() => addToCart({...product, quantity: product.quantity || 1})}
//              className='flex items-center gap-4'>
//             <TrolleyIcon className="w-8 h-8"/>
//               Add to Cart
//             </button>
//             </div>
            
//           </div>
//         </div>
//       </div>

      
//     </div>

// {/* Featured Products Section */}
// <div className="mt-36">
//         <div className="flex justify-between">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Featured Products
//           </h2>
//           <Link href={"/products/"} className="underline underline-offset-4">
//             View All
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//           {featureProduct.slice(0, 5).map((item) => (
//             <div
//               key={item._id}
//               className=" p-4 rounded-lg transition duration-300"
//             >
//               <div className="relative w-full h-32 mb-4">
//                 <Image
//                   src={item.imageUrl}
//                   alt={item.title}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded"
//                 />
//               </div>
//               <div className="flex justify-between">
//               <h3 className="text-sm font-medium text-gray-800 mb-2">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 text-sm">${item.price}</p>
//               </div>
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/interfaces';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrolleyIcon } from '@sanity/icons';
import { fetchFeatureProducts } from '@/sanity/lib/product/getFeatureProducts';
import { useCart } from '@/context/CartContext';
import Loading from '../../loading';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [featureProduct, setFeatureProduct] = useState<Product[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Unwrap the params promise using React.use
  const { slug } = React.use(params);

  useEffect(() => {
    async function fetchData() {
      // Fetch the product based on the slug
      const query = `*[_type == "products" && slug.current == $slug][0]{
        _id,
        title,
        "imageUrl": image.asset->url,
        price,
        badge,
        priceWithoutDiscount,
        inventory,
        description,
      }`;
      const fetchedProduct: Product | null = await client.fetch(query, { slug });
      setProduct(fetchedProduct);

      // Fetch featured products
      const fetchedFeatureProducts = await fetchFeatureProducts();
      setFeatureProduct(fetchedFeatureProducts);
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);    

if (!product) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <div className="px-4 py-8">
        <div className="flex gap-8 flex-col md:flex-row items-center justify-center">
          <div className="h-full md:h-96">
            <Image
              src={product.imageUrl}
              alt={product.title }
              height={450}
              width={450}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="flex flex-col justify-center md:items-start items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product?.title}</h1>
              <div className="w-28 py-2 bg-[#029FAE] text-center rounded-3xl text-white font-semibold ">
                {product?.priceWithoutDiscount && (
                  <span className="text-gray-500 line-through mr-2">
                    ${product?.priceWithoutDiscount}
                  </span>
                )}
                <span className="text-white font-bold">${product?.price}</span>
              </div>
            </div>

            <hr className="my-6 w-80" />
            <div className="w-96 flex flex-col justify-center items-center md:items-start">
              <p className="text-gray-400 md:text-start text-center">{product?.description}</p>
              <div className="mt-6 w-48 py-3 bg-[#029FAE] text-white text-lg font-medium rounded-md hover:bg-teal-600 transition duration-300 flex text-center justify-center items-center">
                <button
                  onClick={() => {
                    if (product) {
                      addToCart({...product, quantity: product.quantity || 1});
                    }
                    setIsPopupVisible(true);
                  }}
                  className="flex items-center gap-4"
                >
                  <TrolleyIcon className="w-8 h-8" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-36">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products
          </h2>
          <Link href="/products/" className="underline underline-offset-4">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featureProduct.slice(0, 5).map((item) => (
            <div key={item._id} className="p-4 rounded-lg transition duration-300">
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex gap-4 items-center">
            <p className="text-xl font-semibold text-green-600">Your Product added to Cart Successfully!</p>
            <button onClick={() => setIsPopupVisible(false)}
            className='px-4 py-2 bg-red-600 text-white'>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
