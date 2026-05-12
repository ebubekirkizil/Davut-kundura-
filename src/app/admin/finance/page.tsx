"use client"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { TrendingUp, TrendingDown, Wallet, Building2, CreditCard, Plus, Tag, CheckCircle2, Clock, ArrowDownLeft, ArrowUpRight, ChevronRight, AlertCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BankPanel from "@/components/admin/BankPanel"

const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false })
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false })
const BarChart = dynamic(() => import("recharts").then(m => m.BarChart), { ssr: false })
const Bar = dynamic(() => import("recharts").then(m => m.Bar), { ssr: false })
const PieChart = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false })
const Pie = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false })
const Cell = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false })
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false })

const monthly = [
  { ay:"Oca",gelir:68000,gider:32000,kar:36000 },{ ay:"Şub",gelir:74000,gider:28000,kar:46000 },
  { ay:"Mar",gelir:91000,gider:41000,kar:50000 },{ ay:"Nis",gelir:85000,gider:38000,kar:47000 },
  { ay:"May",gelir:110000,gider:45000,kar:65000 },{ ay:"Haz",gelir:98000,gider:42000,kar:56000 },
  { ay:"Tem",gelir:127000,gider:48000,kar:79000 },{ ay:"Ağu",gelir:119000,gider:44000,kar:75000 },
  { ay:"Eyl",gelir:134000,gider:51000,kar:83000 },{ ay:"Eki",gelir:142000,gider:55000,kar:87000 },
]
const expData = [
  { name:"Hammadde/Deri",value:38,color:"#b45309",amt:20900 },
  { name:"Kargo",value:22,color:"#0891b2",amt:12100 },
  { name:"Pazarlama",value:14,color:"#7c3aed",amt:7700 },
  { name:"Kira",value:18,color:"#475569",amt:9900 },
  { name:"Personel",value:8,color:"#059669",amt:4400 },
]
const cashflow = [
  { gun:"Pzt",g:12400 },{ gun:"Sal",g:8200 },{ gun:"Çar",g:19800 },
  { gun:"Per",g:15600 },{ gun:"Cum",g:27300 },{ gun:"Cmt",g:34100 },{ gun:"Paz",g:11200 },
]
const txList = [
  { id:1,d:"Koray Ayakkabıcılık — B2B Sipariş",a:45000,t:"IN",tag:"Toptan",dt:"Bugün 10:12",s:"OK" },
  { id:2,d:"Vaketa Deri Alımı",a:22000,t:"OUT",tag:"Hammadde",dt:"Bugün 08:45",s:"OK" },
  { id:3,d:"Ahmet Yılmaz — ORD-2024-1042",a:3450,t:"IN",tag:"Web Satış",dt:"Dün 16:30",s:"OK" },
  { id:4,d:"Instagram Reklam",a:1850,t:"OUT",tag:"Pazarlama",dt:"Dün 12:00",s:"OK" },
  { id:5,d:"Aras Kargo Ekim Toplu",a:8200,t:"OUT",tag:"Kargo",dt:"23 Eki",s:"OK" },
  { id:6,d:"Zarif Deri A.Ş. Avans",a:12800,t:"IN",tag:"Toptan",dt:"23 Eki",s:"WAIT" },
]
const pend = [
  { id:"p1",c:"Koray Ayakkabıcılık",o:"ORD-1041",a:25000,d:"30 Kas",tp:"B2B",late:false },
  { id:"p2",c:"Zarif Deri A.Ş.",o:"ORD-1038",a:12800,d:"18 Kas",tp:"B2B",late:false },
  { id:"p3",c:"Mehmet Keleş",o:"ORD-1035",a:890,d:"10 Kas",tp:"B2C",late:true },
]
const cari = [
  { name:"Koray Ayakkabıcılık",type:"MÜŞTERİ",bal:25000,last:"24 Eki" },
  { name:"Zarif Deri A.Ş.",type:"MÜŞTERİ",bal:12800,last:"23 Eki" },
  { name:"Hakiki Deri A.Ş.",type:"TEDARİKÇİ",bal:-18500,last:"22 Eki" },
  { name:"Kauçuk Taban Ltd.",type:"TEDARİKÇİ",bal:-6200,last:"20 Eki" },
]
const TAGS = ["Hammadde","Kargo","Pazarlama","Kira","Personel","Web Satış","Toptan","Diğer"]

function fmt(n:number){ return new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(n) }

export default function FinancePage(){
  const [qD,setQD]=useState(""); const [qA,setQA]=useState(""); const [qT,setQT]=useState("EXPENSE"); const [qTag,setQTag]=useState("Diğer"); const [saved,setSaved]=useState(false)
  const [customTags,setCustomTags]=useState(TAGS); const [newTag,setNewTag]=useState(""); const [showTagMgr,setShowTagMgr]=useState(false)

  function save(){ if(!qD.trim()||!qA)return; setSaved(true);setQD("");setQA("");setTimeout(()=>setSaved(false),2000) }
  function addTag(){ if(!newTag.trim()||customTags.includes(newTag.trim()))return; setCustomTags([...customTags,newTag.trim()]);setNewTag("") }

  return(
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* STICKY BAR */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-2.5 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1"><div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center"><CreditCard className="w-3.5 h-3.5 text-white"/></div><span className="text-sm font-serif font-bold text-slate-900">Finans</span></div>
          <div className="h-5 w-px bg-slate-200 mx-1"/>
          <Select value={qT} onValueChange={setQT}><SelectTrigger className="h-8 w-20 border-slate-200 bg-slate-50 text-xs"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="EXPENSE" className="text-xs">Gider</SelectItem><SelectItem value="INCOME" className="text-xs">Gelir</SelectItem></SelectContent></Select>
          <Input value={qD} onChange={e=>setQD(e.target.value)} placeholder="Açıklama..." className="h-8 text-xs flex-1 min-w-[160px] bg-slate-50 border-slate-200"/>
          <Input value={qA} onChange={e=>setQA(e.target.value)} placeholder="₺ Tutar" type="number" className="h-8 text-xs w-24 font-mono bg-slate-50 border-slate-200"/>
          <Select value={qTag} onValueChange={setQTag}><SelectTrigger className="h-8 w-28 border-slate-200 bg-slate-50 text-xs"><Tag className="w-3 h-3 mr-1 text-slate-400"/><SelectValue/></SelectTrigger><SelectContent>{customTags.map(t=><SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select>
          <Button onClick={save} size="sm" className={`h-8 text-xs px-4 ${saved?"bg-emerald-600":"bg-slate-900"} text-white`}>{saved?<><CheckCircle2 className="w-3 h-3 mr-1"/>Kaydedildi</>:<><Plus className="w-3 h-3 mr-1"/>Kaydet</>}</Button>
          <Button onClick={()=>setShowTagMgr(!showTagMgr)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400"><Settings className="w-3.5 h-3.5"/></Button>
        </div>
        {showTagMgr&&(
          <div className="max-w-screen-2xl mx-auto px-6 pb-2.5 flex items-center gap-2 border-t border-slate-100 pt-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Etiket Yönet:</span>
            <div className="flex flex-wrap gap-1">{customTags.map(t=>(<span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>))}</div>
            <Input value={newTag} onChange={e=>setNewTag(e.target.value)} placeholder="Yeni etiket..." className="h-6 text-xs w-32 bg-slate-50 border-slate-200"/>
            <Button onClick={addTag} size="sm" variant="outline" className="h-6 text-[10px] px-2">Ekle</Button>
          </div>
        )}
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {/* KPI */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {l:"Bu Ay Ciro",v:142000,p:134000,ic:TrendingUp,bg:"from-emerald-500 to-teal-400"},
            {l:"Bu Ay Gider",v:55000,p:51000,ic:TrendingDown,bg:"from-rose-500 to-orange-400"},
            {l:"Net Kâr",v:87000,p:83000,ic:Wallet,bg:"from-amber-500 to-yellow-400"},
            {l:"Banka Bakiyesi",v:284320,p:null,ic:Building2,bg:"from-slate-700 to-slate-500"},
          ].map(k=>{const d=k.p?((k.v-k.p)/k.p*100).toFixed(1):"0";const up=parseFloat(d)>=0;return(
            <Card key={k.l} className="border-slate-200 bg-white shadow-sm"><CardContent className="p-5">
              <div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{k.l}</p><p className="text-2xl font-black font-mono tabular-nums text-slate-900 mt-2">{fmt(k.v)}</p></div><div className={`p-2.5 rounded-xl bg-gradient-to-br ${k.bg} shadow-sm`}><k.ic className="w-4 h-4 text-white"/></div></div>
              {k.p&&<div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${up?"text-emerald-600":"text-rose-500"}`}>{up?<TrendingUp className="w-3 h-3"/>:<TrendingDown className="w-3 h-3"/>}%{Math.abs(parseFloat(d))} geçen aya göre</div>}
            </CardContent></Card>
          )})}
        </div>

        {/* BANK PANEL */}
        <BankPanel />

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6"><CardTitle className="text-sm font-serif font-bold text-slate-900">Gelir & Gider Trendi</CardTitle><p className="text-xs text-slate-400 mt-0.5">Son 10 ay performansı</p></CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthly} margin={{top:5,right:20,left:10,bottom:0}}>
                  <defs>
                    <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                    <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                    <linearGradient id="gK" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="ay" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
                  <YAxis tickFormatter={(v:number)=>`₺${v/1000}K`} tick={{fontSize:10,fill:"#94a3b8"}} axisLine={false} tickLine={false} width={48}/>
                  <Tooltip contentStyle={{borderRadius:12,fontSize:11,border:"none",background:"#1e293b",color:"#fff"}}/>
                  <Area type="monotone" dataKey="gelir" name="Gelir" stroke="#10b981" strokeWidth={2} fill="url(#gG)" dot={false}/>
                  <Area type="monotone" dataKey="gider" name="Gider" stroke="#f43f5e" strokeWidth={2} fill="url(#gE)" dot={false}/>
                  <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#f59e0b" strokeWidth={2.5} fill="url(#gK)" dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-5 justify-center mt-1">{[{c:"#10b981",l:"Gelir"},{c:"#f43f5e",l:"Gider"},{c:"#f59e0b",l:"Net Kâr"}].map(i=>(<div key={i.l} className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{background:i.c}}/><span className="text-xs text-slate-500">{i.l}</span></div>))}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6"><CardTitle className="text-sm font-serif font-bold text-slate-900">Gider Dağılımı</CardTitle></CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart><Pie data={expData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>{expData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip contentStyle={{borderRadius:12,fontSize:11,border:"none",background:"#1e293b",color:"#fff"}}/></PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2 px-1">{expData.map(e=>(<div key={e.name} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{background:e.color}}/><span className="text-xs text-slate-600">{e.name}</span></div><span className="text-xs font-mono font-semibold text-slate-800">{fmt(e.amt)}</span></div>))}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6"><CardTitle className="text-sm font-serif font-bold text-slate-900">Haftalık Nakit Akışı</CardTitle></CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={cashflow} barSize={28}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/><XAxis dataKey="gun" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis tickFormatter={(v:number)=>`₺${v/1000}K`} tick={{fontSize:10,fill:"#94a3b8"}} axisLine={false} tickLine={false} width={40}/><Tooltip contentStyle={{borderRadius:12,fontSize:11,border:"none",background:"#1e293b",color:"#fff"}}/><Bar dataKey="g" name="Nakit" radius={[6,6,0,0]}>{cashflow.map((_,i)=><Cell key={i} fill={i===5?"#f59e0b":"#1e293b"}/>)}</Bar></BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CARİ HESAPLAR */}
          <Card className="xl:col-span-2 border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-6 flex flex-row items-center justify-between"><CardTitle className="text-sm font-serif font-bold text-slate-900">Cari Hesaplar</CardTitle><Badge variant="outline" className="text-[10px] border-slate-200">4 hesap</Badge></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">{cari.map(c=>(<div key={c.name} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/60 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${c.bal>0?"bg-emerald-50 text-emerald-700":"bg-rose-50 text-rose-600"}`}>{c.bal>0?"B":"A"}</div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800">{c.name}</p><div className="flex items-center gap-2 mt-0.5"><Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${c.type==="MÜŞTERİ"?"bg-indigo-100 text-indigo-700":"bg-amber-100 text-amber-700"}`}>{c.type}</Badge><span className="text-[10px] text-slate-400">Son: {c.last}</span></div></div>
                <div className="text-right"><p className={`text-sm font-bold font-mono tabular-nums ${c.bal>0?"text-emerald-600":"text-rose-500"}`}>{c.bal>0?"+":""}{fmt(c.bal)}</p><p className="text-[10px] text-slate-400">{c.bal>0?"Bize borçlu":"Borcumuz"}</p></div>
              </div>))}</div>
            </CardContent>
          </Card>
        </div>

        {/* SON İŞLEMLER + BEKLEYEN */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <Card className="xl:col-span-3 border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-6"><CardTitle className="text-sm font-serif font-bold text-slate-900">Son İşlemler</CardTitle></CardHeader>
            <CardContent className="p-0"><div className="divide-y divide-slate-100">{txList.map(tx=>(<div key={tx.id} className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50/60 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.t==="IN"?"bg-emerald-50":"bg-rose-50"}`}>{tx.t==="IN"?<ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600"/>:<ArrowUpRight className="w-3.5 h-3.5 text-rose-500"/>}</div>
              <div className="flex-1 min-w-0"><p className="text-xs font-medium text-slate-800 truncate">{tx.d}</p><div className="flex items-center gap-2 mt-0.5"><span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{tx.tag}</span><span className="text-[10px] text-slate-400">{tx.dt}</span>{tx.s==="WAIT"&&<span className="text-[10px] text-amber-600 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5"/>Bekliyor</span>}</div></div>
              <p className={`text-sm font-bold font-mono tabular-nums ${tx.t==="IN"?"text-emerald-600":"text-rose-500"}`}>{tx.t==="IN"?"+":"-"}{fmt(tx.a)}</p>
            </div>))}</div></CardContent>
          </Card>

          <Card className="xl:col-span-2 border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-6"><CardTitle className="text-sm font-serif font-bold text-slate-900">Bekleyen Tahsilatlar</CardTitle></CardHeader>
            <CardContent className="p-0"><div className="divide-y divide-slate-100">{pend.map(p=>(<div key={p.id} className={`px-5 py-3.5 ${p.late?"bg-rose-50/40":""}`}>
              <div className="flex items-start justify-between"><div className="flex items-start gap-2.5">{p.late?<AlertCircle className="w-4 h-4 text-rose-500 mt-0.5"/>:<Clock className="w-4 h-4 text-amber-500 mt-0.5"/>}<div><p className="text-sm font-semibold text-slate-800">{p.c}</p><div className="flex items-center gap-2 mt-1"><Badge variant="outline" className={`text-[10px] border-0 px-1.5 py-0 ${p.tp==="B2B"?"bg-indigo-100 text-indigo-700":"bg-slate-100 text-slate-600"}`}>{p.tp}</Badge><span className={`text-[10px] font-semibold ${p.late?"text-rose-600":"text-slate-500"}`}>Son: {p.d}</span></div></div></div>
              <div className="text-right"><p className="text-base font-black font-mono tabular-nums text-slate-900">{fmt(p.a)}</p><Button size="sm" variant="outline" className="text-[10px] h-6 mt-1 border-slate-300">Tahsil Et</Button></div></div>
            </div>))}</div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
