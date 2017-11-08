// @flow

declare type Return_<R, F: (...args: Array<any>) => R> = R; // eslint-disable-line no-unused-vars
declare type Return<T> = Return_<*, T>; // eslint-disable-line no-undef
