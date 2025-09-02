
// "use client"
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// interface CartItem {
//   id: number;
//   cart_id?: number;
//   quantity: number;
// }

// export function SiteHeader() {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await fetch("/api/carts");
//         if (!res.ok) return;
//         const { cartItems } = await res.json();
//         setCartItems(cartItems || []);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         setCartItems([]);
//       }
//     };
//     fetchCart();
//   }, []);

//   const cartItemsCount = cartItems.length;
//   const hasItems = cartItemsCount > 0;

//   return (
//  <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
//       <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-full">
//         {/* Logo */}
//         <div className="flex items-center ml-2 lg:ml-0">
//           <h1 className="text-xl font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 text-center">
//             Thefty Cent
//           </h1>
//         </div>

//         {/* Right side icons */}
//         <div className="ml-auto flex items-center gap-4">
//           {/* Cart Button (only show if items exist) */}
//           {hasItems && (
//             <motion.button
//               className="relative p-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800"
//               onClick={() => router.push('/cart')}
//               animate={{
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//               <div className="relative">
//                 {/* If you have a white version of the logo, swap based on dark mode */}
//                 <Image
//                   src="/assets/thief.png"
//                   alt="Cart"
//                   width={28}
//                   height={28}
//                   className="dark:invert" // This will invert black → white in dark mode
//                 />
//                 {/* Optional white outline if needed */}
//                 <div className="absolute inset-0 rounded-full border border-white dark:border-white pointer-events-none" />
//               </div>

//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartItemsCount}
//               </span>
//             </motion.button>
//           )}
//         </div>
//       </div>

//     </header>
//   );
// }

//       {/* Sidebar for Cart */}
//       {/* {isSidebarOpen && hasItems && (
//         <div
//           className="fixed inset-0 z-50 bg-black/50"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="absolute right-0 top-0 w-80 bg-white dark:bg-gray-900 text-black dark:text-white h-full shadow-lg p-4 overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
//             <ul className="space-y-3">
//               {cartItems.map((item) => (
//                 <li
//                   key={item.id}
//                   className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md flex justify-between items-center"
//                 >
//                   <span>Item #{item.id}</span>
//                   <span className="font-semibold">x{item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
//               onClick={() => router.push("/cart")}
//             >
//               Go to Checkout
//             </button>
//           </motion.div>
//         </div>
//       )} */}

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CartItem {
  id: number;
  cart_id?: number;
  quantity: number;
}

export function SiteHeader() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme/dark mode without useTheme()
  useEffect(() => {
    setMounted(true);
    
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      // Method 1: Check document class
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
        return;
      }
      
      // Method 2: Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
        return;
      }
      
      // Method 3: Check localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        return;
      }
      
      setIsDarkMode(false);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  // ✅ Fetch cart items initially
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/carts");
        if (!res.ok) return;
        const { cartItems } = await res.json();
        setCartItems(cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    };
    fetchCart();

    // ✅ Listen for cart updates
    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setCartItems(e.detail);
    };
    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
    };
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const hasItems = cartItemsCount > 0;

  // ✅ Handle click: go to cart + reset cart
  const handleCartClick = async () => {
    router.push("/cart");
    setCartItems([]); // clears count locally

    // Optionally, tell backend to clear cart
    try {
      await fetch("/api/carts/clear", { method: "POST" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (!mounted) return null;
  console.log(isDarkMode)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-full">
        {/* Logo */}
        <div className="flex items-center ml-2 lg:ml-0">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 text-center">
            Thefty Cent
          </h1>
        </div>

        {/* Right side icons */}
        <div className="ml-auto flex items-center gap-4">
          {/* Cart Button (only show if items exist) */}
          {hasItems && (
            <motion.button
              className={`relative p-2 rounded-md transition 
                ${isDarkMode ? "bg-black" : "bg-transparent"} 
                hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={handleCartClick}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {/* ✅ Dynamic Icon - Always use white in dark header */}
              <Image
src={isDarkMode ? "/assets/thief_white.png" : "/assets/thief.png"}                alt="Cart"
                width={20}
                height={20}
              />

              {/* ✅ Cart Count */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
