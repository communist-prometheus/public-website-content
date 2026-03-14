import { basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const MEDIA_EXT_PATTERN = 'mp4|webm|ogg|m4a|mp3|wav';
const MEDIA_SRC_RE = new RegExp(
  `(src=["'])\\./assets/([^"']+\\.(?:${MEDIA_EXT_PATTERN}))(["'])`,
  'g',
);

const MEDIA_OUTPUT_BASE = '/_media';

interface HastNode {
  readonly type: string;
  value?: string;
  children?: ReadonlyArray<HastNode>;
}

const extractArticleSlug = (filePath: string): string => {
  const fsPath = filePath.startsWith('file://') ? fileURLToPath(filePath) : filePath;
  const dir = dirname(fsPath);
  const dirName = basename(dir);
  return dirName === 'assets' ? basename(dirname(dir)) : dirName;
};

const walkTree = (node: HastNode, visitor: (n: HastNode) => void): void => {
  visitor(node);
  if (node.children) {
    for (const child of node.children) {
      walkTree(child, visitor);
    }
  }
};

const rehypeMediaAssets = () => (tree: HastNode, file: { history: ReadonlyArray<string> }) => {
  const filePath = file.history[0];
  if (!filePath) return;

  const slug = extractArticleSlug(filePath);

  walkTree(tree, (node) => {
    if (node.type === 'raw' && node.value) {
      const mutable = node as { type: string; value: string };
      mutable.value = mutable.value.replace(
        MEDIA_SRC_RE,
        (_match, prefix: string, path: string, suffix: string) =>
          `${prefix}${MEDIA_OUTPUT_BASE}/${slug}/${path}${suffix}`,
      );
    }
  });
};

export default rehypeMediaAssets;
