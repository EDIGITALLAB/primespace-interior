import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeFaviconService {

  /**
   * Dynamically updates the browser favicon to match the selected theme color.
   * Renders the logo line-art directly in the dynamic theme color on transparent background
   * with bold lines & edge glow for maximum visibility on both dark & light browser tabs.
   * @param color The theme color hex code (e.g. #96053E)
   */
  updateFaviconColor(color: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const themeColor = color || '#96053E';

    // Bold Edge-to-Edge Logo SVG on transparent background
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <filter id="tab-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-color="#FFFFFF" flood-opacity="0.35" />
    </filter>
  </defs>
  <g fill="none" stroke="${themeColor}" stroke-linecap="round" stroke-linejoin="round" filter="url(#tab-glow)">
    <!-- Base Line -->
    <line x1="2" y1="96" x2="98" y2="96" stroke-width="8" />

    <!-- Roof Peak & Chimney -->
    <path d="M 22 28 L 22 17 L 50 2 L 78 17" stroke-width="8" />
    <rect x="73" y="8" width="5" height="12" fill="${themeColor}" stroke="none" />

    <!-- Lower Overhang & Left Wall -->
    <path d="M 6 96 L 6 45 L 35 28" stroke-width="8" />

    <!-- Right Structural Slats -->
    <polygon points="63,34 78,42 78,96 63,96" fill="${themeColor}" stroke="none" />
    <rect x="81" y="49" width="4.5" height="47" rx="1.5" fill="${themeColor}" stroke="none" />
    <rect x="87.5" y="54" width="4.5" height="42" rx="1.5" fill="${themeColor}" stroke="none" />
    <rect x="94" y="59" width="4.5" height="37" rx="1.5" fill="${themeColor}" stroke="none" />

    <!-- Hanging Lamp -->
    <line x1="50" y1="2" x2="50" y2="40" stroke-width="4" />
    <path d="M 40 50 C 40 39 60 39 60 50 Z" fill="${themeColor}" stroke="none" />
    <path d="M 39 50 Q 50 53 61 50 Q 50 48 39 50 Z" fill="#FFFFFF" stroke="none" />

    <!-- Potted Plant (Left) -->
    <polygon points="14,80 16,96 26,96 28,80" fill="${themeColor}" stroke="none" />
    <path d="M 21 80 Q 21 70 21 61" stroke-width="3" />
    <path d="M 21 65 Q 16 47 26 46 Q 27 59 21 65 Z" fill="${themeColor}" stroke="none" />
    <path d="M 21 72 Q 6 62 10 56 Q 19 61 21 72 Z" fill="${themeColor}" stroke="none" />
    <path d="M 21 75 Q 30 67 27 64 Q 21 69 21 75 Z" fill="${themeColor}" stroke="none" />

    <!-- Armchair (Center) -->
    <line x1="32" y1="80" x2="27" y2="96" stroke-width="4.5" />
    <line x1="51" y1="80" x2="56" y2="96" stroke-width="4.5" />
    <path d="M 28 65 C 27 57 32 54 41 54 C 51 54 62 58 62 66 C 62 74 55 78 43 78 C 30 78 28 73 28 65 Z" fill="${themeColor}" stroke="none" />
    <path d="M 31 65 C 32 70 35 73 45 73 C 53 73 57 70 57 67" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

    // Update <link rel="icon" type="image/svg+xml">
    let svgLink = document.querySelector("link[type='image/svg+xml']") as HTMLLinkElement;
    if (!svgLink) {
      svgLink = document.createElement('link');
      svgLink.rel = 'icon';
      svgLink.type = 'image/svg+xml';
      document.head.appendChild(svgLink);
    }
    svgLink.href = svgDataUrl;

    // Render Canvas to generate fallback PNG data URL for PNG icon links
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, 64);
          const pngDataUrl = canvas.toDataURL('image/png');

          const icoLinks = document.querySelectorAll("link[rel='icon']:not([type='image/svg+xml']), link[rel='shortcut icon'], link[rel='apple-touch-icon']");
          icoLinks.forEach((l) => {
            (l as HTMLLinkElement).href = pngDataUrl;
          });
        }
      };
      img.src = svgDataUrl;
    } catch (e) {
      // Ignore fallback errors
    }
  }
}
