/// <reference types="vite/client" />

namespace fabric {
  interface Object {
    id: string
    itemType: string
  }
}

interface ClassType<T> {
  new(...args: any[]): T
}

function noop(): void
