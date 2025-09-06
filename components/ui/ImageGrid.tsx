

// "use client"

// import { AnimatePresence, motion } from "framer-motion"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { IconEye, IconShoppingCart } from "@tabler/icons-react"
// import React, { useEffect, useState } from "react"
// import { PopoverDemo } from "../popover"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { useCartStore } from "@/app/store/cartStore";

// interface Product {
//   id: number
//   name: string
//   description: string
//   price: number
//   stock_quantity: number
//   sku: string
//   category: string
//   brand: string
//   weight: number
//   dimensions: string
//   image_url: []
//   created_at: string
//   updated_at: string
// }

// export default function EcommerceProductGrid() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [addingToCart, setAddingToCart] = useState<number | null>(null)
//   const [notification, setNotification] = useState({ show: false, message: "" });
//   const [showPopover, setShowPopover] = useState<number | null>(null);
// const { fetchCart } = useCartStore.getState();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('/api/products')
//         if (!response.ok) {
//           throw new Error('Failed to fetch products')
//         }
//         const data = await response.json()
//         setProducts(data)
//       } catch (err) {
//         console.error('Error fetching products:', err)
//         setError('Failed to load products. Please try again later.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   console.log("p:",products)
//   const showNotification = (message: string) => {
//     setNotification({ show: true, message });
//     setTimeout(() => setNotification({ show: false, message: "" }), 3000);
//   };
//   const [popupMessage, setPopupMessage] = useState<string | null>(null);

//   const handleAddToCart = async (productId: number) => {
//     setAddingToCart(productId)


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
//         product_id:productId,
//         quantity:1,
//       }),
//     });

//     console.log(cartItemResponse)

//     if (!cartItemResponse.ok) throw new Error("Failed to add cart item");
//     const cartItemData = await cartItemResponse.json();

//     console.log("Cart:", cartData);
//     console.log("Cart Item:", cartItemData);
// setAddingToCart(null)

//       // ✅ Show success popup
//       setPopupMessage("Item added to cart successfully!");
//       setTimeout(() => setPopupMessage(null), 2000); // Hide after 2s
//     setShowPopover(productId);

//       // ✅ Reload page after a short delay
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 2200);
//     // showNotification(`1 ${product.name} added to cart!`);
// await fetchCart(); // ✅ This will immediately refresh Zustand store

//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     showNotification("Failed to add product to cart");
//   } 
// };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8 py-12">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden animate-pulse">
//                 <div className="w-full h-60 bg-gray-300 dark:bg-black"></div>
//                 <div className="p-5">
//                   <div className="h-6 bg-gray-300 dark:bg-black rounded mb-2"></div>
//                   <div className="h-4 bg-gray-300 dark:bg-black rounded w-2/3 mb-4"></div>
//                   <div className="h-8 bg-gray-300 dark:bg-black rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Products</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (

//  <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8">
//   <div className="max-w-7xl mx-auto">
//     {/* Header Section */}
//     <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black">
//       <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
//         <Image
//           height={160}
//           width={160}
//           unoptimized
//           priority
//           src="/assets/IMG.JPG"
//           alt="Coin"
//           className="w-40 h-40 object-contain animate-coin-roll"
//         />
//         <div className="absolute inset-0 flex items-center justify-center flex-col">
//           <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Products</h2>
//           <p className="mt-4 text-lg text-gray-400">Discover our most popular items</p>
//         </div>
//       </div>
//     </div>

//     {/* Products Grid */}
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//       }}
//       className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//     >
//       {products.map((product) => (
//         <motion.div
//           key={product.id}
//           variants={{
//             hidden: { opacity: 0, y: 30 },
//             visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//           }}
//           whileHover={{ y: -5 }}
//           className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/20"
//         >
//           {/* Product Image - Clickable */}
//           <div
//             className="relative overflow-hidden h-60 cursor-pointer"
//             onClick={() => router.push(`/${product.id}`)}
//           >
//             <Image
//               src={"/assets/IMG.JPG"}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   router.push(`/${product.id}`);
//                 }}
//                 className="bg-white dark:bg-black text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
//                 aria-label="View product details"
//               >
//                 <IconEye size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="p-5">
//             <div className="mb-2">
//               <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-black/30 px-2 py-1 rounded-full">
//                 {product.category}
//               </span>
//             </div>

//             <h3
//               className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-14 cursor-pointer"
//               onClick={() => router.push(`/${product.id}`)}
//             >
//               {product.name}
//             </h3>

//             <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
//               {product.description}
//             </p>

//             <div className="flex items-center justify-between mt-4">
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 {formatPrice(product.price)}
//               </span>
//             </div>

//             {/* Add to Cart + Popover */}
//             <div className="mt-4 flex items-center gap-2">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product.id);
//                 }}
//                 disabled={addingToCart === product.id || product.stock_quantity === 0}
//                 className="flex-1 bg-gray-900 dark:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {addingToCart === product.id ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Adding...
//                   </>
//                 ) : (
//                   <>
//                     <IconShoppingCart size={18} />
//                     Add to Cart
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>

//     {/* Custom Popover Modal */}
//     {/* {showPopover !== null && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//         // onClick={() => setShowPopover(null)}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 25 }}
//           className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="mb-2 flex justify-center">
//             <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
//               <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//           </div>
          
//           <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//             Item added to cart!
//           </h4>
          
//           {products.find(p => p.id === showPopover) && (
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               <span className="font-medium">{products.find(p => p.id === showPopover)?.name}</span> was successfully added to your shopping cart.
//             </p>
//           )}
          
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() =>window.location.reload()}
//               className="flex-1 py-3 px-4 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition font-medium"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => {
//                 setShowPopover(null);
//                 router.push("/cart");
//               }}
//               className="flex-1 py-3 px-4 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition font-medium"
//             >
//               Go to Cart
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )} */}

//     {products.length === 0 && !loading && (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
//         <p className="text-gray-600 dark:text-gray-400">Check back later for new products</p>
//       </div>
//     )}
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
import { useCartStore } from "@/app/store/cartStore";

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
  image_urls: string[]
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
  const [showPopover, setShowPopover] = useState<number | null>(null);
  const { fetchCart } = useCartStore.getState();

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

  const handleAddToCart = async (productId: number) => {
    setAddingToCart(productId)
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      setAddingToCart(null);
      return;
    }

    try {
      // Create a new cart
      const cartResponse = await fetch('/api/carts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!cartResponse.ok) throw new Error("Failed to create cart");
      const cartData = await cartResponse.json();
      const cartId = cartData.id;

      // Add product to the cart
      const cartItemResponse = await fetch('/api/cartItems', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!cartItemResponse.ok) throw new Error("Failed to add cart item");
      
      setAddingToCart(null);
      setShowPopover(productId);
      await fetchCart();
      
      // showNotification(`1 ${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotification("Failed to add product to cart");
      setAddingToCart(null);
    }
  };

  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'EGP',
  //   }).format(price)
  // }
const formatPrice = (price: number): string => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedNumber} EGP`;
};
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
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {/* <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black">
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
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Products</h2>
              <p className="mt-4 text-lg text-gray-400">Discover our most popular items</p>
            </div>
          </div>
        </div> */}
{/* Header Section with 3D Rotating Coin */}
<div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black">
  <div className="relative h-[50vh] overflow-hidden flex flex-col items-center justify-center">
    
    {/* Coin Container with 3D Effect */}
    <div className="relative w-40 h-40 perspective-1000 mb-6">
      <div className="relative w-full h-full animate-coin-roll transform-style-3d">
        
        {/* Front Face */}
        <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden bg-black">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/assets/IMG.JPG"
              alt="Coin Front"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-black" />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden rotate-y-180 bg-black">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/assets/IMG - Copy.JPG"
              alt="Coin Back"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-black" />
        </div>

        {/* Edge */}
        <div
          className="absolute inset-0 rounded-full border-8 border-black"
          style={{
            transform: 'translateZ(-4px)',
            boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6)',
          }}
        />
      </div>
    </div>

    {/* Header Text */}
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Products</h2>
      <p className="mt-4 text-lg text-gray-400">Discover our most popular items</p>
    </div>

    
  </div>
</div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4"
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
              {/* Product Image - Clickable */}
              <div
                className="relative overflow-hidden h-60 cursor-pointer"
                onClick={() => router.push(`/${product.id}`)}
              >
                {product.image_urls && product.image_urls.length > 0 ? (
                  <Image
                    src={product.image_urls[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = "/assets/IMG.JPG";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/${product.id}`);
                    }}
                    className="bg-white dark:bg-black text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    aria-label="View product details"
                  >
                    <IconEye size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* <div className="mb-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-black/30 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div> */}

                <h3
                  className="text-lg font-semibold text-gray-900 dark:text-white  line-clamp-2 h-14 cursor-pointer"
                  onClick={() => router.push(`/${product.id}`)}
                >
                  {product.name}
                </h3>

                {/* <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                  {product.description}
                </p> */}

                <div className="flex items-center justify-between ">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.stock_quantity <= 0 ? (
                       <span className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  ) : (
                 <div></div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    disabled={addingToCart === product.id || product.stock_quantity === 0}
                    className="w-full bg-gray-900 dark:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart === product.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Stealing...
                      </>
                    ) : (
                      <>
                        {/* <IconShoppingCart size={18} /> */}
                        {product.stock_quantity > 0 ? 'Steal' : 'Out of Stock'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Notification */}
        {/* {notification.show && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {notification.message}
          </div>
        )} */}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new products</p>
          </div>
        )}
      </div>

        <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes coin-roll {
          0% {
            transform: rotateY(0deg);
            animation-timing-function: ease-in;
          }
          20% {
            transform: rotateY(360deg);
            animation-timing-function: linear;
          }
          60% {
            transform: rotateY(1440deg);
            animation-timing-function: ease-out;
          }
          100% {
            transform: rotateY(1800deg);
          }
        }
        
        .animate-coin-roll {
          animation: coin-roll 2s forwards;
          transform-style: preserve-3d;
        }
      `}</style>

    </div>
  )
}