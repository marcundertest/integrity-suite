import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

describe('Code Quality: Comments', () => {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

  const getFiles = (dir: string, allFiles: string[] = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        if (!name.includes('node_modules') && !name.includes('.git')) {
          getFiles(name, allFiles);
        }
      } else {
        const validExtensions = ['.ts', '.js', '.tsx', '.jsx', '.html', '.css'];
        const ext = path.extname(name);
        if (validExtensions.includes(ext) && !name.includes('code-quality.test.ts')) {
          allFiles.push(name);
        }
      }
    });
    return allFiles;
  };

  const codeFiles = getFiles(rootDir);

  it('should not contain emojis or non-ASCII characters in comments', () => {
    codeFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      // Regex to find JS/CSS comments (// and /* */) and HTML comments (<!-- -->)
      const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)/g;
      const comments = content.match(commentRegex);

      if (comments) {
        comments.forEach((comment) => {
          // Check for non-ASCII characters (emojis, accents, etc.)
          // ASCII range is 0-127.
          // eslint-disable-next-line no-control-regex
          const nonAscii = /[^\u0000-\u007F]/;
          expect(
            nonAscii.test(comment),
            `File ${file} contains non-ASCII characters in comment: "${comment}"`,
          ).toBe(false);
        });
      }
    });
  });

  it('should not contain obviously redundant or didactic comments', () => {
    // This is a heuristic check for common didactic/obvious patterns
    const forbiddenPatterns = [
      /simplified check for/i,
      /assume it's fine/i,
      /this is a/i,
      /basic check/i,
    ];

    codeFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)/g;
      const comments = content.match(commentRegex);

      if (comments) {
        comments.forEach((comment) => {
          forbiddenPatterns.forEach((pattern) => {
            expect(
              pattern.test(comment),
              `File ${file} contains redundant comment: "${comment}"`,
            ).toBe(false);
          });
        });
      }
    });
  });
});
