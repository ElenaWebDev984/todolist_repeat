import {v1} from 'uuid'
import { expect, test } from 'vitest'
import type {Todolist} from '../App'
import {createTodolistAC, deleteTodolistAC, todolistsReducer} from "./todolists-reducer.ts";
// import {DeleteTodolistActionType} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. TODO Стартовый state
    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. TODO Действие

    // TODO variant 1
    // const action = {
    //     type: 'delete_todolist' as const,
    //     payload: {
    //         id: todolistId1,
    //     },
    // }
    // TODO variant 2
    // const action: deleteTodolistActionType = {
    //     type: 'delete_todolist',
    //     payload: {
    //         id: todolistId1,
    //     },
    // }
    // TODO variant 1
    // const action: deleteTodolistActionType = deleteTodolistAC(todolistId1)
    // const endState = todolistsReducer(startState, action)
    // TODO variant 2
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))


    // 3. TODO Проверка, что действие измененило state соответствующим образом
    // TODO в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // TODO удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})