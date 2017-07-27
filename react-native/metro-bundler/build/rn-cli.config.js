/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * React Native CLI configuration file
 */
'use strict';

const blacklist = require('./blacklist');
const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetExts() {
    return [];
  },

  getSourceExts() {
    return [];
  },

  getBlacklistRE() {
    return blacklist();
  },

  _getRoots() {
    const dirname = process.cwd()//__dirname
    // match on either path separator
    if (dirname.match(/node_modules[\/\\]react-native[\/\\]packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(dirname, '../../..')];
    } else if (dirname.match(/Pods\/React\/packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(dirname, '../../..')];
    } else {
      return [path.resolve(dirname, '..')];
    }
  },

  getTransformModulePath() {
    return require.resolve('./transformer');
  }
};