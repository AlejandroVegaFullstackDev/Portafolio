// Anotar el puntaje del Snake en el ranking global: pide el nombre la primera vez,
// lo envía con la repetición de la partida y muestra el resultado. También maneja
// la tarjeta "jugando como <nombre>" y su edición. controller.ts decide cuándo.
import { tr } from '../../../lib/client/language';
import type { Move } from '../../../lib/arcade/snake/replay';
import { validName, type Ranking } from './ranking-client';
import type { SnakeUi } from './ui';

/** La partida que se va a anotar. `runId` cambia con cada partida nueva. */
export interface RunInfo { runId: number; moves: Move[]; ticks: number }

export function bindScoreForm(root: HTMLElement, ui: SnakeUi, ranking: Ranking, run: () => RunInfo) {
  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const form = $<HTMLFormElement>('[data-lb-form]');
  const nameInput = $<HTMLInputElement>('[data-lb-name]');
  const lbMsg = $('[data-lb-msg]');
  const meBox = $('[data-me]'), meName = $('[data-me-name]'), meForm = $<HTMLFormElement>('[data-me-form]'), meInput = $<HTMLInputElement>('[data-me-input]');
  const showMe = (n: string) => { meBox.hidden = !n; meName.textContent = n; };
  ranking.onName = showMe;
  showMe(ranking.name);

  /** Muestra el formulario de nombre en lugar de los botones de fin de partida. */
  function ask(value: string, msg: string, focus: boolean) {
    ui.result('');
    ui.overActions.hidden = true;
    form.hidden = false;
    lbMsg.textContent = msg;
    nameInput.value = value;
    if (focus) requestAnimationFrame(() => nameInput.focus({ preventScroll: true }));
  }

  async function send(name: string) {
    const { runId: id, moves, ticks } = run();
    ui.result(tr('Anotando…', 'Saving…'));
    const res = await ranking.submit(name, moves, ticks);
    if (id !== run().runId) return; // ya se está jugando otra partida: no pisar su pantalla
    if ('reason' in res && res.reason === 'name') {
      ask(name, tr('Ese nombre no va. Prueba otro (2–16 letras o números).', 'That name won’t work. Try another (2–16 letters or numbers).'), false);
      return;
    }
    form.hidden = true;
    ui.overActions.hidden = false;
    if (res.ok && res.rank) ui.result(tr(`en el ranking global · como ${name}`, `in the global ranking · as ${name}`), `#${res.rank}`);
    else if (res.ok) ui.result(tr(`Anotado como ${name}`, `Saved as ${name}`));
    else ui.result(tr('No se pudo anotar esta vez.', 'Couldn’t save it this time.'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = nameInput.value.trim();
    if (!validName(n)) { lbMsg.textContent = tr('Usa de 2 a 16 letras o números.', 'Use 2–16 letters or numbers.'); return; }
    send(n);
  });
  $('[data-lb-skip]').addEventListener('click', () => {
    form.hidden = true;
    ui.overActions.hidden = false;
    ui.result(tr('Sin anotar. Te lo vuelvo a preguntar la próxima.', 'Not saved. I’ll ask again next time.'));
    $<HTMLButtonElement>('[data-again]').focus({ preventScroll: true });
  });
  $('[data-me-edit]').addEventListener('click', () => { meForm.hidden = false; meInput.value = ranking.name; meInput.focus(); });
  meForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validName(meInput.value)) return;
    ranking.name = meInput.value;
    meForm.hidden = true;
  });

  return {
    /** Al terminar una partida con puntaje: anota con el nombre guardado o lo pide (una sola vez). */
    submitOrAsk() {
      if (ranking.name) return send(ranking.name);
      ask('', '', true); // primera vez en este dispositivo
    },
    hide() { form.hidden = true; },
  };
}
