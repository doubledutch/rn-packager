const ModuleTransport = require('./react-native/metro-bundler/build/lib/ModuleTransport.js')
const fs = require('fs')

module.exports = function (manifestFileContents, manifestOutputFile) {
	return function (modules) {
		const repackedModules = modules.map((m) => new ModuleTransport({
			name: m.name,
			id: m.id + 0,
			code: '',
			sourceCode: '',
			sourcePath: m.sourcePath,
			virtual: m.virtual,
			meta: m.meta,
			polyfill: m.polyfill,
			map: m.map
		}))

		if (manifestFileContents) {
			modules = modules.filter((module) => {
				const sourcePath = module.sourcePath
					.replace(process.cwd() + '/node_modules/', '')
					.replace(process.cwd(), '.')
				return !manifestFileContents.modules[sourcePath]
			})
		}

		if (manifestOutputFile) {
			const manifest = {
				modules: modules.reduce((reducer, module) => {
					const sourcePath = module.sourcePath
						.replace(process.cwd() + '/node_modules/', '')
						.replace(process.cwd(), '.')
					reducer[sourcePath] = { id: module.id }
					return reducer
				}, {})
			}
			fs.writeFileSync(manifestOutputFile, JSON.stringify(manifest, 2, 2), 'utf8')
		}

		return modules;
	}
}
