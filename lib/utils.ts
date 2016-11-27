
export const currentDirectory = (currentDir: string) => {
	const splittedPath = currentDir.split('/');
	return splittedPath[splittedPath.length - 1];
}

export const parseDirOpts = (args: any, originalPath: string) => {
    let path = '';
	if (args.options.default || !args.path) {
        path = originalPath;
    } else {
        path = args.path;
        if (path.charAt(path.length-1) === '/') {
            path = path.slice(0, path.length - 1);
        }
    }
    return path;
}