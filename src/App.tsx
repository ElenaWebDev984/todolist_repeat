import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";


export const App = () =>  {

    // TODO BLL
    const todolistTitle = 'What to learn'
    const tasks: Task[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]


  //   TODO UI
  return (
      <div className="app">
        <TodolistItem title={todolistTitle} tasks={tasks}/>
      </div>
  )
}


