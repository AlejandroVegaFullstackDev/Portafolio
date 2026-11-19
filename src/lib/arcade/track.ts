// La canción del juego: la arma /api/playlist-snake (servidor) y la consumen el Snake,
// Bloques, Doom, el tocadiscos y el reproductor de previews (cliente). Solo tipos.
export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string | null;      // carátula chica (comida del Snake)
  art?: string | null;       // carátula grande (vinilo)
  uri: string;
  url: string;               // enlace a Spotify
  preview: string | null;    // preview de 30 s (Deezer)
}
