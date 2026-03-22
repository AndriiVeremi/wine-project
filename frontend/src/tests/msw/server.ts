import { setupServer } from 'msw/node';
import { winesHandlers } from './handlers/winesHandlers';

export const server = setupServer(...winesHandlers);
