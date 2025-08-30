// "use client";
// import { useState, useEffect } from "react";
// import { useParams,  } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";


//   interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: string;
//     stock_quantity: number;
//     sku: string;
//     category: string;
//     brand: string;
//     weight: number;
//     dimensions: string;
//     image_url: string[];
//     created_at: string;
//     updated_at: string;
// }

// export default function ProductDetailPage() {

//   const { id } = useParams<{ id: string }>(); // ✅ strongly typed
//   const productId = parseInt(id, 10);
//   console.log("Product ID from URL:", productId);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [selectedImage, setSelectedImage] = useState(0);

//   const [quantity, setQuantity] = useState(1);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/products?id=${productId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product");
//         }
//         const data: Product = await response.json();
//         setProduct(data);
       
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }
//     if (!isNaN(productId)) {
//       fetchProduct();
//     }

//   }, [productId]);

//   console.log(product)

//   const handleAddToCart = () => {
//     if (!product) return;
    
//     setIsAddingToCart(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       // Add to cart logic here
//       console.log("Added to cart:", {
//         product: product.name,
    
//         quantity
//       });
      
//       setIsAddingToCart(false);
      
//       // Show success message
//       alert("Product added to cart successfully!");
//     }, 1000);
//   };

//   const incrementQuantity = () => {
//     if (quantity < (product?.stock_quantity || 1)) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
//             {/* Product Images */}
//             <div>
//               <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
//                 <motion.img 
//                   key={selectedImage}
//                   src="/assets/IMG.JPG" 
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 />
                
//                 {product.isNew && (
//                   <span className="absolute top-4 left-4 bg-gray-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
//                     NEW
//                   </span>
//                 )}
                
//                 {product.discount && product.discount > 0 && (
//                   <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
//                     -{product.discount}%
//                   </span>
//                 )}
//               </div>
              
//               {/* <div className="grid grid-cols-4 gap-2">
//                 {product.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-square overflow-hidden rounded-md border-2 ${
//                       selectedImage === index ? 'border-gray-500' : 'border-gray-200'
//                     }`}
//                   >
//                     <Image
//                     width={160}
//                     height={160}
//                       // src={image} 
//                                         src="/assets/IMG.JPG" 

//                       alt={`${product.name} view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div> */}
//             </div>
            
//             {/* Product Info */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
//               {/* <div className="flex items-center mb-4">
//                 <div className="flex items-center">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <svg
//                       key={star}
//                       className={`w-5 h-5 ${
//                         star <= Math.floor(product.rating)
//                           ? 'text-yellow-400'
//                           : 'text-gray-300'
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
                
//                 </div>
//               </div> */}
              
//               <div className="mb-6">
//                 <p className="text-gray-700">{product.description}</p>
//               </div>
              
//               {/* Pricing */}
//               <div className="flex items-center mb-6">
//                 <span className="text-3xl font-bold text-gray-900">{product.price}</span>
//                 {product.price && (
//                   <span className="ml-3 text-lg text-gray-500 line-through">
//                     {product.price}
//                   </span>
//                 )}
//               </div>
              

//               {/* Quantity Selector */}
//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
//                 <div className="flex items-center">
//                   <button
//                     onClick={decrementQuantity}
//                     className="p-2 rounded-l-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
//                     disabled={quantity <= 1}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                     </svg>
//                   </button>
//                   <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
//                   <button
//                     onClick={incrementQuantity}
//                     className="p-2 rounded-r-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
//                     disabled={quantity >= product.stock_quantity}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </button>
//                   {/* <span className="ml-4 text-sm text-gray-500">{product.stock} available</span> */}
//                 </div>
//               </div>

              
              
//               {/* Add to Cart Button */}
//               <div className="flex space-x-4">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isAddingToCart}
//                   className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center disabled:opacity-75"
//                 >
//                   {isAddingToCart ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Adding to Cart...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       Add to Cart
//                     </>
//                   )}
//                 </button>
                
//                 {/* <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
//                   <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                 </button> */}
//               </div>
//             </div>
//           </div>
          
//           {/* Product Details Tabs */}
//           <div className="border-t border-gray-200">
//             <div className="px-8 py-6">
//               <div className="border-b border-gray-200">
//                 <nav className="flex -mb-px">
//                   <button className="ml-8 first:ml-0 py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
//                     Details
//                   </button>
//                   {/* <button className="ml-8 py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
//                     Specifications
//                   </button> */}
//                   {/* <button className="ml-8 py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
//                     Reviews ({product.reviews})
//                   </button> */}
//                 </nav>
//               </div>
              
//               {/* <div className="py-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Product Features</h3>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="text-gray-600">{feature}</li>
//                   ))}
//                 </ul>
                
//                 <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Specifications</h3>
//                 <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
//                   {Object.entries(product.specifications).map(([key, value]) => (
//                     <div key={key} className="sm:col-span-1">
//                       <dt className="text-sm font-medium text-gray-500">{key}</dt>
//                       <dd className="mt-1 text-sm text-gray-900">{value}</dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div> */}
//             </div>
//           </div>
//         </div>
        
   
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { json } from "zod";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  sku: string;
  category: string;
  brand: string;
  weight: number;
  dimensions: string;
  image_url: string[];
  created_at: string;
  updated_at: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const productId = parseInt(id, 10);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        showNotification("Failed to load product details");
      }
    };
    
    if (!isNaN(productId)) {
      fetchProduct();
    }
  }, [productId]);

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

const handleAddToCart = async () => {
  if (!product) return;

  setIsAddingToCart(true);

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
    console.log(quantity)
    // 🔹 Step 2: Add product to the cart
    const cartItemResponse = await fetch('/api/cartItems', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart_id:cartId,
        product_id: product.id,
        quantity:quantity,
      }),
    });

    console.log(cartItemResponse)

    if (!cartItemResponse.ok) throw new Error("Failed to add cart item");
    const cartItemData = await cartItemResponse.json();

    console.log("Cart:", cartData);
    console.log("Cart Item:", cartItemData);

    showNotification(`${quantity} ${product.name} added to cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    showNotification("Failed to add product to cart");
  } finally {
    setIsAddingToCart(false);
  }
};


  const incrementQuantity = () => {
    if (quantity < (product?.stock_quantity || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50"
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <motion.div 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                  src={"/assets/IMG.JPG"}
                    // src={product.image_url?.[selectedImage] || "/assets/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                
                {product.stock_quantity === 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    OUT OF STOCK
                  </span>
                )}
                
                {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    LOW STOCK
                  </span>
                )}
              </div>
              
              {product.image_url && product.image_url.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.image_url.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                        selectedImage === index ? 'border-gray-500 scale-105' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={"/assets/IMG.JPG"}
                        // src={image || "/assets/placeholder.jpg"}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <button 
                    onClick={() => router.back()}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    aria-label="Go back"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <span className="mx-3 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">SKU: {product.sku}</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                {/* Pricing */}
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                </div>
                
                {/* Stock Information */}
                {/* <div className="mb-6">
                  <div className="flex items-center">
                    {product.stock_quantity > 0 ? (
                      <>
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-green-700">
                          In stock ({product.stock_quantity} available)
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm text-red-700">Out of stock</span>
                      </>
                    )}
                  </div>
                </div> */}
              </div>
              
              <div>
                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-2 rounded-l-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-300 bg-white min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock_quantity}
                      className="p-2 rounded-r-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || product.stock_quantity === 0}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isAddingToCart ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding to Cart...
                      </>
                    ) : product.stock_quantity === 0 ? (
                      "Out of Stock"
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  {/* <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="px-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button 
                    onClick={() => setActiveTab("details")}
                    className={`ml-8 first:ml-0 py-4 px-1 border-b-2 text-sm font-medium ${
                      activeTab === "details" 
                        ? "border-gray-500 text-gray-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => setActiveTab("specs")}
                    className={`ml-8 py-4 px-1 border-b-2 text-sm font-medium ${
                      activeTab === "specs" 
                        ? "border-gray-500 text-gray-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Specifications
                  </button>
                </nav>
              </div>
              
              <div className="py-6">
                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    
                    <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="text-gray-900">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Brand</p>
                        <p className="text-gray-900">{product.brand}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === "specs" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">SKU</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.sku}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Weight</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.weight} kg</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.dimensions}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Stock Quantity</dt>
                        <dd className="mt-1 text-sm text-gray-900">{product.stock_quantity}</dd>
                      </div>
                    </dl>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}