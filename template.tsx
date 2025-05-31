import React from 'react';

type ImageMeta = {
  name: string;
  aspectRatio: number;
  variants: { width: number; filename: string }[];
};

export function GalleryPage({ images }: { images: ImageMeta[] }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Photo Gallery</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <div className="gallery">
          {images.map((img) => {
            const srcSet = img.variants
              .map((v) => `${v.filename} ${v.width}w`)
              .join(', ');
            const sizes = '(max-width: 800px) 100vw, 800px';
            return (
              <img
                key={img.name}
                src={img.variants[0].filename}
                srcSet={srcSet}
                sizes={sizes}
                alt={img.name}
                loading="lazy"
              />
            );
          })}
        </div>
      </body>
    </html>
  );
}
