/**
 * A simple single event emitter class.
 * It notifies it listeners when emitChange is called.
 * It's the building block of the architecture of the system.
 *
 * @export
 * @class Store
 */
export class Store {
  private static _instance: Store;
  private _listeners: Function[];

  constructor() {
    this._listeners = [];
  }
  /**
   * Triggers a change event
   *
   * @memberof Store
   */
  emitChange() {
    for (let i = 0, n = this._listeners.length; i < n; i += 1) {
      this._listeners[i]();
    }
  }
  /**
   * Registers a listener for the change event
   *
   * @param {Function} listener
   *
   * @memberof Store
   */
  addChangeListener(listener: Function) {
    this._listeners.push(listener);
  }
  /**
   * Registers a listener for the change event
   *
   * @param {Function} listener
   *
   * @memberof Store
   */
  register(listener: Function) {
    this.addChangeListener(listener);
  }
  /**
   * Removes a registered listener to the change event
   *
   * @param {Function} listener
   *
   * @memberof Store
   */
  removeChangeListener(listener: Function) {
    let position = -1;
    if (this._listeners[0] === listener) {
      this._listeners.shift();
      return;
    }
    for (let i = 0, n = this._listeners.length; i < n; i += 1) {
      if (this._listeners[i] === listener) {
        position = i;
      }
    }
    if (position < 0) {
      return;
    }
    this.spliceOne(this._listeners, position);
  }
  /**
   * Removes a registered listener to the change event
   *
   * @param {Function} listener
   *
   * @memberof Store
   */
  deregister(listener: Function) {
    this.removeChangeListener(listener);
  }

  /**
   * Method to be overwritten in classes that extend Store
   *
   * @memberof Store
   */
  init() {
    throw new Error('This must implemented on sub-class');
  }
  /**
   * This is a way to overcome the limitations of TypeScript and
   * singleton pattern and most stores are singletons
   *
   * @readonly
   * @static
   * @memberof Store
   */
  public static get Instance(): Store {
    // Do you need arguments? Make it a regular method instead.
    const instance = this._instance || (this._instance = new this());
    instance.init();
    return instance;
  }

  private spliceOne<T>(list: T[], index: number): void {
    for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k];
    }
    list.pop();
  }
}
