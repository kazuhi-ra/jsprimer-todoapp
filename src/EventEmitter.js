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
}
