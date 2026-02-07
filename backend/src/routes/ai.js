import express from 'express';
import OpenAI from 'openai';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ========================= */
/* MEJORAR DESCRIPCIÓN TEXTO */
/* ========================= */

router.post('/improve-description', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Texto inválido' });
    }

    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: `Mejorá la redacción del siguiente texto inmobiliario sin inventar información ni agregar características que no estén explícitas.

Texto:
${text}`,
    });

    const result =
      response.output?.[0]?.content?.find(
        (c) => c.type === 'output_text'
      )?.text;

    if (!result) {
      return res.status(500).json({
        error: 'No se pudo obtener texto de la IA',
      });
    }

    return res.json({ result });

  } catch (error) {
    console.error('AI TEXT ERROR 👉', error);
    return res.status(500).json({
      error: 'Error interno al mejorar texto',
    });
  }
});

/* ========================= */
/* DECORACIÓN VIRTUAL IMAGEN */
/* ========================= */

router.post(
  '/virtual-staging/preview',
  upload.single('image'),
  async (req, res) => {
    try {
      const { style } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'No se recibió imagen' });
      }

      // ✅ convertir a data URL (FORMA CORRECTA)
      const base64 = req.file.buffer.toString('base64');
      const imageUrl = `data:image/png;base64,${base64}`;

      const prompt = `
Interior redesign of the same room shown in the image.
Keep the exact architecture, walls, windows and proportions.
Do not add or remove rooms or walls.
Only change furniture and decoration.
Style: ${style}.
Photorealistic interior design, natural light.
`;

      const response = await openai.responses.create({
        model: 'gpt-image-1',
        input: [
          {
            role: 'user',
            content: [
              { type: 'input_text', text: prompt },
              {
                type: 'input_image',
                image_url: imageUrl,
              },
            ],
          },
        ],
      });

      const imageOutput =
        response.output?.[0]?.content?.find(
          (c) => c.type === 'output_image'
        );

      if (!imageOutput?.image_base64) {
        console.error('NO IMAGE OUTPUT 👉', response.output);
        return res.status(500).json({
          error: 'No se pudo generar la imagen',
        });
      }

      const previewImageUrl = `data:image/png;base64,${imageOutput.image_base64}`;

      return res.json({ previewImageUrl });

    } catch (error) {
      console.error(
        'AI IMAGE ERROR FULL 👉',
        JSON.stringify(error, null, 2)
      );

      return res.status(500).json({
        error: 'Error al generar imagen',
      });
    }
  }
);

export default router;