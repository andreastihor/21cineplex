const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0
  && file !== basename
  && file.slice(-3) === '.js')
  .forEach((file) => {
    const name = file.slice(0, -3);

    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    module.exports[name] = require(`./${name}`);
  });
