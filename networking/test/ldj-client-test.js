'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
    let stream = null;
    let client = null;
    
    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    it('should emit a message event from a single data event', done => { 
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        });
    
        stream.emit('data', '{"foo":"bar"}\n');
    });

    it('should emit a message event from split data events', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        });

        stream.emit('data', '{"foo":"b');
        process.nextTick(() => stream.emit('data', 'ar"}\n'));
    });

    it('should emit a message event from multiple split data events', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        });

        stream.emit('data', '{"foo":');
        process.nextTick(() => stream.emit('data', '"b'));
        process.nextTick(() => stream.emit('data', 'ar"}\n'));
    });
})