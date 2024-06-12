/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  interface ReqUser {
    id: string;
    name: string;
    email: string;
  }
}

declare module 'Express' {
  interface User {
    id: string;
    name: string;
    email: string;
  }
}
