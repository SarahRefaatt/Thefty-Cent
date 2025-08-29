"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Params } from "zod/v4/core";

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  isNew: boolean;
  discount?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  colors: string[];
  sizes: string[];
}

// Mock product data
const products: Product[] = [
  { 
    id: 1, 
    name: "Premium Wireless Headphones", 
    price: "$199.99", 
    originalPrice: "$249.99",
    rating: 4.8, 
    reviews: 142,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],
    category: "Electronics",
    isNew: true,
    discount: 20,
    description: "Experience premium sound quality with our top-of-the-line wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Memory foam ear cushions",
      "Bluetooth 5.2",
      "Voice assistant support"
    ],
    specifications: {
      "Weight": "250g",
      "Battery": "30 hours playback",
      "Charging": "USB-C",
      "Connectivity": "Bluetooth 5.2",
      "Color": "Matte Black"
    },
    stock: 15,
    colors: ["Matte Black", "Silver", "Midnight Blue"],
    sizes: ["One Size"]
  },
  {
    id: 2,
    name: "Smartwatch Pro X",
    price: "$299.99",
    originalPrice: "$349.99",
    rating: 4.6,
    reviews: 320,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Wearables",
    isNew: true,
    discount: 15,
    description: "Stay connected and track your health with the Smartwatch Pro X featuring heart rate monitoring, GPS, and fitness tracking.",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant", "Custom Watch Faces"],
    specifications: {
      "Battery": "48 hours",
      "Charging": "Wireless",
      "Display": "AMOLED",
      "Connectivity": "Bluetooth, Wi-Fi"
    },
    stock: 25,
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["42mm", "46mm"]
  },
  {
    id: 3,
    name: "4K Ultra HD TV 55\"",
    price: "$699.99",
    originalPrice: "$899.99",
    rating: 4.7,
    reviews: 210,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Electronics",
    isNew: false,
    discount: 22,
    description: "Immersive home entertainment with crystal-clear 4K resolution and HDR support.",
    features: ["4K UHD", "HDR10+", "Smart TV Apps", "Dolby Atmos"],
    specifications: {
      "Screen Size": "55 inches",
      "Resolution": "3840x2160",
      "HDMI Ports": "4",
      "Smart OS": "Google TV"
    },
    stock: 10,
    colors: ["Black"],
    sizes: ["55 inch"]
  },
  {
    id: 4,
    name: "Gaming Laptop GX15",
    price: "$1299.99",
    originalPrice: "$1499.99",
    rating: 4.9,
    reviews: 180,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Computers",
    isNew: true,
    discount: 13,
    description: "High-performance gaming laptop with RTX graphics and ultra-fast refresh rate.",
    features: ["RTX 4070", "144Hz Display", "16GB RAM", "1TB SSD"],
    specifications: {
      "Processor": "Intel i7",
      "Graphics": "NVIDIA RTX 4070",
      "RAM": "16GB DDR5",
      "Storage": "1TB SSD"
    },
    stock: 7,
    colors: ["Black", "Red"],
    sizes: ["15.6 inch"]
  },
  {
    id: 5,
    name: "Bluetooth Speaker MaxBass",
    price: "$89.99",
    originalPrice: "$119.99",
    rating: 4.5,
    reviews: 95,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Audio",
    isNew: false,
    discount: 25,
    description: "Portable speaker with deep bass and 20 hours of playback.",
    features: ["20h Battery", "Waterproof", "Voice Assistant"],
    specifications: {
      "Battery": "20 hours",
      "Charging": "USB-C",
      "Waterproof": "IPX7"
    },
    stock: 40,
    colors: ["Black", "Blue"],
    sizes: ["One Size"]
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    price: "$249.99",
    originalPrice: "$299.99",
    rating: 4.4,
    reviews: 130,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Furniture",
    isNew: false,
    discount: 17,
    description: "Stay comfortable during long work hours with lumbar support and adjustable height.",
    features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh"],
    specifications: {
      "Material": "Mesh & Steel",
      "Weight Capacity": "300 lbs",
      "Color": "Black"
    },
    stock: 12,
    colors: ["Black", "Gray"],
    sizes: ["Standard"]
  },
  {
    id: 7,
    name: "Stainless Steel Cookware Set (10 pcs)",
    price: "$199.99",
    originalPrice: "$259.99",
    rating: 4.3,
    reviews: 88,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Kitchen",
    isNew: false,
    discount: 23,
    description: "Durable and stylish stainless steel cookware set for all your cooking needs.",
    features: ["10 Piece Set", "Dishwasher Safe", "Oven Safe"],
    specifications: {
      "Material": "Stainless Steel",
      "Pieces": "10",
      "Oven Safe": "Yes"
    },
    stock: 30,
    colors: ["Silver"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Smartphone X200",
    price: "$899.99",
    originalPrice: "$999.99",
    rating: 4.7,
    reviews: 450,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Electronics",
    isNew: true,
    discount: 10,
    description: "Flagship smartphone with pro-grade cameras and ultra-fast performance.",
    features: ["Triple Camera", "5G", "120Hz Display", "5000mAh Battery"],
    specifications: {
      "Screen": "6.7 inch AMOLED",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "12GB",
      "Storage": "256GB"
    },
    stock: 20,
    colors: ["Black", "White", "Blue"],
    sizes: ["128GB", "256GB"]
  },
  {
    id: 9,
    name: "Electric Standing Desk",
    price: "$499.99",
    originalPrice: "$599.99",
    rating: 4.6,
    reviews: 165,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Furniture",
    isNew: false,
    discount: 17,
    description: "Adjustable electric standing desk with memory presets.",
    features: ["Height Adjustable", "Memory Presets", "Cable Management"],
    specifications: {
      "Material": "Steel & Wood",
      "Height Range": "28-48 inches",
      "Max Load": "120kg"
    },
    stock: 18,
    colors: ["Black", "White", "Oak"],
    sizes: ["120cm", "140cm"]
  },
  {
    id: 10,
    name: "Air Purifier Pro",
    price: "$159.99",
    originalPrice: "$199.99",
    rating: 4.5,
    reviews: 75,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Home Appliances",
    isNew: false,
    discount: 20,
    description: "Breathe clean air with HEPA filtration and smart sensors.",
    features: ["HEPA Filter", "Smart Sensor", "Quiet Mode"],
    specifications: {
      "Coverage": "500 sq ft",
      "Filter Type": "HEPA",
      "Noise Level": "25dB"
    },
    stock: 22,
    colors: ["White"],
    sizes: ["One Size"]
  },
  {
    id: 11,
    name: "DSLR Camera ProShot 24MP",
    price: "$1199.99",
    originalPrice: "$1399.99",
    rating: 4.8,
    reviews: 95,
    images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],    category: "Cameras",
    isNew: true,
    discount: 14,
    description: "Professional DSLR camera with 24MP sensor and 4K video recording.",
    features: ["24MP Sensor", "4K Video", "Wi-Fi Connectivity"],
    specifications: {
      "Sensor": "24MP CMOS",
      "Video": "4K 60fps",
      "Lens Mount": "EF Mount"
    },
    stock: 9,
    colors: ["Black"],
    sizes: ["Body Only"]
  },
  {
    id: 12,
    name: "Running Shoes AirMax",
    price: "$129.99",
    originalPrice: "$159.99",
    rating: 4.4,
    reviews: 230,
        images: [
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
      "/assets/IMG.JPG",
    ],
    category: "Sportswear",
    isNew: false,
    discount: 19,
    description: "Lightweight and breathable running shoes with responsive cushioning.",
    features: ["Breathable Mesh", "Cushioning Sole", "Durable Outsole"],
    specifications: {
      "Material": "Mesh & Rubber",
      "Weight": "250g",
      "Color": "Gray/Blue"
    },
    stock: 50,
    colors: ["Gray/Blue", "Black/Red"],
    sizes: ["8", "9", "10", "11"]
  }
];


export default function ProductDetailPage() {

  const { id } = useParams<{ id: string }>(); // ✅ strongly typed
  const productId = parseInt(id, 10);
  console.log("Product ID from URL:", productId);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch product data based on the ID
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
    
    if (foundProduct) {
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add to cart logic here
      console.log("Added to cart:", {
        product: product.name,
        color: selectedColor,
        size: selectedSize,
        quantity
      });
      
      setIsAddingToCart(false);
      
      // Show success message
      alert("Product added to cart successfully!");
    }, 1000);
  };

  const incrementQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <motion.img 
                  key={selectedImage}
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    NEW
                  </span>
                )}
                
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                
                </div>
              </div> */}
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Pricing */}
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Color Selection */}
              {/* {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}
                        style={{ 
                          backgroundColor: color.toLowerCase().includes('black') ? '#000' : 
                                          color.toLowerCase().includes('silver') ? '#c0c0c0' : 
                                          color.toLowerCase().includes('blue') ? '#0000ff' : '#ccc'
                        }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>
              )}
               */}
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 rounded-l-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 rounded-r-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                    disabled={quantity >= product.stock}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  {/* <span className="ml-4 text-sm text-gray-500">{product.stock} available</span> */}
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center disabled:opacity-75"
                >
                  {isAddingToCart ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                
                {/* <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="px-8 py-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button className="ml-8 first:ml-0 py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
                    Details
                  </button>
                  {/* <button className="ml-8 py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Specifications
                  </button> */}
                  {/* <button className="ml-8 py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Reviews ({product.reviews})
                  </button> */}
                </nav>
              </div>
              
              <div className="py-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Specifications</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-bold">{relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-gray-500 text-sm line-through">{relatedProduct.originalPrice}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}