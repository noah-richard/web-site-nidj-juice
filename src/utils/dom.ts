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

/**
 * Sanitizes rich HTML content to prevent Cross-Site Scripting (XSS).
 * Strips script tags, iframe/embed elements, javascript: links, and inline on* event handlers.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(dirty, 'text/html');

  // Remove dangerous tags
  const blockedTags = ['script', 'iframe', 'object', 'embed', 'form', 'base', 'link', 'meta'];
  for (const tag of blockedTags) {
    const elements = doc.querySelectorAll(tag);
    elements.forEach((el) => el.remove());
  }

  // Remove inline event handlers (on*) and dangerous href/src attributes
  const allElements = doc.querySelectorAll('*');
  allElements.forEach((el) => {
    const attrs = Array.from(el.attributes);
    for (const attr of attrs) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      // Block all on* attributes (onclick, onerror, onload, onmouseover, etc.)
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }

      // Block javascript: or vbscript: in href/src
      if ((name === 'href' || name === 'src' || name === 'action') && (value.startsWith('javascript:') || value.startsWith('vbscript:'))) {
        el.removeAttribute(attr.name);
      }
    }
  });

  return doc.body.innerHTML;
}

/**
 * Safely escapes characters in a plain-text string for safe interpolation into HTML.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
