import test from 'node:test';
import assert from 'node:assert/strict';
import {canonicalJson, assertSnapshotSafety} from './sample.mjs';
const plan=(kept,removed)=>({unchanged:Array(kept).fill({}),changed:[],created:[],removed:Array(removed).fill({})});
test('equivalent payloads canonicalise regardless of object key order',()=>{
 assert.equal(canonicalJson({b:2,a:{y:2,x:1}}),canonicalJson({a:{x:1,y:2},b:2}));
 assert.notEqual(canonicalJson({images:['a','b']}),canonicalJson({images:['b','a']}));
});
test('a normal inventory change passes',()=>assert.doesNotThrow(()=>assertSnapshotSafety(plan(19,1),20)));
test('a suspicious drop stops the sync',()=>assert.throws(()=>assertSnapshotSafety(plan(10,10),20),/safety stop/));
test('large absolute removal stops even when the ratio is small',()=>assert.throws(()=>assertSnapshotSafety(plan(89,11),100),/limit 10/));
test('configured limits and equality at the boundary are honoured',()=>{
 assert.doesNotThrow(()=>assertSnapshotSafety(plan(15,5),20));
 assert.doesNotThrow(()=>assertSnapshotSafety(plan(10,10),20,{maxDropRatio:0.5}));
});
