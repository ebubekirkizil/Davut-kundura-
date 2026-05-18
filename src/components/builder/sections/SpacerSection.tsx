"use client"
interface Props { settings: Record<string, any> }
export default function SpacerSection({ settings }: Props) {
  const { height = 60, bgColor = "transparent" } = settings
  return <div style={{ height, backgroundColor: bgColor === "transparent" ? undefined : bgColor }} />
}
