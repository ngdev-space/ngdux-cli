#!/usr/bin/env node

const vorpal = require('vorpal')();
import { Writer } from './lib/writer';

vorpal
    .delimiter('ngdux$')
    .show();

vorpal
    .command('g duck [name]', 'Outputs "rabbit"')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        Writer.writeDuck(args.name);
        callback();
    });

vorpal
    .command('g effect [name]', 'Outputs "rabbit"')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        Writer.writeEffect(args.name);
        callback();
    });