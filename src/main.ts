/* ==========================================================================
   NIDJ JUICE — APPLICATION ENTRY POINT (TYPESCRIPT STRICT)
   ========================================================================== */

import './style.css';
import { App } from './app/App';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.querySelector<HTMLDivElement>('#app');
  if (appRoot) {
    const app = new App(appRoot);
    app.init();
  } else {
    console.error('Nidj Juice: #app root element not found.');
  }
});
