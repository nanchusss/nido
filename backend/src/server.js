import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

a
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("🧨 ENV COMPLETO:", process.env);

  console.log(`Server corriendo en puerto ${PORT}`);
});