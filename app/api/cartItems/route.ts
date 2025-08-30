// import { supabase } from "@/lib/supabaseClient"

// export async function GET(req: Request) {

//     const url = new URL(req.url);
//     const id = url.searchParams.get("id");
//     if (id) {
//         const { data: cart_item, error } = await supabase.from("cart_items").select("*").eq("id", id).single()

//         if (error) {
//             return new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//             })
//         }

//         return new Response(JSON.stringify(cart_item), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         })
//     }
//     const cartId=url.searchParams.get("cartId");
//     if (cartId) {
//         const { data: cart_items, error } = await supabase.from("cart_items").select("*").eq("cart_id", cartId)

//         if (error) {
//             return new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//             })
//         }

//         return new Response(JSON.stringify(cart_items), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         })
//     }
//     const product_id=url.searchParams.get("product_id");
//     if (product_id) {
//         const { data: cart_item, error } = await supabase.from("cart_items").select("*").eq("product_id", product_id)

//         if (error) {
//             return new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//             })
//         }

//         return new Response(JSON.stringify(cart_item), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         })
//     }

//   const { data: cart_items, error } = await supabase.from("cart_items").select("*")

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     })
//   }

//   return new Response(JSON.stringify(cart_items), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   })
// }
// interface Product {
//   id: string;
//   stock_quantity: number;
// }

// export async function POST(request: Request) {
//   const { cart_id, product_id, quantity } = await request.json();

//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .select("id, stock_quantity")
//     .eq("id", product_id)
//     .single<Product>();

//   if (productError || !product) {
//     return new Response(JSON.stringify({ error: "Product not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   if (quantity > product.stock_quantity) {
//     return new Response(
//       JSON.stringify({ error: "Not enough stock available" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   const { data: cart, error: cartError } = await supabase
//     .from("carts")
//     .select("id")
//     .eq("id", cart_id)
//     .single();

//   if (cartError || !cart) {
//     return new Response(JSON.stringify({ error: "Cart not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // 3️⃣ Check if product already exists in this cart
//   const { data: existingItem, error: fetchError } = await supabase
//     .from("cart_items")
//     .select("id, quantity")
//     .eq("cart_id", cart_id)
//     .eq("product_id", product_id)
//     .single();

//   if (fetchError && fetchError.code !== "PGRST116") {
//     return new Response(JSON.stringify({ error: fetchError.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   if (existingItem) {
//     const newQuantity = existingItem.quantity + quantity;

//     if (newQuantity > product.stock_quantity) {
//       return new Response(
//         JSON.stringify({ error: "Cannot exceed product stock" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const { data, error: updateError } = await supabase
//       .from("cart_items")
//       .update({ quantity: newQuantity })
//       .eq("id", existingItem.id)
//       .select()
//       .single();

//     if (updateError) {
//       return new Response(JSON.stringify({ error: updateError.message }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // 4️⃣ If not in cart, insert as new item
//   const { data, error } = await supabase
//     .from("cart_items")
//     .insert([{ cart_id, product_id, quantity }])
//     .select()
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify(data), {
//     status: 201,
//     headers: { "Content-Type": "application/json" },
//   });
// }

  
// export async function PUT(request: Request) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");

//   if (!id) {
//     return new Response(JSON.stringify({ error: "ID is required" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const { cart_id, product_id, quantity } = await request.json();

//   // 1️⃣ Check if product exists
//   const { data: product, error: productError } = await supabase
//     .from("products")
//     .select("id, stock_quantity")
//     .eq("id", product_id)
//     .single();

//   if (productError || !product) {
//     return new Response(JSON.stringify({ error: "Product not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // 2️⃣ Check if cart exists
//   const { data: cart, error: cartError } = await supabase
//     .from("carts")
//     .select("id")
//     .eq("id", cart_id)
//     .single();

//   if (cartError || !cart) {
//     return new Response(JSON.stringify({ error: "Cart not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // 3️⃣ Validate stock availability
//   if (quantity > product.stock_quantity) {
//     return new Response(
//       JSON.stringify({ error: "Not enough stock available" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   // 4️⃣ Update cart item
//   const { data, error } = await supabase
//     .from("cart_items")
//     .update({ cart_id, product_id, quantity })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify(data), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

import { supabase } from "@/lib/supabaseClient";

// GET Cart Items
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const cart_id = url.searchParams.get("cartId");
  const product_id = url.searchParams.get("product_id");

  if (id) {
    const { data, error } = await supabase.from("cart_items").select("*").eq("id", Number(id)).single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (cart_id) {
    const { data, error } = await supabase.from("cart_items").select("*").eq("cart_id", Number(cart_id));
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  if (product_id) {
    const { data, error } = await supabase.from("cart_items").select("*").eq("product_id", Number(product_id));
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  const { data, error } = await supabase.from("cart_items").select("*");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}

// POST Add Item to Cart
export async function POST(req: Request) {
  const { cart_id, product_id, quantity } = await req.json();
  if (!cart_id || !product_id || !quantity) return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });

  // Validate product exists
  const { data: product, error: productError } = await supabase.from("products").select("id, stock_quantity").eq("id", product_id).single();
  if (productError || !product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

  // Validate stock
  if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Not enough stock available" }), { status: 400 });

  // Validate cart exists
  const { data: cart, error: cartError } = await supabase.from("carts").select("id").eq("id", cart_id).single();
  if (cartError || !cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });

  // Check if item already in cart
  const { data: existingItem, error: existingError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart_id)
    .eq("product_id", product_id)
    .maybeSingle(); // ✅ use maybeSingle() instead of single().catch()

  if (existingError) {
    return new Response(JSON.stringify({ error: existingError.message }), { status: 500 });
  }  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Cannot exceed product stock" }), { status: 400 });
    const { data, error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", existingItem.id).select().single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  // Insert new item
  const { data, error } = await supabase.from("cart_items").insert([{ cart_id, product_id, quantity }]).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
}

// PUT Update Cart Item
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });

  const { cart_id, product_id, quantity } = await req.json();

  // Validate product
  const { data: product, error: productError } = await supabase.from("products").select("id, stock_quantity").eq("id", product_id).single();
  if (productError || !product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

  // Validate cart
  const { data: cart, error: cartError } = await supabase.from("carts").select("id").eq("id", cart_id).single();
  if (cartError || !cart) return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });

  // Validate stock
  if (quantity > product.stock_quantity) return new Response(JSON.stringify({ error: "Not enough stock available" }), { status: 400 });

  // Update item
  const { data, error } = await supabase.from("cart_items").update({ cart_id, product_id, quantity }).eq("id", id).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}
