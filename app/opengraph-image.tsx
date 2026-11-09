import { ImageResponse } from "next/og";
import { projectsCount } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = `${site.name} — Project showcase by V3i Technology.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0d0e22 0%, #07080e 52%, #04050a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-120px",
            bottom: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "linear-gradient(140deg, rgba(123,97,255,0.5) 0%, rgba(63,140,255,0.12) 60%, rgba(4,5,10,0) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "140px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(140deg, #7b61ff, #3f8cff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            V3
          </div>
          <div style={{ display: "flex", fontSize: "22px", letterSpacing: "0.02em", color: "rgba(255,255,255,0.82)" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "20px", letterSpacing: "0.32em", color: "#5df2d6" }}>
            PROJECT SHOWCASE BY V3I TECHNOLOGY
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "22px",
              fontSize: "86px",
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              maxWidth: "980px",
            }}
          >
            We engineer digital experiences.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "26px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>{projectsCount} live platforms</div>
          <div style={{ display: "flex" }}>Project showcase</div>
          <div style={{ display: "flex" }}>{site.officialDomain} · official site</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
