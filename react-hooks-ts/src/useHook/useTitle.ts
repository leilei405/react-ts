// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from "react"

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    // const oldTitle = document.title;/
    const oldTitle = useRef(document.title).current
    // 页面加载时候 旧title 'React App'
    // 加载后:  新title
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                // 如果不指定依赖读到的就是旧title
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}