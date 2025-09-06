
// "use client";
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
//   const [mounted, setMounted] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Detect theme/dark mode without useTheme()
//   useEffect(() => {
//     setMounted(true);
    
//     // Check if dark mode is enabled
//     const checkDarkMode = () => {
//       // Method 1: Check document class
//       if (document.documentElement.classList.contains('dark')) {
//         setIsDarkMode(true);
//         return;
//       }
      
//       // Method 2: Check system preference
//       if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         setIsDarkMode(true);
//         return;
//       }
      
//       // Method 3: Check localStorage
//       const savedTheme = localStorage.getItem('theme');
//       if (savedTheme === 'dark') {
//         setIsDarkMode(true);
//         return;
//       }
      
//       setIsDarkMode(false);
//     };
    
//     checkDarkMode();
    
//     // Listen for theme changes
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     mediaQuery.addEventListener('change', checkDarkMode);
    
//     // Watch for class changes on html element
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { 
//       attributes: true, 
//       attributeFilter: ['class'] 
//     });
    
//     return () => {
//       mediaQuery.removeEventListener('change', checkDarkMode);
//       observer.disconnect();
//     };
//   }, []);

//   // ✅ Fetch cart items initially
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

//     // ✅ Listen for cart updates
//     const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
//       setCartItems(e.detail);
//     };
//     window.addEventListener("cartUpdated", handleCartUpdate as EventListener);

//     return () => {
//       window.removeEventListener("cartUpdated", handleCartUpdate as EventListener);
//     };
//   }, []);

//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//   const hasItems = cartItemsCount > 0;

//   // ✅ Handle click: go to cart + reset cart
//   const handleCartClick = async () => {
//     router.push("/cart");
//     setCartItems([]); // clears count locally

//     // Optionally, tell backend to clear cart
//      };

//   if (!mounted) return null;
//   console.log(isDarkMode)

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
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
//               className={`relative p-2 rounded-md transition 
//                 ${isDarkMode ? "bg-black" : "bg-transparent"} 
//                 hover:bg-gray-100 dark:hover:bg-gray-800`}
//               onClick={handleCartClick}
//               animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//               {/* ✅ Dynamic Icon - Always use white in dark header */}
//               <Image
// src={isDarkMode ? "/assets/thief_white.png" : "/assets/thief.png"}                alt="Cart"
//                 width={20}
//                 height={20}
//               />

//               {/* ✅ Cart Count */}
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
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

export function SiteHeader() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // ✅ Track admin status

  // ✅ Fetch admin status
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        setIsAdmin(data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);
  const { cartItems, fetchCart } = useCartStore(); // ✅ Zustand store

  // ✅ Fetch cart on mount
  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  // ✅ Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      if (html.classList.contains("dark")) return setIsDarkMode(true);
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return setIsDarkMode(true);
      if (localStorage.getItem("theme") === "dark") return setIsDarkMode(true);
      setIsDarkMode(false);
    };

    checkDarkMode();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", checkDarkMode);
      observer.disconnect();
    };
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const hasItems = cartItemsCount > 0;

  const handleCartClick = () => {
    router.push("/cart");
  };

    const handleAdminClick = () => {
    router.push("/dashboard");
  };

  if (!mounted) return null;
              // <Image

              // width={160}
              //       height={160}
              //   src="/assets/IMG - Copy.JPG"
              //   alt="Coin Back" 
              //   className="w-full h-full object-cover"
              // />
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm h-16 transition-colors duration-300">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-full">
        {/* <div className="flex items-center ml-2 lg:ml-0">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 text-center">
            Thefty Cent
          </h1>
        </div> */}
<div className="flex items-center ml-2 lg:ml-0">
  <Link href="/" className="absolute left-1/2 -translate-x-1/2">
    <Image
      width={100}
      height={100}
      src="/assets/IMG.JPG"
      alt="Logo"
      className="w-10 h-10 object-cover rounded-full"
    />
  </Link>
</div>
        <div className="ml-auto flex items-center gap-4">

           {/* ✅ Admin Button */}
          {isAdmin && (
            <button
              onClick={handleAdminClick}
              className="p-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Admin
            </button>
          )}
          {hasItems && (
            <motion.button
              className={`relative p-2 rounded-md transition 
                ${isDarkMode ? "bg-black" : "bg-transparent"} 
                hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={handleCartClick}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Image
                src={isDarkMode ? "/assets/thief_white.png" : "/assets/thief.png"}
                alt="Cart"
                width={20}
                height={20}
              />
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
