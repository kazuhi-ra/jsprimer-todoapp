export class EventEmitter {
  constructor() {
    /**
     * [イベント名, Set(リスナー関数)]
     * @type Map.<string, set>
     */
    this._listeners = new Map();
  }

  /**
   * typeが実行された時に呼ばれるlistenerの登録
   * @param {string} type イベント名
   * @param {Function}  listener イベントリスナー
   */
  addEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listener.add(listener);
  }

  /**
   * 指定したイベントをディスパッチ
   * @param {string} type イベント名
   */

  emit(type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listener) => {
      listener.call(this);
    });
  }

  /**
   * 指定したイベントのイベントリスナーを解除
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type, listener) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((ownListener) => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
