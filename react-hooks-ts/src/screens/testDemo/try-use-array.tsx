import React from 'react'
import { useArray } from 'useHook/useArray';
import { useMount } from 'useHook/useMount';

export const TsReactTest = () => {
  const person: {name: string, age: number}[] =[
    {name: 'jack', age: 18},
    {name: 'tom', age: 16},
  ];
  const { value, clear, removeIndex, add } = useArray(person);
  useMount(() => {
    // console.log(value.noExist);
    // add({name: 'day'});
    // removeIndex('123');
  })
  return (
    <div>
      <button onClick={() => add({name: 'join', age: 22})}>add</button>
      <button onClick={() => removeIndex(0)}>remove</button>
      <button onClick={() => clear()}>clear</button>
      {
        value.map((person, index) => (
          <div style={{ marginBottom: '30px' }} key={index}>
            <span style={{ color: 'red' }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))
      }
    </div>
  )
}
