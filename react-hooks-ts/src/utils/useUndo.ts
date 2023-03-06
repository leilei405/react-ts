import React, { useState, useCallback, useReducer } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

type State<T> = {
    past: T[],
    present: T,
    future: T[],
}

type Action<T> = {
    newPresent?: T,
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET 
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state;
    const { type, newPresent } = action;
    switch (type) {
        case UNDO: {
            // const { past, present, future } = currentState;
            // if (canUndo)  return 
            if (past.length === 0) return state
            const previous = past[past.length - 1]
            const newPast =past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }

        case REDO: {
            // const { past, present, future } = currentState;
            if (future.length === 0) return state
            const next = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        }

        case SET: {
            if (past.length === 0) return state
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }

        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }

        default : console.log('21421421');
    }
    return state
}

const useUndo = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future, setFuture] = useState<T[]>([])
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: [],
    } as State<T> )
    
    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0
    
    // const [state, setState] = useState<{
    //     past: T[],
    //     present: T,
    //     future: T[]
    // }>({
    //     past: [],
    //     present: initialPresent,
    //     future: []
    // })


    const undo = useCallback(() => {
        dispatch({ type: UNDO })
        // setState((currentState)=> {
        //     const { past, present, future } = currentState;
        //     // if (canUndo)  return 
        //     if (past.length === 0) return currentState
        //     const previous = past[past.length - 1]
        //     const newPast =past.slice(0, past.length - 1)
            
        //     return {
        //         past: newPast,
        //         present: previous,
        //         future: [present, ...future]
        //     }
            // setPast(newPast)
            // setPresent(previous)
            // setFuture([present, ...future])
        // })   
    },[])

    const redo = useCallback(() => {
        dispatch({ type: REDO })
        // setState((currentState)=> {
        //     const { past, present, future } = currentState;
        //     if (future.length === 0) return currentState
        //     const next = future[0]
        //     const newFuture = future.slice(1)

        //     return {
        //         past: [...past, present],
        //         present: next,
        //         future: newFuture
        //     }
            // setPast([...past, present])
            // setPresent(next)
            // setFuture(newFuture)
        // })
    }, [])

    const set = useCallback((newPresent: T) => {
        dispatch({ type: SET, newPresent })
        // setState((currentState)=>{
        //     const { past, present, future } = currentState
        //     if (past.length === 0) return currentState

        //     return {
        //         past: [...past, present],
        //         present: newPresent,
        //         future: []
        //     }
            // setPast([...past, present])
            // setPresent(newPresent)
            // setFuture([])
        // })
    }, [])

    const reset = useCallback((newPresent: T) => {
        dispatch({ type: RESET, newPresent })
        // setState(()=>{
        //     return {
        //         past: [],
        //         present: newPresent,
        //         future: []
        //     }
            // etPast([])
            // setPresent(newPresent)
            // setFuture([])
        // })
    }, [])

    return [ state, {undo, redo, set, reset, canRedo, canUndo } ] as const
}

export {
    useUndo
}