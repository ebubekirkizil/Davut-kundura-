import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Admin kullanıcısı oluşturuluyor...")

  const email = "ebukizil@gmail.com"
  const password = "123456"

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log("⚠️  Bu email ile kullanıcı zaten mevcut")

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        role: "ADMIN",
      },
    })
    console.log("✅ Kullanıcı güncellendi ve ADMIN rolü verildi")
  } else {
    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
      },
    })
    console.log("✅ Admin kullanıcısı başarıyla oluşturuldu")
  }

  console.log("\n📧 Email:", email)
  console.log("🔑 Şifre:", password)
  console.log("\n🚀 Admin paneline giriş yapabilirsiniz: /admin/login")
}

main()
  .catch((e) => {
    console.error("❌ Hata:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
