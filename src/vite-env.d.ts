/// <reference types="vite/client" />

namespace fabric {
  interface Object {
    id: string
  }
}

interface ClassType<T> {
  new(...args: any[]): T
}
