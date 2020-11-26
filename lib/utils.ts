export const noop = () => { }
export const _window = typeof window == "undefined" ? global : window as any