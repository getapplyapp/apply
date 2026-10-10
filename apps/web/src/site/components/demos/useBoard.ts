import { useCallback, useEffect, useRef, useState } from 'react';
import type { BoardDrag, BoardViewProps } from './BoardView';
import { BOARD_COLUMNS, STATUS_LABEL, type DemoApplication, type DemoStatus } from './data';

type Press = { id: string; sx: number; sy: number; ox: number; oy: number; width: number; active: boolean };

/**
 * Board behaviour shared by the hero and the Applications views: pointer drag between columns (mouse and pen;
 * touch uses the card menu so the page still scrolls), a per-card "Move to" menu, arrow keys on the menu button,
 * and a polite announcement after each move.
 */
export function useBoard(initial: DemoApplication[], root: React.RefObject<HTMLElement | null>) {
  const [apps, setApps] = useState(initial);
  const [mobileColumn, setMobileColumn] = useState<DemoStatus>('waiting');
  const [drag, setDrag] = useState<BoardDrag | null>(null);
  const [over, setOver] = useState<DemoStatus | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [landed, setLanded] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const appsRef = useRef(apps);
  const focusAfter = useRef<string | null>(null);
  const press = useRef<Press | null>(null);

  useEffect(() => {
    appsRef.current = apps;
    const id = focusAfter.current;
    if (!id) return;
    focusAfter.current = null;
    root.current?.querySelector<HTMLButtonElement>(`[data-menu-button="${id}"]`)?.focus();
  }, [apps, root]);

  // Phones: keep the selected column's chip in view.
  useEffect(() => {
    const chip = root.current?.querySelector<HTMLElement>(`[data-column-chip="${mobileColumn}"]`);
    const strip = chip?.parentElement;
    if (!chip || !strip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' });
  }, [mobileColumn, root]);

  useEffect(() => {
    if (!landed) return;
    const t = window.setTimeout(() => setLanded(null), 900);
    return () => window.clearTimeout(t);
  }, [landed]);

  // A click outside the open menu closes it.
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest('[data-card]');
      if (card?.getAttribute('data-card') !== menu) setMenu(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [menu]);

  const move = useCallback((id: string, to: DemoStatus, options: { focus?: boolean; quiet?: boolean } = {}) => {
    const app = appsRef.current.find((a) => a.id === id);
    if (!app || app.status === to) return;
    if (options.focus) focusAfter.current = id;
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: to } : a)));
    setLanded(id);
    setMenu(null);
    if (!options.quiet) {
      setMobileColumn(to);
      setMessage(`${app.company.name} moved to ${STATUS_LABEL[to]}.`);
    }
  }, []);

  const columnAt = (x: number, y: number): DemoStatus | null => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-col]');
    if (!el || !root.current?.contains(el)) return null;
    return (el.dataset.col as DemoStatus) ?? null;
  };

  const onPointerDown = useCallback<NonNullable<BoardViewProps['onPointerDown']>>(
    (e, id) => {
      if (e.button !== 0 || e.pointerType === 'touch') return;
      if ((e.target as Element).closest('button')) return;
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      press.current = { id, sx: e.clientX, sy: e.clientY, ox: e.clientX - rect.left, oy: e.clientY - rect.top, width: rect.width, active: false };

      const onMove = (ev: PointerEvent) => {
        const p = press.current;
        if (!p) return;
        if (!p.active && Math.hypot(ev.clientX - p.sx, ev.clientY - p.sy) < 5) return;
        p.active = true;
        setMenu(null);
        setDrag({ id: p.id, x: ev.clientX - p.ox, y: ev.clientY - p.oy, width: p.width });
        setOver(columnAt(ev.clientX, ev.clientY));
      };
      const onUp = (ev: PointerEvent) => {
        const p = press.current;
        press.current = null;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        setDrag(null);
        setOver(null);
        if (!p?.active || ev.type === 'pointercancel') return;
        const to = columnAt(ev.clientX, ev.clientY);
        if (to) move(p.id, to);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnAt only reads the root ref
    [move],
  );

  const onMenuKeyDown = useCallback<NonNullable<BoardViewProps['onMenuKeyDown']>>(
    (e, id) => {
      if (e.key === 'Escape') {
        setMenu(null);
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const app = appsRef.current.find((a) => a.id === id);
      if (!app) return;
      const i = BOARD_COLUMNS.indexOf(app.status) + (e.key === 'ArrowRight' ? 1 : -1);
      if (i < 0 || i >= BOARD_COLUMNS.length) return;
      e.preventDefault();
      move(id, BOARD_COLUMNS[i], { focus: true });
    },
    [move],
  );

  return {
    apps,
    move,
    message,
    view: {
      apps,
      mobileColumn,
      drag,
      over,
      menu,
      landed,
      onPointerDown,
      onMenuKeyDown,
      onToggleMenu: (id: string) => setMenu((cur) => (cur === id ? null : id)),
      onMove: (id: string, to: DemoStatus) => move(id, to, { focus: true }),
      onMobileColumn: setMobileColumn,
    } satisfies Omit<BoardViewProps, 'idPrefix'>,
  };
}
