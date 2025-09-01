// "use client"

// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import Image from "next/image";
// import { ca } from 'zod/v4/locales';

// interface OrderItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
// }
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   stock_quantity: number;
//   sku: string;
//   category: string;
// }

// interface CartItem {
//   id: number;
//   cart_id?: number;
//   quantity: number;
//   product: Product;
// }

// interface FormData {
//   email: string
//   phone: string
//   firstName: string
//   lastName: string
//   address: string
//   city: string
//   zipCode: string
//   country: string
//   paymentMethod: string
//   saveInfo: boolean
// }

// export default function OrderConfirmation() {
//   const [orderItems] = useState<OrderItem[]>([

//   ])
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchCart = async () => {
//         try {
//           setLoading(true);
//           const res = await fetch("/api/carts");
//           if (!res.ok) return;
//           const { cartItems } = await res.json();
//           setCartItems(cartItems || []);
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//           setCartItems([]);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCart();
//     }, []);

//     console.log(cartItems);

//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     phone: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: 'United States',
//     paymentMethod: 'credit_card',
//     saveInfo: false
//   })

//   const [errors, setErrors] = useState<Partial<FormData>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [orderPlaced, setOrderPlaced] = useState(false)
//     const router = useRouter();

//   // Calculate order totals
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
//   const shippingCost = 9.99
//   const tax = subtotal * 0.08
//   const total = subtotal + shippingCost + tax

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))

//     // Clear error when user starts typing
//     if (errors[name as keyof FormData]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }))
//     }
//   }

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {}
    
//     if (!formData.email) newErrors.email = 'Email is required'
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    
//     if (!formData.phone) newErrors.phone = 'Phone number is required'
//     else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number is invalid'
    
//     if (!formData.firstName) newErrors.firstName = 'First name is required'
//     if (!formData.lastName) newErrors.lastName = 'Last name is required'
//     if (!formData.address) newErrors.address = 'Address is required'
//     if (!formData.city) newErrors.city = 'City is required'
//     if (!formData.zipCode) newErrors.zipCode = 'Zip code is required'
//     if (!formData.country) newErrors.country = 'Country is required'

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }




//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   setIsSubmitting(true);

//   // Build API payload
//   const payload = {
//     customer_id: null, // or actual customer ID if logged in
//     customer_name: `${formData.firstName} ${formData.lastName}`,
//     customer_email: formData.email,
//     customer_phone: formData.phone,
//   cart_id: cartItems.length > 0 ? cartItems[0].cart_id || null : null, 
//     status: "pending",
//     payment_method: formData.paymentMethod,
//     payment_status: "unpaid",
//     shipping_address: formData.address,
//     billing_address: formData.address,
//     shipping_city: formData.city,
//     shipping_state: "", // Optional
//     shipping_postal_code: formData.zipCode,
//     shipping_country: formData.country
//   };

//   try {
//     const response = await fetch("/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Error creating order:", data.error);
//       setIsSubmitting(false);
//       return;
//     }

//     console.log("Order created successfully:", data);
//     setOrderPlaced(true);

//     // Optional: redirect to confirmation page
//     router.push(`/confirmed_order/${data.order_id}`);
//   } catch (error) {
//     console.error("Error submitting order:", error);
//   } finally {
//     setIsSubmitting(false);
//   }
// };




//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Confirmation</h1>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Order Summary */}
//           <div className="lg:w-2/5">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
//               <div className="space-y-4 mb-6">
//                 {cartItems.map(item => (
//                   <div key={item.id} className="flex items-center gap-4">
//                     <Image
//                     width={160}
//                     height={160}
//                         src={"/assets/IMG.JPG"}
//                         alt={'Product image'}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
                    
//                     <div className="flex-grow">
//                       <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     </div>
                    
//                     <div className="text-sm font-bold text-gray-900">
//                       ${(item.product.price * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="border-t border-gray-200 pt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium">${shippingCost.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between text-lg font-bold pt-2">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Contact and Shipping Information */}
//           <div className="lg:w-3/5">
//             <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact & Shipping Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="your@email.com"
//                   />
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="(123) 456-7890"
//                   />
//                   {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                     First Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="John"
//                   />
//                   {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Last Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="Doe"
//                   />
//                   {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                     Street Address *
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="123 Main St"
//                   />
//                   {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
//                     City *
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="New York"
//                   />
//                   {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     ZIP / Postal Code *
//                   </label>
//                   <input
//                     type="text"
//                     id="zipCode"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="10001"
//                   />
//                   {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                     Country *
//                   </label>
//                   <select
//                     id="country"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="United States">United States</option>
//                     <option value="Canada">Canada</option>
//                     <option value="United Kingdom">United Kingdom</option>
//                     <option value="Australia">Australia</option>
//                     <option value="Germany">Germany</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="mb-8">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
                
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <input
//                       id="credit_card"
//                       name="paymentMethod"
//                       type="radio"
//                       value="credit_card"
//                       checked={formData.paymentMethod === 'credit_card'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                     />
//                     <label htmlFor="credit_card" className="ml-3 block text-sm font-medium text-gray-700">
//                       InstaPay
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <input
//                       id="paypal"
//                       name="paymentMethod"
//                       type="radio"
//                       value="paypal"
//                       checked={formData.paymentMethod === 'paypal'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                     />
//                     <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
//                       Cash on Delivry
//                     </label>
//                   </div>
                  
                  
//                 </div>
//               </div>
              
//               {/* <div className="flex items-center mb-8">
//                 <input
//                   id="saveInfo"
//                   name="saveInfo"
//                   type="checkbox"
//                   checked={formData.saveInfo}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
//                   Save this information for next time
//                 </label>
//               </div> */}
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
//               // onClick={()=>router.push('/confirmed_order')  }
//               >
//                 {isSubmitting ? 'Processing...' : `Confirm Order - $${total.toFixed(2)}`}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  sku: string;
  category: string;
}

interface CartItem {
  id: number;
  cart_id?: number;
  quantity: number;
  product: Product;
}

// interface OrderItem {
//   id: number;
//   product_id: number;
//   quantity: number;
//   price: number;
//   name: string;
// }

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  saveInfo: boolean;
}

export default function OrderConfirmation() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit_card',
    saveInfo: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/carts");
        if (!res.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const { cartItems } = await res.json();
        setCartItems(cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
        setSubmitError('Failed to load cart items. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => {
    const productPrice = item.product?.price || 0;
    return sum + (productPrice * item.quantity);
  }, 0);
  
  const shippingCost = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear any previous submit errors
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setSubmitError('Your cart is empty. Please add items before proceeding.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Build API payload
      const payload = {
        customer_id: null,
        customer_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        customer_email: formData.email.trim(),
        customer_phone: formData.phone.replace(/\D/g, ''),
        cart_id: cartItems[0]?.cart_id || null,
        status: "pending",
        payment_method: formData.paymentMethod,
        payment_status: "unpaid",
        shipping_address: formData.address.trim(),
        billing_address: formData.address.trim(),
        shipping_city: formData.city.trim(),
        shipping_state: "",
        shipping_postal_code: formData.zipCode.trim(),
        shipping_country: formData.country,
        order_total: total,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          name: item.product.name
        }))
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Clear cart after successful order
      try {
        await fetch("/api/carts/clear", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (clearError) {
        console.warn("Failed to clear cart:", clearError);
        // Continue with order confirmation even if cart clearing fails
      }

      setOrderPlaced(true);
      // router.push(`/confirmed_order/${data.order_id}`);
      console.log("juju : ",data.order.order_id)
      router.push(`/confirmed_order/${data.order.order_id}`);

    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading your order...</p>
          </div>
        </div>
      </div>
    );
  }

if (cartItems.length === 0 && !loading) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl text-gray-200 dark:text-gray-600 mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Please add items to your cart before proceeding to checkout.</p>
          <button 
            className="bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            onClick={() => router.push('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
      
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Customer Information */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Customer Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.firstName 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.lastName 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.email 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.phone 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shipping Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                  errors.address 
                    ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                } bg-white dark:bg-gray-700`}
                placeholder="123 Main St"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.city 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                    errors.zipCode 
                      ? 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-700' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                  } bg-white dark:bg-gray-700`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
                )}
              </div>

              {/* <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div> */}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Payment Method *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">COD</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">InstaPay</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                      {item.quantity}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{item.product.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-3">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Place Order - $${total.toFixed(2)}`
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}