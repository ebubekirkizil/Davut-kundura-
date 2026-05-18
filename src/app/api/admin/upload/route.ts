import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 })
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Sadece görsel dosyaları kabul edilir" }, { status: 400 })
    }

    // Maksimum 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Dosya boyutu 10MB'dan küçük olmalıdır" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const fileName = `builder/${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`

    // Bucket'ın varlığını kontrol et, yoksa oluştur
    const { data: buckets } = await supabaseAdmin.storage.listBuckets()
    const bucketExists = buckets?.some((b) => b.name === "assets")

    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket("assets", { public: true })
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from("assets")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: "Yükleme başarısız: " + uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabaseAdmin.storage.from("assets").getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl, fileName })
  } catch (err) {
    console.error("Upload route error:", err)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
