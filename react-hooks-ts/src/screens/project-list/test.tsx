import React, { useEffect, useState } from 'react'



const test = () => {
    let num = 0;
    const effect = () => {
        num += 1
        const message = `现在的num值: ${num}`
        return function unmount () {
            console.log(message);
        }
    }
    return effect
}

const add = test()
const unmount = add()
add()
add()
add()
unmount()


// react hook 与闭包, hook 与闭包经典的坑
export const Test = () => {
    const [num, setNum] =useState(0);
    const add = () => {
        setNum(num + 1)
    }

    useEffect(() => {
        setInterval(()=>{
            console.log(num, '----time---');
        }, 1000)
    }, [num])

    useEffect(() => {
        return () => console.log('unMount',num);
    },[num])

    return <div>
        <button onClick={add}>add</button>
        <p>
            number: {num}
        </p>
    </div>
}