import type { AstroIntegration } from 'astro';
import rehypeMediaAssets from './rehype-media-assets';
import vitePluginMedia from './vite-plugin-media';

const contentMedia = (): AstroIntegration => ({
  name: 'content-media',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({
        markdown: {
          rehypePlugins: [rehypeMediaAssets],
        },
        vite: {
          plugins: [vitePluginMedia()],
        },
      });
    },
  },
});

export default contentMedia;
