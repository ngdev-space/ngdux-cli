
export const currentDirectory = (currentDir: string) => {
	const splittedPath = currentDir.split('/');
	return splittedPath[splittedPath.length - 1];
}

export const cleanPath = (path: string) => {
	if (path.charAt(path.length-1) === '/') {
        return path.slice(0, path.length - 1);
    }

    return path;
}

export const parseDirOpts = (args: any, originalPath: string) => {
    let path = '';
	if (args.options.default || !args.path) {
        path = originalPath;
    } else {
        path = cleanPath(path);
    }
    return path;
}