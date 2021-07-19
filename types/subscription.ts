export type Subscription<T> = { next: (value: T) => void; error?: (e: Error) => void }
