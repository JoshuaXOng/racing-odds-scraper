import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	testEnvironment: 'jest-environment-node',
	transform: {},
	modulePaths: [
		"src/**/*.ts"		
	],
};

export default config;

	// modulePathIgnorePatterns: [
	// 	"lib/", 
	// ],
// module.exports = {
//     moduleNameMapper: {
//         "\\.(css|less)$": "identity-obj-proxy"
//     },
//     collectCoverageFrom: [
//         'src/**'
//     ]
// }