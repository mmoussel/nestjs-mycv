import { rm } from 'fs';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'), () => {
      console.log('🚀 ~ file: setup.ts:6 test.db removed');
    });
  } catch (error) {}
});
