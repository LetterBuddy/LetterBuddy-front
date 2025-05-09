import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

// vi.mock('zustand')
// reset all mocks after each test
afterEach(() => {
  vi.restoreAllMocks();
});

// Tests TODO:

// Child:
// check that the word to write is rendered and skipped successfully

// Adult:
// check that the child is added to the list of children
