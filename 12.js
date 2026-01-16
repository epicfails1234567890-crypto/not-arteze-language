// ejecutor.js
const fs = require("fs");
const prompt = require("prompt-sync")();

// Traductor extendido de "JS en español"
function traducir(codigo) {
  return codigo
    // Variables y constantes
    .replace(/\bvariable\b/g, "let")
    .replace(/\bconstante\b/g, "const")

    // Control de flujo
    .replace(/\bsino si\b/g, "else if")
    .replace(/\bsino\b/g, "else")
    .replace(/\bsi\s+([^{]+)\{/g, "if ($1){")
    .replace(/\bmientras\s+([^{]+)\{/g, "while ($1){")
    .replace(/\bpara\s+([^{]+)\{/g, "for ($1){")
    .replace(/\bcontinuar\b/g, "continue")
    .replace(/\bfin\b/g, "break")

    // Funciones
    .replace(/\bfuncion\b/g, "function")
    .replace(/\bretornar\b/g, "return")
    // Funciones flecha
    .replace(/\bfuncion\s*\((.*?)\)\s*=>/g, "($1) =>")

    // Booleanos
    .replace(/\bverdad\b/g, "true")
    .replace(/\bfalso\b/g, "false")

    // Entrada/salida
    .replace(/\bpregunta\((.*?)\)/g, "prompt($1)")
    .replace(/\bimprimir\((.*?)\)/g, "console.log($1)")

    // Comparaciones
    .replace(/\bes igual a\b/g, "==")
    .replace(/\bes distinto de\b/g, "!=")
    .replace(/\bmayor o igual que\b/g, ">=")
    .replace(/\bmenor o igual que\b/g, "<=")
    .replace(/\bmayor que\b/g, ">")
    .replace(/\bmenor que\b/g, "<")

    // Operadores lógicos (con espacios para evitar colisiones)
    .replace(/\s+y\s+/g, " && ")
    .replace(/\s+o\s+/g, " || ")
    .replace(/\bno\s+/g, "!")

    // Tipos y conversiones
    .replace(/\bnumero\b/g, "Number")
    .replace(/\btexto\b/g, "String")
    .replace(/\bbooleano\b/g, "Boolean")
    .replace(/\bentero\b/g, "parseInt")
    .replace(/\bdecimal\b/g, "parseFloat")

    // Estructuras
    .replace(/\barreglo\b/g, "Array")
    .replace(/\bdiccionario\b/g, "Object")
    .replace(/\blongitud\b/g, "length")

    // Métodos de arrays
    .replace(/\bagregar\b/g, "push")
    .replace(/\bquitar\b/g, "pop")
    .replace(/\bprimero\b/g, "[0]")
    .replace(/\bultimo\b/g, "[length-1]")
}

// Ejecuta código traducido
function ejecutar(codigoEsp) {
  const codigoJS = traducir(codigoEsp);
  try {
    return eval(codigoJS);
  } catch (err) {
    console.error("⚠️ Error en tu código:", err.message);
  }
}

// Si hay archivo, lo ejecuta primero
const archivo = process.argv[2];
if (archivo) {
  const codigoEsp = fs.readFileSync(archivo, "utf8");
  ejecutar(codigoEsp);
}

// Prompt interactivo
while (true) {
  const linea = prompt("JS-ES> ");
  if (!linea) break;
  const resultado = ejecutar(linea);
  if (resultado !== undefined) console.log("=>", resultado);
}
