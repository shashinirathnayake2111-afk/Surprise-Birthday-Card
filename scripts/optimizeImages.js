// scripts/optimizeImages.js
// Run: node scripts/optimizeImages.js
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const INPUT_DIR = './src/assets';
const OUTPUT_DIR = './src/assets/optimized';

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const name = basename(file, extname(file));
  const outputPath = join(OUTPUT_DIR, `${name}.webp`);

  const ext = extname(file).toLowerCase();
  const isJpg = ext === '.jpg' || ext === '.jpeg';

  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: isJpg ? 78 : 85 })
    .toFile(outputPath);

  const { size: inSize } = (await import('fs')).statSync(inputPath);
  const { size: outSize } = (await import('fs')).statSync(outputPath);
  console.log(`${file} → ${name}.webp  (${(inSize/1024).toFixed(0)}KB → ${(outSize/1024).toFixed(0)}KB)`);
}
console.log('✅ Done! Update your imports to use the .webp files from src/assets/optimized/');
