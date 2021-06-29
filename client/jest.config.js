module.exports = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper:{
		"\\.(css|less|sass)$": "<rootDir>/__mocks__/styleMock.js"
	}
}