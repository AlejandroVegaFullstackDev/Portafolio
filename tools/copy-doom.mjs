// Copia el binario de Doom (paquete wasm-doom) a public/games/ antes de dev/build.
// No se versiona en git: pesa 6,8 MB y sale de node_modules en cada instalación.
// Licencia: el motor de Doom es GPL-2.0 (id Software); el WAD incluido es el
// episodio shareware, que id permitió redistribuir sin modificar.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const from = 'node_modules/wasm-doom/wasm/doom.wasm';
const to = 'public/games/doom.wasm';
if (!existsSync(from)) {
  console.warn('[doom] no está wasm-doom en node_modules; la pestaña Doom no podrá cargar.');
  process.exit(0);
}
mkdirSync('public/games', { recursive: true });
copyFileSync(from, to);
console.log('[doom] doom.wasm listo en', to);
