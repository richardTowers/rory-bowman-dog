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
        <link rel="stylesheet" href="style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>rory.bowman.dog</title>
        <meta name="title" content="rory.bowman.dog" />
        <meta name="description" content="Uh, hi guys. It's me, Rory. I uh, made a website so I can go on the internet." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rory.bowman.dog/" />
        <meta property="og:title" content="rory.bowman.dog" />
        <meta property="og:description" content="Uh, hi guys. It's me, Rory. I uh, made a website so I can go on the internet." />
        <meta property="og:image" content="https://rory.bowman.dog/og-image.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://rory.bowman.dog/" />
        <meta property="twitter:title" content="rory.bowman.dog" />
        <meta property="twitter:description" content="Uh, hi guys. It's me, Rory. I uh, made a website so I can go on the internet." />
        <meta property="twitter:image" content="https://rory.bowman.dog/og-image.jpg" />

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
