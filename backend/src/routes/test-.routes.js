import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({
    ok: true,
    message: "Acceso autorizado",
    data: {
      user: req.user,
    },
  });
});

export default router;
