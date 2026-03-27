import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Often required for ImageResponse in some environments or just leave default.
// Next 14 standard usage of og:
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "Guest";
    const ticketId = searchParams.get("ticketId") || "N/A";
    const tickets = searchParams.get("tickets") || "1";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#F9F8F5", // Ethos cream
            fontFamily: "sans-serif",
            padding: "40px 60px",
            borderTop: "20px solid #8c9c74", // Ethos green accent
            position: "relative",
          }}
        >
          {/* Background pattern or flair */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "100%",
              height: "200%",
              backgroundColor: "#916b5a",
              opacity: 0.05,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", zIndex: 10 }}>
            <h1 style={{ fontSize: 60, fontWeight: 800, color: "#292524", margin: 0, letterSpacing: "-0.05em" }}>
              Digital Ticket
            </h1>
            <p style={{ fontSize: 28, color: "#78716c", marginTop: 10 }}>
              Ethos Clinical Conference 2026
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "auto",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 20, color: "#a8a29e", textTransform: "uppercase", fontWeight: 600 }}>
                  Attendee
                </span>
                <span style={{ fontSize: 36, color: "#44403c", fontWeight: 700 }}>
                  {name}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                <span style={{ fontSize: 20, color: "#a8a29e", textTransform: "uppercase", fontWeight: 600 }}>
                  Number of Tickets
                </span>
                <span style={{ fontSize: 30, color: "#44403c", fontWeight: 700 }}>
                  {tickets}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div
                style={{
                  padding: "10px 20px",
                  border: "2px dashed #d6d3d1",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#57534e",
                  letterSpacing: "0.1em",
                }}
              >
                {ticketId}
              </div>
              <p style={{ fontSize: 18, color: "#a8a29e", marginTop: 15 }}>
                Present at registration desk
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
