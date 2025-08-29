"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function OrderConfirmed() {
  const [orderId, setOrderId] = useState<string>('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [orderDate, setOrderDate] = useState<string>('')
  const [deliveryDate, setDeliveryDate] = useState<string>('')

  useEffect(() => {
    // Generate a random order ID
    const randomId = 'ORD-' + Math.floor(10000 + Math.random() * 90000)
    setOrderId(randomId)
    
    // Set current date and delivery date (3 days from now)
    const today = new Date()
    const delivery = new Date()
    delivery.setDate(today.getDate() + 3)
    
    setOrderDate(today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
    
    setDeliveryDate(delivery.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
    
    // Mock order items
    setOrderItems([
      {
        id: 1,
        name: "Premium Denim Jacket",
        price: 89.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 2,
        name: "Classic White Sneakers",
        price: 75.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ])
  }, [])

  // Calculate order totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Success Icon and Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
              <span className="text-gray-700">Order ID: </span>
              <span className="font-semibold text-gray-600">{orderId}</span>
            </div>
          </div>
          
          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium">{orderDate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-medium">{deliveryDate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Address</span>
                  <span className="font-medium text-right">
                    123 Main Street<br />
                    New York, NY 10001<br />
                    United States
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    
                    <div className="text-sm font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What is Next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Order Processing</h3>
                  <p className="text-sm text-gray-600">We are preparing your order for shipment. This usually takes 1-2 business days.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Shipping Confirmation</h3>
                  <p className="text-sm text-gray-600">You will receive a shipping confirmation email with tracking information once your order ships.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Delivery</h3>
                  <p className="text-sm text-gray-600">Your order will be delivered by {deliveryDate}. Someone must be available to receive the package.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Continue Shopping
            </button>
      
          </div>
        </div>
      </div>
    </div>
  )
}