/**
 * Capitalize str
 * It can be moved to utils, but we use it only once, so it not so important
 * @param {string} str
 * @returns {string}
 */
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

/**
 * Transforms a declared constant into a possible action function call
 * @param {string} constant. described like GET_DATA_FROM_SERVER.
 * @return {string} the transformed string into a possible action call getDataFromServer.
 */
const constantToActionStringTransform = (constant: string) => {
  let transformedConstant = constant.toLowerCase();
  const arrTrans = transformedConstant.split('_');

  transformedConstant = arrTrans.slice(1).reduce((a, b) => a + capitalize(b), arrTrans[0]);
  return transformedConstant;
};

class Dispatcher {
  public actions: any;
  private _callbacks: any = {};
  private logActions: any;
  private constants: any;

  constructor(constants, logActions = false) {
    this.logActions = logActions;
    this.constants = constants;
    const keys = Object.keys(constants);
    this.actions = keys.reduce((returnObject, key) => {
      returnObject[constantToActionStringTransform(key)] = (payload) => {
        this.dispatch(key, payload);
      };
      return returnObject;
    }, {});
  }

  /**
   * Registers a callback to a specific action
   * @param {string} action. the action to be registered
   * @param {function} callback. a callback to be called when the action is fired
   */
  register(action, callback) {
    this._callbacks[action] = this._callbacks[action] || [];
    this._callbacks[action].push(callback);
  }

  /**
   * Unregisters a callback from a specific action
   * @param {string} action. the action to be unregistered
   * @param {function} callback. the callback that was registerd
   */
  unregister(action, callback) {
    const handles = this._callbacks[action];
    if (!handles) return;
    for (let i = 0, hn = handles.length; i < hn; ++i) {
      if (handles[i] === callback) {
        if (i === (hn - 1)) {
          handles.pop();
          return;
        }
        handles[i] = handles.pop();
        return;
      }
    }
  }

  /**
   * Calls async all callbacks registerd to a specific action with the specified payload
   * @param {string} action. the action that triggers the callback
   * @param {payload} any. the payload pass to the callback function it could be any type preferably an object
   *                  leaves the implementation of the payload to the developer for specific uses
   */
  dispatch(action, payload) {
    if (this.logActions) console.log(action, payload);
    const handles = this._callbacks[action];
    if (!handles) {
      throw new Error(`No callbacks registerd for action ${action}`);
    }
    handles.forEach((fn) => {
      setTimeout(() => {
        fn(payload);
      }, 0);
    });
  }

  /**
   * Calls sync all callbacks registerd to a specific action with the specified payload
   * @param {string} action. the action that triggers the callback
   * @param {payload} any. the payload pass to the callback function it could be any type preferably an object
   *                  leaves the implementation of the payload to the developer for specific uses
   */
  dispatchSync(action, payload) {
    if (this.logActions) console.log(action, payload);
    const handles = this._callbacks[action];
    if (!handles) {
      throw new Error(`No callbacks registerd for action ${action}`);
    }
    handles.forEach((fn) => {
      fn(payload);
    });
  }
}

export default Dispatcher;
