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

### React Native CLI
https://github.com/facebook/react-native/tree/master/local-cli

## Changes
