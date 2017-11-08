// @flow

export const toDate = (date: string): string => new Date(date).toDateString();
export { default as validate } from './validate';
