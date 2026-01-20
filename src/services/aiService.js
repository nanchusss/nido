export async function improveDescription(text) {
  // Mock de IA (luego será llamada real al backend)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `✨ Descripción mejorada ✨\n\n${text}\n\nIdeal para quienes buscan calidad de vida, buena ubicación y confort.`
      );
    }, 800);
  });
}
