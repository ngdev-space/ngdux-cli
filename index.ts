#!/usr/bin/env node

const vorpal = require('vorpal')();
const fsAutocomplete = require('vorpal-autocomplete-fs');
const chalk = vorpal.chalk;
const originalPath = process.cwd();
const ls = require('node-ls');

import { Writer } from './lib/writer';

function currentDirectory(currentDir: string) {
	const splittedPath = currentDir.split('/');
	return splittedPath[splittedPath.length - 1];
}

vorpal
    .command('init [name] [path]', 'Creates a "redux" directory that contains reducers and effects folders')
    .alias('i')
    .autocomplete(fsAutocomplete({ directory: true }))
    .action(function(args, callback) {
        Writer.createDir(args.name, args.path);
        callback();
    });

vorpal
    .command('ls', 'List current dir files')
    .option('--all', 'List all files.')
    .action(function(args, callback) {
        let opt = '';
        if (args.options && args.options.all) {
			opt = '--all';
        }
        ls(process.cwd(), opt, function(err, list) {
		  	// here you could get a files list of the current directory 
          	list.map((item) => vorpal.log(item));
        	callback();
		});
    });

vorpal
    .command('cd [path]', 'Creates a "middleware" file ')
  	.autocomplete(fsAutocomplete({ directory: false }))
    .action(function(args, callback) {
        try {
        	process.chdir(`${process.cwd()}/${args.path}/`);
        } catch (e) {
            if (e.code === 'ENOTDIR') {
                vorpal.log('Not a directory');
            } else {
                vorpal.log('Directory doesn\'t exist');
            }
        }
        const dir = process.cwd();
        let currentDir =`ngdux@${currentDirectory(dir)}$`;
        vorpal.ui.delimiter(currentDir);
        vorpal.ui.refresh();
        callback();
    });

vorpal
    .command('bundle [name]', 'Creates a bundle')
    .alias('b')
    .action(function(args, callback) {
        Writer.writeBundle(args.name, originalPath)
        callback();
    });

vorpal
    .command('duck [name]', 'Creates a "duck" file with CRUD')
    .alias('d')
    .action(function(args, callback) {
        Writer.writeReducer(args.name, originalPath);
        callback();
    });

vorpal
    .command('effect [name]', 'Creates an "effects" file with CRUD')
    .alias('e')
    .action(function(args, callback) {
        Writer.writeEffect(args.name, originalPath);
        callback();
    });

vorpal
    .command('model [name]', 'Creates a model file')
    .alias('m')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        Writer.writeModel(args.name, originalPath);
        callback();
    });

vorpal
    .command('middleware [name]', 'Creates a "middleware" file ')
    .alias('mw')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        Writer.writeMiddleware(args.name, originalPath);
        callback();
    });

vorpal
    .delimiter(chalk.magenta(`ngdux@${currentDirectory(process.cwd())}$`))
    .show();
