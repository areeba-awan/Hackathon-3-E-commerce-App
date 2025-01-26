import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function AboutPage() {
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-7 items-center justify-center my-16">
        <div className="md:p-16 p-8 bg-teal-800 text-slate-100 ">
          <h2 className="text-2xl font-bold pb-6 ">About Us - Comforty</h2>
          <p className="text-sm w-64 sm:w-96">
            At Comforty, we believe that right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft charis that seamlessly blend style with functionality.
          </p>
          
          <Link href={'/AllProducts/'}>
          <button className="p-3 sm:mt-36 mt-24 text-white text-sm bg-teal-600" >
            View Collections
          </button>
          </Link>
        </div>
        <div className="flex relative rounded-none md:w-[450px] w-80">
          <Image
            src={"/Sofa1.png"}  //our-product-1.png
            height={400}
            width={400}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
{/* Brand Difference Section */}
<h1 className="text-center text-2xl md:text-3xl font-bold mb-6 mt-20">What Makes Our Brand Different</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-30 py-10">
      
        {[
          { emoji: '🚍', title: 'Next Day as Standard', text: 'Order before 3 pm to get standard delivery the next day.' },
          { emoji: '💹', title: 'Fast Shipping', text: 'Enjoy fast and reliable shipping for all your orders.' },
          { emoji: '💯', title: 'Quality Assurance', text: 'We ensure the highest quality for all our products.' },
         
          { emoji: '👍', title: 'Customer Support', text: 'We provide excellent customer support 24/7.' },
        ].map((item, index) => (
          <div key={index} className="bg-slate-200 p-6 md:p-8 rounded-lg shadow-md text-teal-600 flex flex-col justify-between">
            <span className="block mb-4 text-lg font-semibold">{item.emoji}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-teal-600 text-base md:text-lg">{item.text}</p>
          </div>
        ))}
      </div>
      {/* <div className="my-16">
        <h2 className="text-2xl font-bold text-center py-10">
          What Makes our Brand Different
        </h2>
        <div className="flex gap-5 items-center justify-center md:flex-row flex-col">
          <div className="p-4 bg-gray-200 ">
          <FaShippingFast className="text-teal-500 text-xl mt-1" />
            <h3 className="text-lg text-teal-500 py-3">Next Day as Standard</h3>
            <p className="text-teal-500 w-52 ">
              Oreder Before 3pm and get your order the next day as Standerd
            </p>
          </div>
          <div className="p-4 bg-gray-200 ">
            <FaCheckCircle className="text-teal-500 text-xl mt-1" />
            <h3 className="text-lg text-teal-500 py-3">Next Day as Standard</h3>
            <p className="text-teal-500 w-52 ">
              Oreder Before 3pm and get your order the next day as Standerd
            </p>
          </div>
          <div className="p-4 bg-gray-200 ">
          <FaWallet className="text-teal-500 text-xl mt-1" />
            <h3 className="text-lg text-teal-500 py-3">Next Day as Standard</h3>
            <p className="text-teal-500 w-52 ">
              Oreder Before 3pm and get your order the next day as Standerd
            </p>
          </div>
          <div className="p-3.5 bg-gray-200 ">
          <LuSprout className="text-teal-500 text-3xl" />
            <h3 className="text-lg text-teal-500 py-3">Next Day as Standard</h3>
            <p className="text-teal-500 w-52 ">
              Oreder Before 3pm and get your order the next day as Standerd
            </p>
          </div>
        </div>
      </div> */}

      

     <h1 className="text-2xl sm:text-3xl font-bold text-center mb-24 text-gray-800">
        Our Popular Products
      </h1> 

      <div className="flex md:flex-row flex-col items-center justify-center gap-4 my-20">
        <div className="relative flex flex-col items-start overflow-hidden ">
          <div className="relative w-full">
            <Image
              src={"/The Dandy.png"}
              alt={""}
              width={500}
              height={500}
              className="md:w-[565px] w-80 h-64"
            />
          </div>
          <div className="mt-4 w-full flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-800 text-start"></h3>
            <div className="flex flex-col items-start mt-2">
              <span className="text-gray-800 ">The Popular Seude Sofa</span>

              <span className="text-gray-800 ">$90.00</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-start overflow-hidden">
          <div className="relative w-full">
            <Image
              src={"/Dandy chair 1.png"}
              alt={""}
              width={700}
              height={700}
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="mt-4 w-full flex flex-col items-start">
            <div className="flex flex-col items-start mt-2">
              <span className="text-gray-800 ">The Dandy Chair</span>
              <span className="text-gray-800 ">$90.00</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-start overflow-hidden ">
          <div className="relative w-full">
            <Image
              src={"/dandy chair 2.png"}
              alt={""}
              width={500}
              height={500}
              className="w-full h-64"
            />
          </div>
          <div className="mt-4 w-full flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-800 text-start"></h3>
            <div className="flex flex-col items-start mt-2">
              <span className="text-gray-800 ">The Dandy Chair</span>

              <span className="text-gray-800 ">$90.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
