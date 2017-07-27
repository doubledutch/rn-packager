const fs = require('fs')

module.exports = function (manifestFileContents, manifestOutputFile) {
	return function createModuleIdFactory() {
		const fileToIdMap = Object.create(null);
		var nextId = 0;
		if (manifestFileContents) {
			nextId = Object.keys(manifestFileContents.modules).reduce((id, key) => {
				if (manifestFileContents.modules[key].id > id) {
					return manifestFileContents.modules[key].id
				}
				return id
			}, 0)
		}

		return (_moduleRef) => {
			let modulePath = _moduleRef.path;
			const sourcePath = modulePath
				.replace(process.cwd() + '/node_modules/', '')
				.replace(process.cwd(), '.')

			if (manifestFileContents && manifestFileContents.modules[sourcePath]) {
				return manifestFileContents.modules[sourcePath].id
			}

			if (!(modulePath in fileToIdMap)) {
				fileToIdMap[modulePath] = nextId;
				nextId += 1;
			}
			return fileToIdMap[modulePath];
		};
	}
}