

// "use client"

// import { motion } from "framer-motion"

// import { useRouter } from "next/navigation"
// import Image from "next/image";
// import { IconEye } from "@tabler/icons-react";
// import React, { useEffect, useState } from "react";
//   // const products = [
//   //   { 
//   //     id: 1, 
//   //     name: "Premium Wireless Headphones", 
//   //     price: "$199.99", 
//   //     originalPrice: "$249.99",
//   //     rating: 4.8, 
//   //     reviews: 142,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Electronics",
//   //     isNew: true,
//   //     discount: 20
//   //   },
//   //   { 
//   //     id: 2, 
//   //     name: "Minimalist Watch", 
//   //     price: "$129.99", 
//   //     originalPrice: "$159.99",
//   //     rating: 4.5, 
//   //     reviews: 87,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Accessories",
//   //     isNew: false,
//   //     discount: 15
//   //   },
//   //   { 
//   //     id: 3, 
//   //     name: "Running Shoes", 
//   //     price: "$89.99", 
//   //     originalPrice: "$119.99",
//   //     rating: 4.7, 
//   //     reviews: 215,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Footwear",
//   //     isNew: true,
//   //     discount: 25
//   //   },
//   //   { 
//   //     id: 4, 
//   //     name: "Designer Backpack", 
//   //     price: "$79.99", 
//   //     originalPrice: "$99.99",
//   //     rating: 4.6, 
//   //     reviews: 103,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Accessories",
//   //     isNew: false,
//   //     discount: 20
//   //   },
//   //   { 
//   //     id: 5, 
//   //     name: "Smart Home Speaker", 
//   //     price: "$149.99", 
//   //     originalPrice: "$179.99",
//   //     rating: 4.9, 
//   //     reviews: 198,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Electronics",
//   //     isNew: true,
//   //     discount: 17
//   //   },
//   //   { 
//   //     id: 6, 
//   //     name: "Sunglasses", 
//   //     price: "$59.99", 
//   //     originalPrice: "$79.99",
//   //     rating: 4.4, 
//   //     reviews: 76,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Accessories",
//   //     isNew: false,
//   //     discount: 25
//   //   },
//   //   { 
//   //     id: 7, 
//   //     name: "Fitness Tracker", 
//   //     price: "$69.99", 
//   //     originalPrice: "$89.99",
//   //     rating: 4.3, 
//   //     reviews: 132,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Electronics",
//   //     isNew: true,
//   //     discount: 22
//   //   },
//   //   { 
//   //     id: 8, 
//   //     name: "Casual T-Shirt", 
//   //     price: "$29.99", 
//   //     originalPrice: "$39.99",
//   //     rating: 4.2, 
//   //     reviews: 64,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Clothing",
//   //     isNew: false,
//   //     discount: 25
//   //   },
//   //   { 
//   //     id: 9, 
//   //     name: "Coffee Maker", 
//   //     price: "$89.99", 
//   //     originalPrice: "$119.99",
//   //     rating: 4.6, 
//   //     reviews: 178,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Home",
//   //     isNew: true,
//   //     discount: 25
//   //   },
//   //   { 
//   //     id: 10, 
//   //     name: "Desk Lamp", 
//   //     price: "$49.99", 
//   //     originalPrice: "$69.99",
//   //     rating: 4.7, 
//   //     reviews: 92,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Home",
//   //     isNew: false,
//   //     discount: 29
//   //   },
//   //   { 
//   //     id: 11, 
//   //     name: "Wireless Earbuds", 
//   //     price: "$129.99", 
//   //     originalPrice: "$159.99",
//   //     rating: 4.8, 
//   //     reviews: 241,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Electronics",
//   //     isNew: true,
//   //     discount: 19
//   //   },
//   //   { 
//   //     id: 12, 
//   //     name: "Leather Wallet", 
//   //     price: "$45.99", 
//   //     originalPrice: "$59.99",
//   //     rating: 4.5, 
//   //     reviews: 87,
//   //     image: "/assets/IMG.JPG",
//   //     category: "Accessories",
//   //     isNew: false,
//   //     discount: 23
//   //   }
//   // ]

//   interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock_quantity: number;
//     sku: string;
//     category: string;
//     brand: string;
//     weight: number;
//     dimensions: string;
//     image_url: string;
//     created_at: string;
//     updated_at: string;
// }
// export default function EcommerceProductGrid() {
//     const router = useRouter();
//     const [products,setProducts] = React.useState<Product[]>([]);
//       const [isAddingToCart, setIsAddingToCart] = useState(false);
    
//     useEffect(() => {
//       fetch('api/products')
//         .then(response => response.json())
//         .then(data => setProducts(data))
//         .catch(error => console.error('Error fetching products:', error));
//     }, []);
    
//     console.log(products);

// const handleAddToCart = async () => {

//   setIsAddingToCart(true);

//   try {
//     // 🔹 Step 1: Create a new cart
//     const cartResponse = await fetch('/api/carts', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ /* Pass userId or session if needed */ }),
//     });

//     if (!cartResponse.ok) throw new Error("Failed to create cart");
//     const cartData = await cartResponse.json();
//     const cartId = cartData.id; // <-- Grab cart ID

//     console.log(cartData)
//     // 🔹 Step 2: Add product to the cart
//     const cartItemResponse = await fetch('/api/cartItems', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         cart_id:cartId,
//         product_id: product[i].id,
//         quantity:1,
//       }),
//     });

//     console.log(cartItemResponse)

//     if (!cartItemResponse.ok) throw new Error("Failed to add cart item");
//     const cartItemData = await cartItemResponse.json();

//     console.log("Cart:", cartData);
//     console.log("Cart Item:", cartItemData);

//     showNotification(`${quantity} ${product.name} added to cart!`);
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     showNotification("Failed to add product to cart");
//   } finally {
//     setIsAddingToCart(false);
//   }
// };

//   return (
// <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8">
//   <div className="max-w-7xl mx-auto">
//    <div className="">
//   {/* Full-width minimalist header */}
//  <div className="">
//   {/* Full-width minimalist header */}
//   <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black">
//     <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
//       <Image 
//           height={160}
//                 width={160}
//                 unoptimized
//                 priority
//         src="/assets/IMG.JPG" 
//         alt="Coin" 
       
        
//         className="w-40 h-40 object-contain animate-coin-roll"
//       />
//       <div className="absolute inset-0 flex items-center justify-center">
//         {/* Overlay text */}
//         <h2 className="text-3xl font-bold text-white sm:text-4xl">
//           Featured Products
//         </h2>
//         <p className="mt-4 text-lg text-gray-400">
//           Discover our most popular items
//         </p>
//       </div>
//     </div>



    
//   </div>
// </div>

// </div>


//         <motion.div
//           // ref={ref}
//             initial="hidden"
//   animate="visible"
//           // animate={inView ? "visible" : "hidden"}
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.1 },
//             },
//           }}
//           className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//         >
//           {products.map((product) => (
//             <motion.div
//               key={product.id}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//               }}
//               whileHover={{ y: -5 }}
//               className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden group relative"
//             >
//               {/* Product Image */}
//               <div className="relative overflow-hidden">
//                 <Image
//                 height={160}
//                 width={160}
//                   src="/assets/IMG.JPG" 
//                   alt={product.name}
//                   className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 {/* Action buttons */}
//                 <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
//                   <button
//         onClick={() => router.push(`/${product.id}`)}
//         className="bg-white dark:bg-black text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//       >
//         <IconEye size={20} />
//       </button>
                
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center mt-3">
//                   <span className="text-xl font-bold text-gray-900 dark:text-white">
//                     {product.price}
//                   </span>
//                   {product.price && (
//                     <span className="text-sm text-gray-600 dark:text-gray-400 line-through ml-2">
//                       {product.price + 20}
//                     </span>
//                   )}
//                 </div>
// <div className="mt-4 flex items-center gap-2">
//   <button className="flex-1 bg-gray-900 dark:bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
//     Add to Cart
//   </button>

//   <button
//     onClick={() => router.push(`/${product.id}`)}
//     className="bg-white dark:bg-black text-gray-900 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//   >
//     <IconEye size={20} />
//   </button>
// </div>

//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//   </div>
// </div>

//   )
// }


"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { IconEye, IconShoppingCart } from "@tabler/icons-react"
import React, { useEffect, useState } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock_quantity: number
  sku: string
  category: string
  brand: string
  weight: number
  dimensions: string
  image_url: string
  created_at: string
  updated_at: string
}

export default function EcommerceProductGrid() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])
  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleAddToCart = async (productId: number) => {
    setAddingToCart(productId)


  try {
    // 🔹 Step 1: Create a new cart
    const cartResponse = await fetch('/api/carts', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ /* Pass userId or session if needed */ }),
    });

    if (!cartResponse.ok) throw new Error("Failed to create cart");
    const cartData = await cartResponse.json();
    const cartId = cartData.id; // <-- Grab cart ID

    console.log(cartData)
    // 🔹 Step 2: Add product to the cart
    const cartItemResponse = await fetch('/api/cartItems', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart_id:cartId,
        product_id:productId,
        quantity:1,
      }),
    });

    console.log(cartItemResponse)

    if (!cartItemResponse.ok) throw new Error("Failed to add cart item");
    const cartItemData = await cartItemResponse.json();

    console.log("Cart:", cartData);
    console.log("Cart Item:", cartItemData);
setAddingToCart(null)

      // ✅ Show success popup
      setPopupMessage("Item added to cart successfully!");
      setTimeout(() => setPopupMessage(null), 2000); // Hide after 2s

      // ✅ Reload page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    // showNotification(`1 ${product.name} added to cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    showNotification("Failed to add product to cart");
  } 
};

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-60 bg-gray-300 dark:bg-black"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 dark:bg-black rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-black rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-300 dark:bg-black rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Products</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
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
              className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/20"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-60">
                <Image
                  src={"/assets/IMG.JPG"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => router.push(`/${product.id}`)}
                    className="bg-white dark:bg-black text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    aria-label="View product details"
                  >
                    <IconEye size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-black/30 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-14">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {/* <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    In Stock: {product.stock_quantity}
                  </span> */}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addingToCart === product.id || product.stock_quantity === 0}
                    className="flex-1 bg-gray-900 dark:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart === product.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <IconShoppingCart size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => router.push(`/${product.id}`)}
                    className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    aria-label="View product details"
                  >
                    <IconEye size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new products</p>
          </div>
        )}
      </div>
    </div>
  )
}



