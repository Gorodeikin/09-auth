export default function Loading() {
  return ( 
    <div style={{
      top: 0, left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      color: "white",
      fontSize: "1.5rem",
    }}>
      Loading, please wait...
    </div>
  ); 
}