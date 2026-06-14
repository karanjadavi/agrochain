export default function Spinner({ size = 20, color = "#1a5c2a" }) {
  return (
    <span style={{
      display: "inline-block",
      width: size,
      height: size,
      border: `2.5px solid ${color}22`,
      borderTop: `2.5px solid ${color}`,
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      verticalAlign: "middle",
      marginRight: 8,
    }} />
  )
}
