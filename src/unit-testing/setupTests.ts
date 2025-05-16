import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

// reset all mocks after each test
afterEach(() => {
  vi.restoreAllMocks();
});
