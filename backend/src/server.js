import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

app.listen(5050, () => {
  console.log("🧨 ENV COMPLETO:", process.env);

  console.log("Server corriendo en puerto 5050");
});
