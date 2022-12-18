/* Created 31.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

//const puppeteer = require('puppeteer');
import { PriorityQueue } from './../src/Queue';

let q = new PriorityQueue;
let collection = [];
let data = [];

// Unit Test method enqueue() of Queue Class
test('should add a simple element to the queue', () => {
    data = q.enqueue(['test', 2]);
    expect(data).toEqual([['test', 2]]);
});

// Unit Test method enqueue() of Queue Class
test('should add a new element to the queue', () => {
    data = q.enqueue(['move', 2, ['parameter 1', 'parameter 2', 'parameter 3']]);
    expect(data).toEqual([['test', 2], ['move', 2, ['parameter 1', 'parameter 2', 'parameter 3']]]);
});

// Unit Test method enqueue() of Queue Class
test('should add a new element to the queue with a higher priority', () => {
    data = q.enqueue(['move', 1, ['parameter 4', 'parameter 5', 'parameter 6']]);
    expect(data).toEqual([['move', 1, ['parameter 4', 'parameter 5', 'parameter 6']], ['test', 2], ['move', 2, ['parameter 1', 'parameter 2', 'parameter 3']]]);
});

// Unit Test method dequeue() and listqeue() of Queue Class
test('should remove first element of the queue', () => {
    const data = q.dequeue();
    expect(data).toEqual(['move', 1, ['parameter 4', 'parameter 5', 'parameter 6']]);
    expect(q.listQueue()).toEqual([['test', 2], ['move', 2, ['parameter 1', 'parameter 2', 'parameter 3']]]);
});

// Unit Test method frontqueue() of Queue Class
test('should show first element of the queue', () => {
    data = q.frontqueue();
    expect(data).toEqual(['test', 2]);
});

// Unit Test method clearqueue() of Queue Class
test('should clear the queue', () => {
    data = q.clearqueue();
    expect(data).toEqual([]);
});
