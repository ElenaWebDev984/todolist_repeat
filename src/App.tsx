import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {pink, purple} from "@mui/material/colors";


export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [todolistId: string]: Task[]
}


export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
        ],
    })


    // TODO BLL

    // TODO - Create

    const createTask = (title: Todolist['title'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatedTasks = [...tasks[todolistId], newTask]
        const nextTasksState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextTasksState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }

    // TODO - Update

    const changeTaskStatus = (taskId: Task['id'], newStatus: Task['isDone'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        const nextState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)})
    }

    const changeTaskTitle = (taskId: Task['id'], newTitle: Task['title'], todolistId: Todolist['id']) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }

    // TODO - Delete:

    const deleteTask = (taskId: Task['id'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.filter(task => task.id !== taskId)
        const nextState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeTodolistFilter = (filter: FilterValues, todolistId: Todolist['id']) => {
        const nextState = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        setTodolists(nextState)
    }

    const changeTodolistTitle = (newTitle: Todolist['title'], todolistId: Todolist['id']) => {
        const nextState = todolists.map(todolist => todolist.id === todolistId ? {
            ...todolist,
            title: newTitle
        } : todolist)
        setTodolists(nextState)
    }

    const deleteTodolist = (todolistId: Todolist['id']) => {
        const nextState = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(nextState)
    }

    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: Todolist = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        const nextState = [...todolists, newTodolist]
        setTodolists(nextState)
        setTasks({...tasks, [newTodolistId]: []})
    }


    //   TODO UI - Read

    const theme = createTheme({
        palette: {
            primary: pink,
            secondary: purple,
        },
    })

    const todolistsComponents = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.id]
        if (todolist.filter === 'active') {
            filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            filteredTasks = tasks[todolist.id].filter(task => task.isDone)
        }

        return (
            <Grid key={todolist.id}>
                <Paper elevation={3}
                       sx={{p: '15px', borderRadius: '5px', backgroundColor: '#fbf8fa', border: '2px solid gray'}}>
                    <TodolistItem key={todolist.id}
                                  todolistId={todolist.id}
                                  title={todolist.title}
                                  tasks={filteredTasks}
                                  filter={todolist.filter}
                                  deleteTask={deleteTask}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  deleteTodolist={deleteTodolist}
                                  changeTodolistFilter={changeTodolistFilter}
                                  changeTodolistTitle={changeTodolistTitle}/>
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={containerSx}>
                            <NavButton color="inherit">Sign in</NavButton>
                            <NavButton color="inherit">Sign up</NavButton>
                            <NavButton color="inherit" background={theme.palette.secondary.dark}>FAQ</NavButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth='lg'>
                    <Grid container
                          sx={{m: '20px'}}>
                        <CreateItemForm createItem={createTodolist}
                                        maxItemTitleLength={15}/>
                    </Grid>
                    <Grid container
                          spacing={8}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}


