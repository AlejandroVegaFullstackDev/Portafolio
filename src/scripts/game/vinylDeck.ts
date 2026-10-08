// Tocadiscos de la última canción que te comiste: la funda entra volteándose y el
// vinilo (con la carátula de etiqueta) sale de ella y gira mientras se juega o suena.
import { canAnimate } from '../fx/env';

interface DeckTrack { title: string; artist: string; cover: string | null; art?: string | null; url: string }

export class VinylDeck {
  private sleeve: HTMLElement;
  private art: HTMLImageElement;
  private label: HTMLElement;
  private title: HTMLAnchorElement;
  private artist: HTMLElement;

  constructor(private el: HTMLElement) {
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    this.sleeve = q('[data-deck-sleeve]');
    this.art = q<HTMLImageElement>('[data-deck-art]');
    this.label = q('[data-deck-label]');
    this.title = q<HTMLAnchorElement>('[data-deck-title]');
    this.artist = q('[data-deck-artist]');
  }

  show(t: DeckTrack) {
    const src = t.art || t.cover;
    this.el.classList.add('has-track');
    if (src) { this.art.src = src; this.art.hidden = false; this.label.style.backgroundImage = `url("${src.replace(/"/g, '%22')}")`; }
    else { this.art.hidden = true; this.label.style.backgroundImage = ''; }
    this.title.textContent = t.title;
    this.title.href = t.url;
    this.artist.textContent = t.artist;
    if (!canAnimate()) return;
    this.sleeve.animate([
      { transform: 'rotateY(-110deg) translateZ(30px)', opacity: 0 },
      { transform: 'rotateY(-18deg)', opacity: 1 },
    ], { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)' });
    this.el.classList.remove('slide');
    void this.el.offsetWidth; // reinicia la animación de salida del vinilo
    this.el.classList.add('slide');
  }

  reset() {
    this.el.classList.remove('has-track', 'slide');
    this.art.hidden = true;
    this.label.style.backgroundImage = '';
    this.title.textContent = '—';
    this.title.removeAttribute('href');
    this.artist.textContent = '';
  }
}
