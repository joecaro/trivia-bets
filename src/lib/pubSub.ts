export default class PubSub {
    subscribers: Record<string, Function[]> = {};
    constructor(stateKeys: string[]) {
        stateKeys.forEach((key) => {
            this.subscribers[key] = [];
        });
    }
    publish(name: string, value: any) {
        this.subscribers[name].forEach((callback) => {
            callback(value);
        });
    }
    subscribe(name: string, callback: Function) {
        if (!this.subscribers[name]) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push(callback);
    }
    unsubscribe(name: string, callback: Function) {
        this.subscribers[name] = this.subscribers[name].filter((fn) => fn !== callback);
    }
}