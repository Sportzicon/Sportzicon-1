import { useRef, useEffect, useState, useCallback } from 'react';

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 6);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
    }
  }, []);

  const scrollByDirection = useCallback((direction: 'left' | 'right', amount = 320) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  }, [checkScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    const onMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking interactive buttons or inputs
      const target = e.target as HTMLElement;
      if (target.closest('button, input, a, select, textarea')) {
        return;
      }
      isDragging.current = true;
      hasMoved.current = false;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      if (Math.abs(walk) > 4) {
        hasMoved.current = true;
      }
      el.scrollLeft = scrollLeftStart.current - walk;
      checkScroll();
    };

    const onMouseUp = () => {
      isDragging.current = false;
      if (el) {
        el.style.cursor = '';
        el.style.removeProperty('user-select');
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  return { scrollRef, canScrollLeft, canScrollRight, scrollByDirection, checkScroll, hasMoved };
}
