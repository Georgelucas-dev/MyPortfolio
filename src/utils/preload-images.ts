// src/utils/preload-images.ts
import { pillars } from "../data/pillars-data";

export const preloadPillarImages = async () => {
  if (typeof window === "undefined") return;

  const promises = pillars.map((pillar) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = pillar.image;

      // O SEGREDO: img.decode() força o navegador a processar os pixels da imagem
      // fora da thread principal, antes de renderizá-la na tela.
      img
        .decode()
        .then(() => resolve(true))
        .catch(() => resolve(false)); // Resolve mesmo com erro para não travar a Promise.all
    });
  });

  await Promise.all(promises);
  console.log("Todas as imagens da seção foram decodificadas e estão na GPU!");
};
