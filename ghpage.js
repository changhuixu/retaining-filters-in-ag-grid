const fs = require('fs-extra');
const { join } = require('path');

(async () => {
  try {
    const dist = fs
      .readdirSync('dist', { recursive: true })
      .map((p) => join('dist', p))
      .find((p) => p.endsWith('browser'));

    if (!fs.exists(dist)) {
      console.error(`The output folder not found.`);
      return;
    }
    console.log(`Found the Angular output folder at [${dist}]`);

    console.log(`empty files in the 'docs' folder`);
    await fs.emptyDirSync('docs');

    console.log(`copy files to 'docs' folder`);
    await fs.move(dist, 'docs');
    await fs.copy('docs/index.html', 'docs/404.html');
    console.log(`done with copying files to 'docs' folder`);
  } catch (error) {
    console.error(error);
  }
})();
