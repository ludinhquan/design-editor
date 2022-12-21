/// <reference types="vite/client" />

interface ClassType<T> {
  new(...args: any[]): T
}
