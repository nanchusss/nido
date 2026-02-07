import express from 'express';
import multer from 'multer';
import sharp from 'sharp';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const SDXL_SIZE = 1024;

router.post(
  '/virtual-staging/preview',
  upload.single('image'),
  async (req, res) => {
    try {
      console.log('REQ BODY 👉', req.body);
      console.log('REQ FILE 👉', req.file);

      const { style = 'Mediterranean contemporary' } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'No se recibió imagen' });
      }

      if (!process.env.STABILITY_API_KEY) {
        return res.status(500).json({ error: 'API key no configurada' });
      }

      /* 🖼️ 1. Forzar tamaño SDXL (válido y estable) */
      const resizedBuffer = await sharp(req.file.buffer)
        .resize(SDXL_SIZE, SDXL_SIZE, {
          fit: 'cover',
          position: 'centre',
        })
        .png()
        .toBuffer();

      /* 📦 2. FormData */
      const formData = new FormData();
      const imageBlob = new Blob([resizedBuffer], { type: 'image/png' });

      formData.append('init_image', imageBlob, 'image.png');

      /* ✅ PROMPT PRINCIPAL — REDECORAR, NO RECONSTRUIR */
      formData.append(
        'text_prompts[0][text]',
        `
Redecorate the existing real interior shown in the photo.
This is the SAME room and the SAME photo.

Preserve the original architecture exactly:
walls, windows, doors, ceiling height, floor layout and proportions.
Do NOT change room structure, geometry or camera angle.

Only change furniture, decor, colors, materials, textiles and lighting fixtures.
Interior redesign only, no remodeling.

Style: ${style}.
Natural materials (wood, linen, ceramic, stone).
Soft Mediterranean light, realistic shadows.
Photorealistic interior photography.
`
      );
      formData.append('text_prompts[0][weight]', '1');

      /* 🚫 PROMPT NEGATIVO — EVITAR INVENCIONES */
      formData.append(
        'text_prompts[1][text]',
        `
new room, different architecture, altered layout,
extra windows, different ceiling, changed walls,
new perspective, wide angle, different camera,
remodeling, reconstruction, open plan,
3d render, illustration, cartoon, painting,
fantasy, surreal, distorted furniture
`
      );
      formData.append('text_prompts[1][weight]', '-1');

      /* ⚙️ PARÁMETROS FINOS PARA IMAGE-TO-IMAGE */
      formData.append('image_strength', '0.25'); // 🔑 no inventa
      formData.append('cfg_scale', '6.5');        // sigue el texto sin romper la foto
      formData.append('samples', '1');

      /* 🚀 STABILITY SDXL */
      const response = await fetch(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ STABILITY ERROR 👉', errorText);
        return res.status(500).json({
          error: 'Error al generar imagen IA',
          details: errorText,
        });
      }

      const result = await response.json();

      if (!result.artifacts?.[0]?.base64) {
        return res.status(500).json({
          error: 'Respuesta inválida de Stability',
        });
      }

      console.log('✅ Imagen IA generada correctamente');

      return res.json({
        previewImageUrl: `data:image/png;base64,${result.artifacts[0].base64}`,
      });

    } catch (error) {
      console.error('🔥 AI IMAGE ERROR FULL 👉', error);
      return res.status(500).json({ error: 'Error al generar imagen IA' });
    }
  }
);

export default router;