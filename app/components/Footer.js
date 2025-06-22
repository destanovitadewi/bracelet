import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
        padding: "1rem 0",
        textAlign: "center",
        fontSize: "0.95rem",
        color: "#6c757d",
        marginTop: "2rem",
      }}
    >
      © {new Date().getFullYear()} Gelangku &mdash; All rights reserved.
    </footer>
  );
}