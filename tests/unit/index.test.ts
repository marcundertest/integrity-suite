import { describe, it, expect } from 'vitest';
import { version, ping } from '../../src/index.js';

describe('Index Module', () => {
  it('should export the current version', () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
  });

  it('should respond to ping with pong', () => {
    expect(ping()).toBe('pong');
  });
});
