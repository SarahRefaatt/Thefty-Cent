

"use client"

import { motion } from "framer-motion"

import { useRouter } from "next/navigation"
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";
import React, { useEffect } from "react";
  // const products = [
  //   { 
  //     id: 1, 
  //     name: "Premium Wireless Headphones", 
  //     price: "$199.99", 
  //     originalPrice: "$249.99",
  //     rating: 4.8, 
  //     reviews: 142,
  //     image: "/assets/IMG.JPG",
  //     category: "Electronics",
  //     isNew: true,
  //     discount: 20
  //   },
  //   { 
  //     id: 2, 
  //     name: "Minimalist Watch", 
  //     price: "$129.99", 
  //     originalPrice: "$159.99",
  //     rating: 4.5, 
  //     reviews: 87,
  //     image: "/assets/IMG.JPG",
  //     category: "Accessories",
  //     isNew: false,
  //     discount: 15
  //   },
  //   { 
  //     id: 3, 
  //     name: "Running Shoes", 
  //     price: "$89.99", 
  //     originalPrice: "$119.99",
  //     rating: 4.7, 
  //     reviews: 215,
  //     image: "/assets/IMG.JPG",
  //     category: "Footwear",
  //     isNew: true,
  //     discount: 25
  //   },
  //   { 
  //     id: 4, 
  //     name: "Designer Backpack", 
  //     price: "$79.99", 
  //     originalPrice: "$99.99",
  //     rating: 4.6, 
  //     reviews: 103,
  //     image: "/assets/IMG.JPG",
  //     category: "Accessories",
  //     isNew: false,
  //     discount: 20
  //   },
  //   { 
  //     id: 5, 
  //     name: "Smart Home Speaker", 
  //     price: "$149.99", 
  //     originalPrice: "$179.99",
  //     rating: 4.9, 
  //     reviews: 198,
  //     image: "/assets/IMG.JPG",
  //     category: "Electronics",
  //     isNew: true,
  //     discount: 17
  //   },
  //   { 
  //     id: 6, 
  //     name: "Sunglasses", 
  //     price: "$59.99", 
  //     originalPrice: "$79.99",
  //     rating: 4.4, 
  //     reviews: 76,
  //     image: "/assets/IMG.JPG",
  //     category: "Accessories",
  //     isNew: false,
  //     discount: 25
  //   },
  //   { 
  //     id: 7, 
  //     name: "Fitness Tracker", 
  //     price: "$69.99", 
  //     originalPrice: "$89.99",
  //     rating: 4.3, 
  //     reviews: 132,
  //     image: "/assets/IMG.JPG",
  //     category: "Electronics",
  //     isNew: true,
  //     discount: 22
  //   },
  //   { 
  //     id: 8, 
  //     name: "Casual T-Shirt", 
  //     price: "$29.99", 
  //     originalPrice: "$39.99",
  //     rating: 4.2, 
  //     reviews: 64,
  //     image: "/assets/IMG.JPG",
  //     category: "Clothing",
  //     isNew: false,
  //     discount: 25
  //   },
  //   { 
  //     id: 9, 
  //     name: "Coffee Maker", 
  //     price: "$89.99", 
  //     originalPrice: "$119.99",
  //     rating: 4.6, 
  //     reviews: 178,
  //     image: "/assets/IMG.JPG",
  //     category: "Home",
  //     isNew: true,
  //     discount: 25
  //   },
  //   { 
  //     id: 10, 
  //     name: "Desk Lamp", 
  //     price: "$49.99", 
  //     originalPrice: "$69.99",
  //     rating: 4.7, 
  //     reviews: 92,
  //     image: "/assets/IMG.JPG",
  //     category: "Home",
  //     isNew: false,
  //     discount: 29
  //   },
  //   { 
  //     id: 11, 
  //     name: "Wireless Earbuds", 
  //     price: "$129.99", 
  //     originalPrice: "$159.99",
  //     rating: 4.8, 
  //     reviews: 241,
  //     image: "/assets/IMG.JPG",
  //     category: "Electronics",
  //     isNew: true,
  //     discount: 19
  //   },
  //   { 
  //     id: 12, 
  //     name: "Leather Wallet", 
  //     price: "$45.99", 
  //     originalPrice: "$59.99",
  //     rating: 4.5, 
  //     reviews: 87,
  //     image: "/assets/IMG.JPG",
  //     category: "Accessories",
  //     isNew: false,
  //     discount: 23
  //   }
  // ]

  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    sku: string;
    category: string;
    brand: string;
    weight: number;
    dimensions: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}
export default function EcommerceProductGrid() {
    const router = useRouter();
    const [products,setProducts] = React.useState<Product[]>([]);
    
    useEffect(() => {
      fetch('api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);
    
    console.log(products);


  return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
   <div className="">
  {/* Full-width minimalist header */}
 <div className="">
  {/* Full-width minimalist header */}
  <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black">
    <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
      <Image 
          height={160}
                width={160}
                unoptimized
                priority
        src="/assets/IMG.JPG" 
        alt="Coin" 
       
        
        className="w-40 h-40 object-contain animate-coin-roll"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Overlay text */}
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Featured Products
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Discover our most popular items
        </p>
      </div>
    </div>



    
  </div>
</div>

</div>


        <motion.div
          // ref={ref}
            initial="hidden"
  animate="visible"
          // animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group relative"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                height={160}
                width={160}
                  src="/assets/IMG.JPG" 
                  alt={product.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Action buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
        onClick={() => router.push(`/${product.id}`)}
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <IconEye size={20} />
      </button>
                
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center mt-3">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  {product.price && (
                    <span className="text-sm text-gray-600 dark:text-gray-400 line-through ml-2">
                      {product.price + 20}
                    </span>
                  )}
                </div>
<div className="mt-4 flex items-center gap-2">
  <button className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
    Add to Cart
  </button>

  <button
    onClick={() => router.push(`/${product.id}`)}
    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
  >
    <IconEye size={20} />
  </button>
</div>

              </div>
            </motion.div>
          ))}
        </motion.div>

  </div>
</div>

  )
}