import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function moveScriptsToFooter() {
  return {
    name: 'move-scripts-to-footer',
    transformIndexHtml(html) {
      // Move all <script type="module"> tags before </body>
      // Remove all <script type="module"> tags and collect them
      const scripts = [];
      const htmlWithoutScripts = html.replace(/<script type="module"[\s\S]*?<\/script>/g, (script) => {
        scripts.push(script);
        return '';
      });
      // Insert collected scripts just before </body>
      return htmlWithoutScripts.replace(
        /(<\/body>)/i,
        scripts.join('\n') + '\n$1'
      );
    }
  }
}

export default defineConfig({
  base: '/dc-climate-change/',
  plugins: [react(), moveScriptsToFooter()],
  build: {
    root: 'src',
    outDir: 'docs'
  }
})
