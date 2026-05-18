"use client"
interface Props { settings: Record<string, any> }
export default function DividerSection({ settings }: Props) {
  const { style = "solid", color = "#E5E0D8", thickness = 1, paddingY = 24 } = settings
  return (
    <div style={{ paddingTop: paddingY, paddingBottom: paddingY, paddingLeft: 48, paddingRight: 48 }}>
      {style === "ornament" ? (
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t" style={{ borderColor: color, borderWidth: thickness }} />
          <span className="text-2xl" style={{ color }}>❧</span>
          <div className="flex-1 border-t" style={{ borderColor: color, borderWidth: thickness }} />
        </div>
      ) : (
        <hr
          style={{
            borderStyle: style,
            borderColor: color,
            borderTopWidth: thickness,
          }}
        />
      )}
    </div>
  )
}
