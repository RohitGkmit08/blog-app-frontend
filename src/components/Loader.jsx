export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <span style={{ display: "inline-block", marginBottom: 12 }}>Loading...</span>
      <div
        style={{
          width: 36,
          height: 36,
          border: "3px solid #d1d5db",
          borderTopColor: "#111827",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>
        {`@keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }`}
      </style>
    </div>
  );
}