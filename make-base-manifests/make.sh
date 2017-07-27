# yarn install
echo Starting build of base bundles
base_bundle_version=0.46.4
rm -rf build
mkdir build

echo Starting iOS build
node ./node_modules/dd-rn-packager/bin/rnpackager bundle \
  --dev false \
  --manifest-output ./build/base.ios.$base_bundle_version.manifest \
  --platform ios \
  --entry-file ./base.js \
  --bundle-output ./build/base.ios.$base_bundle_version.manifest.bundle \
  --sourcemap-output ./build/base.ios.$base_bundle_version.sourcemap \
  --post-process-modules $PWD/node_modules/dd-rn-packager/process.js \
  --create-module-id-factory $PWD/node_modules/dd-rn-packager/idfactory.js \
  > /dev/null

echo Starting Android build
node ./node_modules/dd-rn-packager/bin/rnpackager bundle \
  --dev false \
  --manifest-output ./build/base.android.$base_bundle_version.manifest \
  --platform android \
  --entry-file ./base.js \
  --bundle-output ./build/base.android.$base_bundle_version.manifest.bundle \
  --sourcemap-output ./build/base.android.$base_bundle_version.sourcemap \
  --post-process-modules $PWD/node_modules/dd-rn-packager/process.js \
  --create-module-id-factory $PWD/node_modules/dd-rn-packager/idfactory.js \
  > /dev/null
