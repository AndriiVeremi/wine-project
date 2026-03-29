import { setupServer } from 'msw/node';
import { winesHandlers } from './handlers/winesHandlers';
import { locationHandlers } from './handlers/locationHandlers';

export const server = setupServer(...winesHandlers, ...locationHandlers);
