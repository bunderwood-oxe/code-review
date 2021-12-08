import boot from './boot';
import { startServer } from './server';

boot().then(() => {
    startServer();
});
