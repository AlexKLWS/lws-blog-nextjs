import { Observable } from 'pubsub/observable'

export function onEmit<T>(source: Observable<T>, nextFn: (value: T) => void): () => void {
  return source.subscribe({
    next: nextFn,
    error: (err) => console.error(err),
  })
}
