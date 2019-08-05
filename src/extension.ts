import { calculate, writeCurrentTime } from './commands';

export function activate({ subscriptions }) {
    subscriptions.push(calculate());
    subscriptions.push(writeCurrentTime());
}
