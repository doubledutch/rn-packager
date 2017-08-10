# DoubleDutch React Native Manifest Bundler
(NOTE: this is a deviated fork from https://github.com/react-component/rn-packager)

## React Bundler Process
React bundler works similarly to webpack by transpiling (ES6->ES5) all included sources off the root source file. This will include all React Native libraries necessary for bridging between JS and native code.

The size of the bridging JS is prohibitively large to allow for an over-the-air deployment of more than a single bundle. A gzipped bundle is around ~1mb before adding any custom logic.

## Manifest Process Overview
https://github.com/facebook/react-native/pull/10804
An attempt to reduce bundle size is to create a base bundle that includes all bridging JS, and embed that in the mobile binaries. When creating the base bundle, we also output a manifest file which maps included sources to their corresponding IDs in the base bundle.

This manifest may be passed into the bundler to "skip" any sources included that are present in the base bundle, and to instead load them by ID. This allows for us to concatenate the base bundle with the application bundle and end up with a runnable bundle.

The resulting size of feature bundles is considerably lower than the original bundles as we can omit all of the bridging JS.

### Steps
1. Generate a base bundle that only includes the RN (or other common/unchangeable) base libraries
2. Output manifest file from base bundle creation with source->ID mappings
3. Generate the application bundle and pass in the manifeset
4. Application bundle will start reference IDs at an index greater than the last ID in the manifest (prevent collisions)
5. Application bundle will omit base library JS, but will map references properly

## Components
### Metro Bundler
https://github.com/facebook/metro-bundler
The bundler does the bulk of the work:

1. Transpiling using Babel
2. Walking dependency tree
3. Outputting the resulting bundle and initialization code

### React Native CLI
https://github.com/facebook/react-native/tree/master/local-cli
The CLI just offers a command-line friendly way to trigger the bundler and pass on arguments.

## Changes

The changes made are relatively simple:

* Add command line arguments to pass through a couple scripts to the metro bundler
* We need to manage assigning of module IDs, and the ability to omit certain modules (sources) from being written to the bundle

### CLI
https://github.com/doubledutch/rn-packager/blob/master/react-native/local-cli/bundle/bundleCommandLineArgs.js
1. **--manifest-output** - The location to write the manifest to after bundling
2. **--manifest-file** - The input manifest to be used to omit included sources
3. **--post-process-modules** - The input script file to pre-process the bundle and omit libraries in the manifest (https://github.com/doubledutch/rn-packager/blob/master/process.js)
4. **--create-module-id-factory** - The input script file to assign IDs to included sources and to map base bundle scripts to their corresponding IDs (https://github.com/doubledutch/rn-packager/blob/master/idfactory.js)

## Updating RN Versions
Copy the sources from the local-cli (in the main RN project) and metro-bundler to this repo in the react-native folder. Look at the diff and reapply the command line argument wiring.

That should largely be it.

NOTE: Each time RN updates their sources does not necessarily require making changes to the packager. In fact, packager changes are much less common than RN functionality changes.
