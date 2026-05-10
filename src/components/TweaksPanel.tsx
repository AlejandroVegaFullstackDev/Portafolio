import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'av_tweaks';
const DEFAULTS = {
  theme: 'dark',
  accent: 'crimson',
  font: 'default',
  animations: 'high',
  scanlines: true,
  cursor: true,
};
type Tweaks = typeof DEFAULTS;

function loadTweaks(): Tweaks {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULTS, ...JSON.parse(stored) };
  } catch {}
  return { ...DEFAULTS };
}

function applyTweaks(t: Tweaks) {
  const root = document.documentElement;
  root.setAttribute('data-tweak-theme', t.theme);
  root.setAttribute('data-tweak-accent', t.accent);
  root.setAttribute('data-tweak-font', t.font);
  root.setAttribute('data-tweak-anim', t.animations);
  root.toggleAttribute('data-tweak-noscanlines', !t.scanlines);
  root.toggleAttribute('data-tweak-nocursor', !t.cursor);
}

const PANEL_STYLE = `
.twk-panel{position:fixed;right:16px;bottom:60px;z-index:2147483646;width:280px;
  max-height:calc(100vh - 80px);display:flex;flex-direction:column;
  background:rgba(250,249,247,.92);color:#29261b;
  -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
  border:.5px solid rgba(255,255,255,.6);border-radius:14px;
  box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.28);
  font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
.twk-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 8px 10px 14px;cursor:move;user-select:none}
.twk-hd b{font-size:12px;font-weight:600}
.twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px;line-height:1}
.twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
.twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;scrollbar-width:thin}
.twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:rgba(41,38,27,.45);padding:10px 0 0}
.twk-sect:first-child{padding-top:0}
.twk-row{display:flex;flex-direction:column;gap:5px}
.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
.twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}
.twk-lbl>span:first-child{font-weight:500}
.twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;background:rgba(0,0,0,.06);user-select:none}
.twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
.twk-seg button{position:relative;z-index:1;flex:1;border:0;background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;border-radius:6px;cursor:pointer;padding:4px 6px;line-height:1.2}
.twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;background:rgba(0,0,0,.15);transition:background .15s;cursor:pointer;padding:0}
.twk-toggle[data-on="1"]{background:#34c759}
.twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
.twk-toggle[data-on="1"] i{transform:translateX(14px)}
.twk-field{appearance:none;width:100%;height:26px;padding:0 8px;border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
select.twk-field{padding-right:22px;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");background-repeat:no-repeat;background-position:right 8px center}
`;

function Seg({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const n = options.length;
  const idx = Math.max(0, options.indexOf(value));
  return (
    <div className="twk-seg">
      <div className="twk-seg-thumb" style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`, width: `calc((100% - 4px) / ${n})` }} />
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className="twk-toggle" data-on={value ? '1' : '0'} role="switch" aria-checked={value} onClick={() => onChange(!value)}>
      <i />
    </button>
  );
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<Tweaks>(DEFAULTS);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = loadTweaks();
    setT(loaded);
    applyTweaks(loaded);
  }, []);

  useEffect(() => {
    applyTweaks(t);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch {}
  }, [t]);

  const set = useCallback((key: keyof Tweaks, val: any) => {
    setT((prev) => ({ ...prev, [key]: val }));
  }, []);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      panel.style.right = Math.max(8, startRight - (ev.clientX - sx)) + 'px';
      panel.style.bottom = Math.max(8, startBottom - (ev.clientY - sy)) + 'px';
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <>
      <style>{PANEL_STYLE}</style>
      <button
        className="tweaks-trigger"
        aria-label="Tweaks"
        onClick={() => setOpen((o) => !o)}
        title="Tweaks panel"
      >
        ⚙
      </button>
      {open && (
        <div ref={dragRef} className="twk-panel">
          <div className="twk-hd" onMouseDown={onDragStart}>
            <b>Tweaks</b>
            <button className="twk-x" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="twk-body">
            <div className="twk-sect">Theme</div>
            <div className="twk-row">
              <div className="twk-lbl"><span>Mode</span></div>
              <Seg value={t.theme} options={['dark', 'light']} onChange={(v) => set('theme', v)} />
            </div>
            <div className="twk-row">
              <div className="twk-lbl"><span>Accent</span></div>
              <select className="twk-field" value={t.accent} onChange={(e) => set('accent', e.target.value)}>
                {['crimson', 'amber', 'acid', 'cyan'].map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="twk-sect">Typography</div>
            <div className="twk-row">
              <div className="twk-lbl"><span>Font</span></div>
              <select className="twk-field" value={t.font} onChange={(e) => set('font', e.target.value)}>
                <option value="default">Grotesk + Mono</option>
                <option value="serif">Fraunces + Inter</option>
                <option value="brutal">Bebas + Mono body</option>
              </select>
            </div>
            <div className="twk-sect">Motion</div>
            <div className="twk-row">
              <div className="twk-lbl"><span>Animations</span></div>
              <Seg value={t.animations} options={['high', 'low', 'off']} onChange={(v) => set('animations', v)} />
            </div>
            <div className="twk-row twk-row-h">
              <div className="twk-lbl"><span>Scanlines</span></div>
              <Toggle value={t.scanlines} onChange={(v) => set('scanlines', v)} />
            </div>
            <div className="twk-row twk-row-h">
              <div className="twk-lbl"><span>Custom cursor</span></div>
              <Toggle value={t.cursor} onChange={(v) => set('cursor', v)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
