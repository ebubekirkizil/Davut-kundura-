// Admin kullanıcısı oluşturma scripti
// Çalıştır: node scripts/create-admin.mjs

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dotenv yükle
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'ebukizil@gmail.com';
  const password = '1453';
  const name = 'Ebubekir Kızıl';

  // Şifreyi hashle (10 round salt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Kullanıcıyı oluştur veya güncelle
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name,
    },
    create: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
  console.log(`   E-posta: ${user.email}`);
  console.log(`   Rol: ${user.role}`);
  console.log(`   ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
