import {
    useEffect,
    useRef,
    useCallback
} from 'react'
import _ from 'lodash'

const KEY_WORD_HISTORY = "keyWordHistory"

// export const useDebounce = function (fn, delay = 500, dep = []) {
//     const { current } = useRef({ fn, timer: null });
//     useEffect(function () {
//         current.fn = fn;
//     }, [fn]);

//     return useCallback(function f(...args) {
//         if (current.timer) {
//             clearTimeout(current.timer);
//         }
//         current.timer = setTimeout(() => {
//         current.fn.call(this, ...args);
//         }, delay);
//     }, dep)
// }

export const getHistory = () => {
    let kwh = window.localStorage.getItem(KEY_WORD_HISTORY)
    let _key: string[] = []

    if (kwh) {
        _key = JSON.parse(kwh)
    }

    return _key
}

export const addHistory = (key: string) => {
    let kwh = window.localStorage.getItem(KEY_WORD_HISTORY)
    let _key: string[] = []

    if (kwh) {
        _key = JSON.parse(kwh)
    }

    if (key) {
        window.localStorage.setItem(KEY_WORD_HISTORY, JSON.stringify(_.uniq([..._key, key])))
    }
}

export const cleanHistory = () => {
    window.localStorage.removeItem(KEY_WORD_HISTORY)
}