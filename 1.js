// ejecutor.js
const fs = require("fs");

// Traductor simple de "JS en español"
function traducir(codigo) {
  return codigo
    .replace(/\bsi\b/g, "if")
    .replace(/\bsino\b/g, "else")
    .replace(/\bmientras\b/g, "while")
    .replace(/\bfuncion\b/g, "function")
    .replace(/\bverdadero\b/g, "true")
    .replace(/\bfalso\b/g, "false")
    .replace(/\bpara\b/g, "for")
    .replace(/\bretornar\b/g, "return")
    .replace(/\bvariable\b/g, "let")
    .replace(/\bconstante\b/g, "const");
}

// Ejecuta el código traducido
function ejecutarArchivo(ruta) {
  const codigoEsp = fs.readFileSync(ruta, "utf8");
  const codigoJS = traducir(codigoEsp);
  console.log("=== Código traducido ===\n" + codigoJS);
  eval(codigoJS);
}

// Uso: node ejecutor.js programa.txt
const archivo = process.argv[2];
if (!archivo) {
  console.error("Debes indicar un archivo .txt");
  process.exit(1);
}
ejecutarArchivo(archivo);
