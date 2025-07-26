import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";


export const App = () =>  {

    // TODO BL
    const todolistTitle1 = 'What to learn'
    const todolistTitle2 = 'What to buy'
    const tasks1: Task[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]
    const tasks2: Task[] = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
    ]

  return (
      <div className="app">
        <TodolistItem title={todolistTitle1} tasks={tasks1}/>
        <TodolistItem title={todolistTitle2} tasks={tasks2}/>
      </div>
  )
}


