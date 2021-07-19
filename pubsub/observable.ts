import { Subscription } from 'types/subscription'

export class Observable<T> {
  private _value?: T
  private _subscriptions: Array<Subscription<T> | null> = []

  constructor(value?: T) {
    this._value = value
  }

  public getValue() {
    return this._value
  }

  public subscribe = (subscription: Subscription<T>) => {
    const index = this._subscriptions.push(subscription) - 1

    return () => {
      this._subscriptions[index] = null
    }
  }

  public next = (newValue: T) => {
    this._value = newValue
    for (const subscription of this._subscriptions) {
      if (subscription) {
        try {
          subscription.next(newValue)
        } catch (e) {
          if (subscription.error) {
            subscription.error(e)
          }
        }
      }
    }
  }
}
