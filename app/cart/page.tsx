




"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  sku: string;
  category: string;
  image_urls: string[];
}

interface CartItem {
  id: number;
  cart_id?: number;
  quantity: number;
  product: Product;
}
// Helper to manage expiry
// const saveQuantitiesWithExpiry = (quantities: {[key: number]: number}) => {
//   const oneMonthLater = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
//   const data = {
//     quantities,
//     expiry: oneMonthLater,
//   };
//   localStorage.setItem("cartQuantities", JSON.stringify(data));
// };

const loadQuantitiesWithExpiry = (): {[key: number]: number} => {
  const stored = localStorage.getItem("cartQuantities");
  if (!stored) return {};
  
  try {
    const parsed = JSON.parse(stored);
    if (parsed.expiry && parsed.expiry > Date.now()) {
      return parsed.quantities || {};
    } else {
      localStorage.removeItem("cartQuantities"); // expired
    }
  } catch (e) {
    console.error("Failed to parse saved quantities:", e);
  }
  return {};
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [localQuantities, setLocalQuantities] = useState<{[key: number]: number}>({});
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  const [shippingCost] = useState(9.99);
  // const [taxRate] = useState(0.08);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();
// const { fetchCart } = useCartStore.getState();
  const { fetchCart, setCartItems: setCartStoreItems } = useCartStore.getState();


useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);

      const savedQuantities = loadQuantitiesWithExpiry(); // 🔥 Load cached quantities

      const res = await fetch("/api/carts");
      if (!res.ok) return;
      const { cartItems } = await res.json();
      setCartItems(cartItems || []);

      // 🔥 Merge saved local quantities
      const initialQuantities: { [key: number]: number } = {};
      cartItems.forEach((item: CartItem) => {
        initialQuantities[item.id] = savedQuantities[item.id] ?? item.quantity;
      });

      setLocalQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);
console.log("opop: ",cartItems)
useEffect(() => {
  setCartStoreItems(cartItems); // Sync Zustand after local updates
}, [cartItems, setCartStoreItems]);

const updateLocalQuantity = async (id: number, newQuantity: number) => {
  // Prevent invalid quantities
  if (newQuantity < 1) return;

  // Update UI immediately
  setLocalQuantities(prev => ({
    ...prev,
    [id]: newQuantity,
  }));

  // Find the item being updated
  const itemToUpdate = cartItems.find(item => item.id === id);
  if (!itemToUpdate) return;

  try {
    // Update in the database
    const res = await fetch(`/api/cartItems?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart_id: itemToUpdate.cart_id,
        product_id: itemToUpdate.product.id,
        quantity: newQuantity,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update item ${id}`);
    }

    // Refresh Zustand store after updating DB
    await fetchCart();
  } catch (error) {
    console.error("Error updating quantity:", error);
    alert("Could not update quantity. Please try again.");
  }
};


// const updateLocalQuantity = (id: number, newQuantity: number) => {
//   if (newQuantity < 1) return;

//   // Update local states first
//   setLocalQuantities((prev) => {
//     const updated = { ...prev, [id]: newQuantity };
//     saveQuantitiesWithExpiry(updated);
//     return updated;
//   });

//   setCartItems((prev) => {
//     const updatedCart = prev.map((item) =>
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     return updatedCart;
//   });
// };


  const removeItem = async (id: number) => {
    setRemovingItems(prev => new Set(prev).add(id));
    
    try {
      // Remove from server first
      const res = await fetch(`/api/cartItems?id=${id}`, { 
        method: 'DELETE' 
      });

      if (!res.ok) {
        throw new Error('Failed to remove item');
      }

      // Remove from local state if server deletion was successful
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      
      // Also remove from local quantities
      setLocalQuantities(prev => {
        const newQuantities = {...prev};
        delete newQuantities[id];
        return newQuantities;
      });
      await fetchCart(); // ✅ This will immediately refresh Zustand store

    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Update all quantities on server before proceeding to checkout
      const updatePromises = Object.entries(localQuantities).map(async ([id, quantity]) => {
        const itemId = parseInt(id);
        const itemToUpdate = cartItems.find(item => item.id === itemId);
        
        if (itemToUpdate && itemToUpdate.quantity !== quantity) {
          const res = await fetch(`/api/cartItems?id=${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              cart_id: cartItems[0]?.cart_id,
              product_id: itemToUpdate.product.id,
              quantity: quantity
            })
          });
          
          if (!res.ok) {
            throw new Error(`Failed to update quantity for item ${itemId}`);
          }
          
          // Update the cartItems state to reflect the new quantity
          return { id: itemId, quantity };
        }
        return null;
      });
      
      await Promise.all(updatePromises);
      
      // Now proceed to checkout
      router.push(`/order`);
    } catch (error) {
      console.error('Error updating quantities:', error);
      alert('There was an error updating your cart. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Safe calculation of subtotal using local quantities
  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product;
    const quantity = localQuantities[item.id] || item.quantity;
    
    if (product && typeof product.price === 'number') {
      return sum + product.price * quantity;
    }
    return sum;
  }, 0);

  // const tax = subtotal * taxRate;
  const total = subtotal + shippingCost;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-black"></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl text-gray-200 dark:text-gray-600 mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you have not added any items to your cart yet.</p>
            <button 
              className="bg-black dark:bg-red-700 text-white px-6 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-red-600 transition-colors"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Cart Items ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map(item => {
                  const product = item.product;
                  const isRemoving = removingItems.has(item.id);
                  const currentQuantity = localQuantities[item.id] || item.quantity;
                  
                  if (!product) return null;

                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-4">
                      {/* <Image
                        width={160}
                        height={160}
                        src={item.product?.image_urls[0] || "/assets/IMG.JPG"}
                        alt={product.name || 'Product image'}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                       */}


                {item.product.image_urls && item.product.image_urls.length > 0 ? (
                  <Image
                    src={item.product.image_urls[0] || "/assets/IMG.JPG" }
                    alt={item.product.name}
                    width={160}
                    height={160}
                    className="object-cover w-16 h-16 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
      const target = e.currentTarget as HTMLImageElement;
      target.src = item.product.image_urls[0]; // ✅ Stronger fallback
    }}
                  />
                ) : (
                  <div className=" w-16 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}

                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mt-1">${product.price?.toFixed(2) || '0.00'}</p>
                        
                        <div className="mt-4 flex items-center">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                            <button 
                              className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                              onClick={() => updateLocalQuantity(item.id, currentQuantity - 1)}
                              disabled={isRemoving || currentQuantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
                              {currentQuantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                              onClick={() => updateLocalQuantity(item.id, currentQuantity + 1)}
                              disabled={isRemoving}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="ml-4 text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 flex items-center disabled:opacity-50 transition-colors"
                            onClick={() => removeItem(item.id)}
                            disabled={isRemoving}
                          >
                            {isRemoving ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 dark:border-red-500 mr-1"></div>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                            {isRemoving ? 'Removing...' : 'Remove'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((product.price || 0) * currentQuantity).toFixed(2)} EGP
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal ({cartItems.reduce((sum, item) => sum + (localQuantities[item.id] || item.quantity), 0)} items)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{subtotal.toFixed(2)} EGP</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">{shippingCost.toFixed(2)} EGP</span>
                </div>
                
                {/* <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div> */}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">{total.toFixed(2)} EGP</span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-black dark:bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || removingItems.size > 0}
                >
                  {isCheckingOut ? 'Updating Cart...' : 'Proceed to Checkout'}
                </button>
                
                <button 
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => router.push(`/`)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}