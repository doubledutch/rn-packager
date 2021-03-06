/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';

const virtualModule = require('../module').virtual;



// Transformed modules have the form
//   __d(function(require, module, global, exports, dependencyMap) {
//       /* code */
//   });
//
// This function adds the numeric module ID, and an array with dependencies of
// the dependencies of the module before the closing parenthesis.
exports.addModuleIdsToModuleWrapper = (
module,
idForPath) =>
{const
  dependencies = module.dependencies,file = module.file;const
  code = file.code;
  const index = code.lastIndexOf(')');

  // calling `idForPath` on the module itself first gives us a lower module id
  // for the file itself than for its dependencies. That reflects their order
  // in the bundle.
  const fileId = idForPath(file);

  // This code runs for both development and production builds, after
  // minification. That's why we leave out all spaces.
  const depencyIds =
  dependencies.length ? `,[${dependencies.map(idForPath).join(',')}]` : '';
  return (
    code.slice(0, index) +
    `,${fileId}` +
    depencyIds +
    code.slice(index));

};

exports.concat = function* concat()

{for (var _len = arguments.length, iterables = Array(_len), _key = 0; _key < _len; _key++) {iterables[_key] = arguments[_key];}
  for (const it of iterables) {
    yield* it;
  }
};

// Creates an idempotent function that returns numeric IDs for objects based
// on their `path` property.
exports.createIdForPathFn = () => {
  const seen = new Map();
  let next = 0;
  return (_ref) => {let path = _ref.path;
    let id = seen.get(path);
    if (id == null) {
      id = next++;
      seen.set(path, id);
    }
    return id;
  };
};

// creates a series of virtual modules with require calls to the passed-in
// modules.
exports.requireCallsTo = function* (
modules,
idForPath)
{
  for (const module of modules) {
    yield virtualModule(`require(${idForPath(module.file)});`);
  }
};