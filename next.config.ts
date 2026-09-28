import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cv",
        destination: "/joao-baran-cv.pdf",
        // Temporário (Spec §14): quando houver uma versão em inglês em /cv/en,
        // revisitar se este continua devendo ser temporário.
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
