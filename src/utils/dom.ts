/* ==========================================================================
   NIDJ JUICE — DOM UTILITIES (TYPE-SAFE & ROBUST)
   ========================================================================== */

export function $<T extends HTMLElement = HTMLElement>(selector: string, parent: ParentNode = document): T | null {
  return parent.querySelector<T>(selector);
}

export function $$<T extends HTMLElement = HTMLElement>(selector: string, parent: ParentNode = document): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Record<string, string> = {},
  children: (string | Node)[] = []
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('data-')) {
      el.setAttribute(key, value);
    } else if (key === 'className') {
      el.className = value;
    } else if (key === 'aria-label' || key.startsWith('aria-')) {
      el.setAttribute(key, value);
    } else {
      (el as unknown as Record<string, unknown>)[key] = value;
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }
  return el;
}
