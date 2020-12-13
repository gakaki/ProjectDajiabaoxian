const sharp = require('sharp');

sharp('bg.png')
  .toFormat('heif', { quality: 45, compression: 'av1' })
  .toFile('bg.avif')
  .then(info => console.log(info));

  sharp('bg.png')
  .toFormat('heif', { quality: 90, compression: 'webp' })
  .toFile('bg.webp')
  .then(info => console.log(info));