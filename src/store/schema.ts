/**
 * SCHEMA REGISTRY
 * Bu dosya, builder içindeki tüm bileşenlerin (sections) ve blokların (blocks) 
 * hangi ayarlara sahip olduğunu ve bu ayarların editörde nasıl görüneceğini tanımlar.
 */

export type SettingType = "text" | "textarea" | "select" | "range" | "color" | "image" | "checkbox" | "number";

export interface SettingSchema {
  id: string;
  type: SettingType;
  label: string;
  default: any;
  options?: { label: string; value: any }[]; // 'select' tipi için
  min?: number; // 'range' ve 'number' için
  max?: number;
  step?: number;
}

export interface SectionSchema {
  type: string;
  label: string;
  icon: string; // Lucide icon adı
  settings: SettingSchema[];
  blocks?: {
    limit?: number;
    types: string[];
  };
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  hero: {
    type: "hero",
    label: "Hero Banner",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Zarafetin Adımları" },
      { id: "subtitle", type: "textarea", label: "Alt Metin", default: "Premium Deri Koleksiyonu" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Keşfet" },
      { id: "alignment", type: "select", label: "Hizalama", default: "center", options: [
        { label: "Sol", value: "left" },
        { label: "Orta", value: "center" },
        { label: "Sağ", value: "right" }
      ]},
      { id: "overlayOpacity", type: "range", label: "Koyuluk Oranı", default: 40, min: 0, max: 90, step: 5 },
      { id: "backgroundImage", type: "image", label: "Arka Plan Görseli", default: "" }
    ]
  },
  productGrid: {
    type: "productGrid",
    label: "Ürün Izgarası",
    icon: "Grid",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "En Çok Satanlar" },
      { id: "limit", type: "range", label: "Ürün Sayısı", default: 4, min: 2, max: 12 },
      { id: "columns", type: "select", label: "Sütun Sayısı", default: 4, options: [
        { label: "2 Sütun", value: 2 },
        { label: "3 Sütun", value: 3 },
        { label: "4 Sütun", value: 4 }
      ]}
    ]
  },
  richText: {
    type: "richText",
    label: "Zengin Metin",
    icon: "Type",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Hikayemiz" },
      { id: "content", type: "textarea", label: "İçerik", default: "1980'den beri ayakkabı sanatında öncüyüz." },
      { id: "size", type: "select", label: "Metin Boyutu", default: "medium", options: [
        { label: "Küçük", value: "small" },
        { label: "Orta", value: "medium" },
        { label: "Büyük", value: "large" }
      ]}
    ]
  }
};
