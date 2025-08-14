import {v1} from 'uuid'
import { expect, test } from 'vitest'
import type {Todolist} from '../App'
import {DeleteTodolistAC, DeleteTodolistActionType, todolistsReducer} from "./todolists-reducer.ts";
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
    // const action: DeleteTodolistActionType = {
    //     type: 'delete_todolist',
    //     payload: {
    //         id: todolistId1,
    //     },
    // }
    const action: DeleteTodolistActionType = DeleteTodolistAC()

    const endState = todolistsReducer(startState, action)

    // 3. TODO Проверка, что действие измененило state соответствующим образом
    // TODO в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // TODO удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})