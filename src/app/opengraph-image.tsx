import { ImageResponse } from "next/og";

export const alt = "Role Ready — free job-search tools and application tracker";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f6f4ee",
          color: "#182424",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: "#275d4b",
              color: "#fffdf8",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            r
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700 }}>role ready</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.08 }}>
            A calmer job search.
          </div>
          <div style={{ fontSize: "30px", color: "#4d5b56" }}>
            Free tracker · Editable templates · No account
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "8px",
            background: "#ffcf69",
          }}
        />
      </div>
    ),
    size,
  );
}
