import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import OpenAI from 'openai';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post(
  '/virtual-staging/preview',
  upload.single('image'),
  async (req, res) => {
    try {
      const { style = 'Mediterranean contemporary' } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'No se recibió imagen' });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'API key no configurada' });
      }

      /* ─────────────────────────────────────
         🖼️ 1. Preparar imagen (más ligera)
      ───────────────────────────────────── */
      const imageBuffer = await sharp(req.file.buffer)
        .resize(768, 768, { fit: 'inside' }) // 🔑 CLAVE
        .png()
        .toBuffer();

      const imageBase64 = imageBuffer.toString('base64');

      /* ─────────────────────────────────────
         👀 2. ANÁLISIS VISUAL (MÁS PRECISO Y CORTO)
      ───────────────────────────────────── */
      const analysisResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are an interior designer describing a real space factually, without creativity.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `
Describe this interior space so it can be recreated visually with minimal changes.
Focus on layout, proportions, camera angle, light, walls, floor and windows.
Describe furniture only by position and size.
Be concise and factual.
`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 220, // 🔑 MÁS RÁPIDO
      });

      const spaceDescription =
        analysisResponse.choices[0].message.content;

      /* ─────────────────────────────────────
         🎨 3. GENERAR IMAGEN (CAMBIOS MÍNIMOS)
      ───────────────────────────────────── */
      const imagePrompt = `
Generate a photorealistic interior image strictly based on this description:

${spaceDescription}

Recreate the same room, same proportions and same camera angle.
Make the smallest possible changes.

Only update:
- furniture style
- colors
- materials
- textiles
- decoration

Do NOT change layout, room size, windows, walls or camera angle.

Style: ${style}
Natural light. Realistic interior photography.
Not illustration. Not 3D render.
`;

      const imageResponse = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: imagePrompt,
        size: '1024x1024',
      });

      const generatedImageBase64 =
        imageResponse.data[0].b64_json;

      /* ─────────────────────────────────────
         ✅ 4. RESPUESTA
      ───────────────────────────────────── */
      return res.json({
        previewImageUrl: `data:image/png;base64,${generatedImageBase64}`,
      });

    } catch (error) {
      console.error('🔥 VIRTUAL STAGING ERROR 👉', error);
      return res.status(500).json({
        error: 'Error al generar imagen inspiracional',
      });
    }
  }
);

export default router;