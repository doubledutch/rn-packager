* DEPRECATED

`dd-rn-packager` is no longer necessary.  You may remove it from your DoubleDutch extensions and update your mobile package.json scripts to use the standard react-native CLI:

```json
{
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start --port 8081",
    "clean": "watchman watch-del-all && rm -rf node_modules && rm -fr $TMPDIR/react-* && rm -rf ios/build && (yarn || npm i)",
    "ios": "node node_modules/react-native/local-cli/cli.js run-ios",
    "android": "node node_modules/react-native/local-cli/cli.js run-android"
  }
}
```
