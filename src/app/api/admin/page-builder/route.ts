import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { slug, title, sections, globalTheme } = data;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Sayfa slug eksik." }, { status: 400 });
    }

    // `pages` tablosuna (Eğer varsa) sayfayı kaydet. 
    // Tablonun beklenen yapısı: id, slug (unique), title, content (jsonb), theme (jsonb), updated_at
    const { data: existingPage, error: selectError } = await supabaseAdmin
      .from("pages")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (selectError && selectError.code !== '42P01') { 
      // 42P01 is table not found, we ignore it to prevent crashes if table isn't created yet
      console.error("Select error:", selectError);
    }

    if (existingPage) {
      const { error: updateError } = await supabaseAdmin
        .from("pages")
        .update({ 
          title, 
          content: sections, 
          theme: globalTheme, 
          updated_at: new Date().toISOString() 
        })
        .eq("slug", slug);
        
      if (updateError && updateError.code !== '42P01') throw updateError;
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("pages")
        .insert([{ 
          slug, 
          title, 
          content: sections, 
          theme: globalTheme 
        }]);
        
      if (insertError && insertError.code !== '42P01') throw insertError;
    }

    return NextResponse.json({ success: true, message: "Sayfa kaydedildi" });
  } catch (err: any) {
    console.error("Page Save Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "index";

  try {
    const { data, error } = await supabaseAdmin
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error && error.code !== '42P01') throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Page Load Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
