# yarn install
echo Starting build of base bundles
base_bundle_version=0.46.4

iosLineCount=$(wc -l < ./build/base.ios.$base_bundle_version.manifest.bundle)
iosLineCount=$((iosLineCount - 2))

cat ./build/base.ios.$base_bundle_version.manifest.bundle | head -n $iosLineCount > ./build/base.ios.$base_bundle_version.manifest.bundle.tmp
mv ./build/base.ios.$base_bundle_version.manifest.bundle.tmp ./build/base.ios.$base_bundle_version.manifest.bundle

androidLineCount=$(wc -l < ./build/base.android.$base_bundle_version.manifest.bundle)
androidLineCount=$((androidLineCount - 2))

cat ./build/base.android.$base_bundle_version.manifest.bundle | head -n $androidLineCount > ./build/base.android.$base_bundle_version.manifest.bundle.tmp
mv ./build/base.android.$base_bundle_version.manifest.bundle.tmp ./build/base.android.$base_bundle_version.manifest.bundle
