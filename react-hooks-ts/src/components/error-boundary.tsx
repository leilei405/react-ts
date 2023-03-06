import React from "react"

// children
// fallbackRender
type FallbackRender = (props: { error: Error | null }) => React.ReactElement
// 错误边界的实现一定要使用 class Component  来实现
// export class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackRender: FallbackRender }, any> {
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
    state = {
        error: null
    }
    // ErrorBoundary 的子组件 发生渲染错误之后  会调用 getDerivedStateFromError
    static getDerivedStateFromError(error: Error) {
        return { error }  // 返回的 error 会赋值给 state 
    }

    render () {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;

        if (error) {
            return fallbackRender({error})
        }

        return children
    }
}