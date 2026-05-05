"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Save,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layout,
  Image,
  Type,
  Grid,
  Star,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"

// Section types
type SectionType = "hero" | "features" | "products" | "gallery" | "cta" | "testimonials" | "text"

interface Section {
  id: string
  type: SectionType
  config: Record<string, any>
}

// Section library
const sectionLibrary = [
  {
    type: "hero" as SectionType,
    name: "Hero Bölümü",
    icon: Layout,
    description: "Büyük başlık ve CTA butonlu hero",
    defaultConfig: {
      title: "Hoş Geldiniz",
      subtitle: "Premium deri ürünler",
      buttonText: "Keşfet",
      buttonLink: "/products",
      backgroundImage: "",
    },
  },
  {
    type: "features" as SectionType,
    name: "Özellikler",
    icon: Grid,
    description: "3 sütunlu özellik kartları",
    defaultConfig: {
      title: "Özelliklerimiz",
      features: [
        { title: "Kaliteli Malzeme", description: "100% gerçek deri", icon: "⭐" },
        { title: "Hızlı Kargo", description: "2-3 gün teslimat", icon: "🚚" },
        { title: "Garanti", description: "2 yıl garanti", icon: "✓" },
      ],
    },
  },
  {
    type: "products" as SectionType,
    name: "Ürün Listesi",
    icon: ShoppingBag,
    description: "Ürün grid görünümü",
    defaultConfig: {
      title: "Öne Çıkan Ürünler",
      category: "all",
      limit: 8,
    },
  },
  {
    type: "gallery" as SectionType,
    name: "Galeri",
    icon: Image,
    description: "Görsel galerisi",
    defaultConfig: {
      title: "Galeri",
      images: [],
    },
  },
  {
    type: "testimonials" as SectionType,
    name: "Müşteri Yorumları",
    icon: Star,
    description: "Müşteri referansları",
    defaultConfig: {
      title: "Müşterilerimiz Ne Diyor",
      testimonials: [
        { name: "Ahmet Y.", text: "Harika ürünler!", rating: 5 },
        { name: "Ayşe K.", text: "Çok memnunum", rating: 5 },
      ],
    },
  },
  {
    type: "cta" as SectionType,
    name: "CTA Bölümü",
    icon: Type,
    description: "Harekete geçirici mesaj",
    defaultConfig: {
      title: "Hemen Sipariş Verin",
      description: "Premium ürünlerimizi keşfedin",
      buttonText: "Alışverişe Başla",
      buttonLink: "/products",
    },
  },
  {
    type: "text" as SectionType,
    name: "Metin Bölümü",
    icon: Type,
    description: "Serbest metin içeriği",
    defaultConfig: {
      title: "Başlık",
      content: "İçerik metni buraya gelecek...",
    },
  },
]

export default function PageBuilderPage() {
  const [sections, setSections] = React.useState<Section[]>([])
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null)
  const [previewMode, setPreviewMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop")
  const [pageName, setPageName] = React.useState("Yeni Sayfa")

  const addSection = (type: SectionType) => {
    const template = sectionLibrary.find((s) => s.type === type)
    if (!template) return

    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      config: { ...template.defaultConfig },
    }

    setSections([...sections, newSection])
    setSelectedSection(newSection.id)
    toast.success(`${template.name} eklendi`)
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
    if (selectedSection === id) {
      setSelectedSection(null)
    }
    toast.success("Bölüm silindi")
  }

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === sections.length - 1) return

    const newSections = [...sections]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]

    setSections(newSections)
  }

  const updateSectionConfig = (id: string, config: Record<string, any>) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, config: { ...s.config, ...config } } : s))
    )
  }

  const savePage = () => {
    toast.success("Sayfa kaydedildi")
    console.log("Page data:", { name: pageName, sections })
  }

  const selectedSectionData = sections.find((s) => s.id === selectedSection)
  const selectedTemplate = selectedSectionData
    ? sectionLibrary.find((t) => t.type === selectedSectionData.type)
    : null

  const previewWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b bg-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="w-64"
            placeholder="Sayfa adı"
          />
          <Badge variant="outline">{sections.length} bölüm</Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg">
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Önizle
          </Button>

          <Button onClick={savePage}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Section Library */}
        <div className="w-64 border-r bg-muted/30 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Bölüm Kütüphanesi</h3>
            <div className="space-y-2">
              {sectionLibrary.map((section) => (
                <button
                  key={section.type}
                  onClick={() => addSection(section.type)}
                  className="w-full p-3 border rounded-lg hover:bg-accent transition-colors text-left group"
                >
                  <div className="flex items-start gap-3">
                    <section.icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{section.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 overflow-y-auto bg-muted/10 p-8">
          <div
            className="mx-auto bg-background shadow-lg transition-all duration-300"
            style={{ width: previewWidths[previewMode], minHeight: "100%" }}
          >
            {sections.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-center">
                <div>
                  <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Başlamak için sol taraftan bir bölüm ekleyin
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {sections.map((section, index) => {
                  const template = sectionLibrary.find((t) => t.type === section.type)
                  const isSelected = selectedSection === section.id

                  return (
                    <div
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`relative group cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-accent" : ""
                      }`}
                    >
                      {/* Section Preview */}
                      <div className="p-8 border-b">
                        <SectionPreview section={section} />
                      </div>

                      {/* Section Controls */}
                      <div
                        className={`absolute top-2 right-2 flex gap-1 ${
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        } transition-opacity`}
                      >
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveSection(section.id, "up")
                          }}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveSection(section.id, "down")
                          }}
                          disabled={index === sections.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeSection(section.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Section Label */}
                      <div
                        className={`absolute top-2 left-2 ${
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        } transition-opacity`}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {template?.name}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Settings */}
        <div className="w-80 border-l bg-muted/30 overflow-y-auto">
          <div className="p-4">
            {selectedSectionData && selectedTemplate ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5" />
                  <h3 className="font-semibold">{selectedTemplate.name} Ayarları</h3>
                </div>

                <div className="space-y-4">
                  <SectionSettings
                    section={selectedSectionData}
                    onUpdate={(config) => updateSectionConfig(selectedSectionData.id, config)}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Düzenlemek için bir bölüm seçin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Section Preview Component
function SectionPreview({ section }: { section: Section }) {
  const { type, config } = section

  switch (type) {
    case "hero":
      return (
        <div className="text-center py-12">
          <h1 className="text-4xl font-serif font-bold mb-4">{config.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{config.subtitle}</p>
          <Button>{config.buttonText}</Button>
        </div>
      )

    case "features":
      return (
        <div>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">{config.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {config.features.map((feature: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    case "products":
      return (
        <div>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">{config.title}</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3" />
                  <p className="font-medium text-sm">Ürün {i}</p>
                  <p className="text-sm text-muted-foreground">299₺</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    case "testimonials":
      return (
        <div>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">{config.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {config.testimonials.map((testimonial: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-3">{testimonial.text}</p>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    case "cta":
      return (
        <div className="bg-accent/10 py-12 text-center rounded-lg">
          <h2 className="text-3xl font-serif font-bold mb-4">{config.title}</h2>
          <p className="text-muted-foreground mb-6">{config.description}</p>
          <Button size="lg">{config.buttonText}</Button>
        </div>
      )

    case "text":
      return (
        <div>
          <h2 className="text-3xl font-serif font-bold mb-4">{config.title}</h2>
          <p className="text-muted-foreground">{config.content}</p>
        </div>
      )

    default:
      return <div>Bilinmeyen bölüm tipi</div>
  }
}

// Section Settings Component
function SectionSettings({
  section,
  onUpdate,
}: {
  section: Section
  onUpdate: (config: Record<string, any>) => void
}) {
  const { type, config } = section

  const handleChange = (key: string, value: any) => {
    onUpdate({ [key]: value })
  }

  switch (type) {
    case "hero":
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Başlık</label>
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Alt Başlık</label>
            <Input
              value={config.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Buton Metni</label>
            <Input
              value={config.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Buton Linki</label>
            <Input
              value={config.buttonLink}
              onChange={(e) => handleChange("buttonLink", e.target.value)}
            />
          </div>
        </>
      )

    case "features":
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Başlık</label>
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
        </>
      )

    case "products":
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Başlık</label>
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Kategori</label>
            <select
              value={config.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            >
              <option value="all">Tümü</option>
              <option value="belts">Kemerler</option>
              <option value="insoles">Tabanlar</option>
              <option value="care">Bakım</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Ürün Sayısı</label>
            <Input
              type="number"
              value={config.limit}
              onChange={(e) => handleChange("limit", parseInt(e.target.value))}
            />
          </div>
        </>
      )

    case "cta":
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Başlık</label>
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Açıklama</label>
            <Input
              value={config.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Buton Metni</label>
            <Input
              value={config.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Buton Linki</label>
            <Input
              value={config.buttonLink}
              onChange={(e) => handleChange("buttonLink", e.target.value)}
            />
          </div>
        </>
      )

    case "text":
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Başlık</label>
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">İçerik</label>
            <textarea
              value={config.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </>
      )

    default:
      return <p className="text-sm text-muted-foreground">Ayar bulunamadı</p>
  }
}
