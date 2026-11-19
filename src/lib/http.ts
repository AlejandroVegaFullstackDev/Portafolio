// Respuesta JSON de las rutas /api/*. Un solo helper para todas: tipo de contenido,
// caché explícita (por defecto, nada) y nosniff.
export function json(data: unknown, status = 200, cache = 'no-store, max-age=0') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff' },
  });
}
