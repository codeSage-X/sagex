// Stand-in for optional Nest packages this app doesn't use (bundled into the Worker only).
// Nest loads them lazily inside try/catch, so throwing here reads as "not installed".
throw new Error('Optional package not bundled in the Worker build');
