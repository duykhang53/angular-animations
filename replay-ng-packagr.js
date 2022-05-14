const path = require('path');
const glob = require('glob');
const fsExtra = require('fs-extra');

glob.sync('lib/*/index.ts')
  .map(g => path.basename(path.dirname(g)))
  .forEach(item => {
    fsExtra.writeJSONSync(`lib/${item}/package.json`, {
      ngPackage: {
        lib: {
          entryFile: "index.ts"
        }
      }
    }, { spaces: 2 });
  });

const subAnimationSuffix = '.animation.ts';

glob.sync('lib/*/*' + subAnimationSuffix)
  .map(g => path.posix.relative('lib', g).split('/'))
  .forEach(([category, name]) => {
    const pkgName = name.substring(0, name.length - subAnimationSuffix.length);
    const pkgPath = `lib/${category}/${pkgName}/package.json`;

    fsExtra.ensureDirSync(path.dirname(pkgPath));
    fsExtra.writeJSONSync(pkgPath, {
      ngPackage: {
        lib: {
          entryFile: `../${name}`
        }
      }
    }, { spaces: 2 });
  });

const ngPackagrGlob = require('ng-packagr/lib/utils/glob');
const ngPackagrArray = require('ng-packagr/lib/utils/array');
const orgGlob = ngPackagrGlob.globFiles;
ngPackagrGlob.globFiles = (pattern, opts) => orgGlob(ngPackagrArray.toArray(pattern).map(p => p && p.replaceAll('\\', '/')), opts);

require('ng-packagr/cli/main');
