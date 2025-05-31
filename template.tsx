import React from 'react';

type ImageMeta = {
  name: string;
  aspectRatio: number;
  width: number;
  height: number;
  variants: { width: number; filename: string }[];
};

function distributeImagesIntoColumns(images: ImageMeta[], columnWidth: number, numColumns = 4) {
  // Each image: { id, aspectRatio }
  const columns = Array.from({ length: numColumns }, () => [] as ImageMeta[]);
  const columnHeights = Array(numColumns).fill(0);

  for (const image of images) {
    const height = columnWidth / image.aspectRatio;

    // Find the column with the minimum height so far
    let minColIndex = 0;
    for (let i = 1; i < numColumns; i++) {
      if (columnHeights[i] < columnHeights[minColIndex]) {
        minColIndex = i;
      }
    }

    // Assign the image to that column
    columns[minColIndex].push(image);
    columnHeights[minColIndex] += height;
  }

  return columns;
}

export function GalleryPage({ images }: { images: ImageMeta[] }) {
  const columns = distributeImagesIntoColumns(images, 200, 4);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Photo Gallery</title>
        <link rel="stylesheet" href="style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="row">
          {columns.map((col, i) => {
            return (<div key={i} className="column">
              {col.map((img, j) => {
                const srcSet = img.variants
                  .map((v) => `${v.filename} ${v.width}w`)
                  .join(', ');
                const sizes = '(max-width: 800px) 100vw, 800px';
                return (
                  <img
                    key={j}
                    src={img.variants[0].filename}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt="TODO"
                    loading="lazy"
                  />
                );
              })}
            </div>)
          })}
        </div>
      </body>
    </html>
  );
}
