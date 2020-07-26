import {
    useEffect,
    useRef,
    useCallback
} from 'react'
import _ from 'lodash'

const KEY_WORD_HISTORY = "keyWordHistory"

export const useDebounce = function (fn: any, delay: number, dep: any[] = []) {
    let timeout: any = useRef()
    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            fn()
        }, delay)
    }, dep)
}

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