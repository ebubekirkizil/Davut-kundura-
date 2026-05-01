// Admin oluşturma — Supabase REST API üzerinden
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');

const SUPABASE_URL = 'https://kiegzuemejzaumbquxjr.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZWd6dWVtZWp6YXVtYnF1eGpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxMTM0MSwiZXhwIjoyMDkyODg3MzQxfQ.3c_qwITGDu6LZ0I-SPcwRTbSKkdg1SbaBYcIZtQBD1k';

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates,return=representation',
};

async function main() {
  console.log('🔐 Admin şifresi hashleniyor...');
  const hashedPassword = await bcrypt.hash('123456', 10);
  const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  const now = new Date().toISOString();

  console.log('📡 Supabase\'e bağlanılıyor...');

  const response = await fetch(`${SUPABASE_URL}/rest/v1/User`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      name: 'Ebubekir Kızıl',
      email: 'ebukizil@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: now,
      createdAt: now,
      updatedAt: now,
    }),
  });

  const text = await response.text();
  
  if (response.ok) {
    console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
    console.log('   E-posta: ebukizil@gmail.com');
    console.log('   Şifre: 123456');
    console.log('   Rol: ADMIN');
  } else {
    // 409 çakışma = zaten var, güncelle
    if (response.status === 409 || text.includes('duplicate')) {
      console.log('ℹ️ Kullanıcı zaten var, şifre güncelleniyor...');
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/User?email=eq.ebukizil@gmail.com`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          password: hashedPassword,
          role: 'ADMIN',
          updatedAt: now,
        }),
      });
      if (updateRes.ok) {
        console.log('✅ Şifre güncellendi! Giriş: ebukizil@gmail.com / 123456');
      } else {
        console.error('❌ Güncelleme hatası:', await updateRes.text());
      }
    } else {
      console.error('❌ Hata:', response.status, text);
    }
  }
}

main().catch(console.error);
