"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-yellow-900 to-red-600 bg-clip-text text-transparent">
                Thefty Cent
              </span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Bringing you the latest fashion trends with quality and style. 
              We offer premium clothing and accessories for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
               <li>
                <Link href="0000" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
           
              <li>
  <Link href="/policies" className="text-gray-400 hover:text-white transition-colors">
    Shipping & Returns
  </Link>              </li>
        
            </ul>
          </div>

       

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-3 bg-gradient-to-r from-red-800 to-gray-900 rounded-md text-white font-medium hover:from-red-600 hover:to-gray-700 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods & Trust Badges */}
        {/* <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div>
              <h4 className="text-sm font-medium mb-3">We Accept</h4>
              <div className="flex space-x-2">
                <div className="bg-white p-2 rounded-md">
                  <svg className="h-6 w-10" viewBox="0 0 36 24">
                    <path fill="#444" d="M24 0h-12v24h12v-24zm-2 16h-8v1h8v-1zm1-3h-10v1h10v-1zm1-3h-12v1h12v-1zm1-3h-14v1h14v-1zm-9-4h-5v2h5v-2z"/>
                  </svg>
                </div>
                <div className="bg-white p-2 rounded-md">
                  <svg className="h-6 w-10" viewBox="0 0 36 24">
                    <path fill="#444" d="M32 0h-28c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm-28 2h28c1.1 0 2 .9 2 2v2.4l-16 7.3-16-7.3v-2.4c0-1.1.9-2 2-2zm28 20h-28c-1.1 0-2-.9-2-2v-9.6l16 7.3 16-7.3v9.6c0 1.1-.9 2-2 2z"/>
                  </svg>
                </div>
                <div className="bg-white p-2 rounded-md">
                  <svg className="h-6 w-10" viewBox="0 0 36 24">
                    <path fill="#444" d="M32 0h-28c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm-28 2h28c1.1 0 2 .9 2 2v2.4l-16 7.3-16-7.3v-2.4c0-1.1.9-2 2-2zm28 20h-28c-1.1 0-2-.9-2-2v-9.6l16 7.3 16-7.3v9.6c0 1.1-.9 2-2 2z"/>
                  </svg>
                </div>
                <div className="bg-white p-2 rounded-md">
                  <svg className="h-6 w-10" viewBox="0 0 36 24">
                    <path fill="#444" d="M32 0h-28c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm-28 2h28c1.1 0 2 .9 2 2v2.4l-16 7.3-16-7.3v-2.4c0-1.1.9-2 2-2zm28 20h-28c-1.1 0-2-.9-2-2v-9.6l16 7.3 16-7.3v9.6c0 1.1-.9 2-2 2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Secure & Safe</h4>
              <div className="flex space-x-4">
                <div className="text-center">
                  <svg className="h-8 w-8 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-gray-400 mt-1">SSL Secure</span>
                </div>
                <div className="text-center">
                  <svg className="h-8 w-8 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-xs text-gray-400 mt-1">Free Shipping</span>
                </div>
                <div className="text-center">
                  <svg className="h-8 w-8 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400 mt-1">Money Back</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()}  All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}