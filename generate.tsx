import sharp from 'sharp';
import fs from 'fs-extra';
import { globSync } from 'glob';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { GalleryPage } from './template';
import React from 'react';

const inputDir = 'images';
const outputDir = 'output/images';
const htmlOut = 'output/index.html';
const cssIn = 'style.css';
const cssOut = 'output/style.css';

const sizes = [400, 800, 1600]; // px widths

async function optimizeImages() {
  await fs.ensureDir(outputDir);
  const files = globSync(`${inputDir}/*.{jpg,jpeg,png}`);
  const imageMetas = [];

  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    const ext = path.extname(file);
    const imageVariants = [];

    for (const width of sizes) {
      const outName = `${name}-${width}w${ext}`;
      const outPath = path.join(outputDir, outName);
      await sharp(file).resize({ width }).toFile(outPath);
      imageVariants.push({ width, filename: `images/${outName}` });
    }

    const metadata = await sharp(file).metadata();
    imageMetas.push({
      name,
      width: metadata.width,
      height: metadata.height,
      aspectRatio: metadata.width! / metadata.height!,
      variants: imageVariants,
    });
  }

  return imageMetas;
}

async function main() {
  const images = await optimizeImages();
  const html = '<!DOCTYPE html>\n' + renderToStaticMarkup(<GalleryPage images={images} />);
  await fs.outputFile(htmlOut, html);
  await fs.copyFile(cssIn, cssOut)
  console.log('Gallery generated in /output');
}

main();
