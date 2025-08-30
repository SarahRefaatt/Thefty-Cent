// 
import { supabase } from "@/lib/supabaseClient";

// GET Products
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id && !isNaN(Number(id))) {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(product), { status: 200 });
  }

  const { data: products, error } = await supabase.from("products").select("*");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify(products), { status: 200 });
}

// POST Product
export async function POST(req: Request) {
  const { name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url } = await req.json();

  if (!name || price === undefined || stock_quantity === undefined) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .insert({ name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
}

// PUT Product
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });

  const { name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url } = await req.json();

  const { data, error } = await supabase
    .from("products")
    .update({ name, description, price, stock_quantity, sku, category, brand, weight, dimensions, image_url })
    .eq("id", Number(id))
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}
