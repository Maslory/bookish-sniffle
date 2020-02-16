import C from '../constants/constants'

export const changeId = (id:number, name:string) =>
(
    {
        type: C.CHANGE_ID,
        id: id,
        name: name
    }
)

export const request = (boolean:boolean) => 
    (
        { 
            type: C.REQUESTED,
            boolean: boolean,
        }
    );

export const request_addTodo = (userId:number, id:number, title:string) =>
(
    {
        type: C.REQUEST_ADDTODO,
        userId: userId,
        id: id,
        title: title,
        completed: false
    }
)

export const request_сhangeData = (userId:number, id:number, title:string, completed:boolean) => 
    (
        { 
            type: C.REQUEST_CHANGEDATA,
            userId: userId,
            id: id,
            title: title,
            completed: completed
        }
    );


export const add_array = (array:any) =>
({
    type: C.ADD_ARRAY,
    array: array
})

export const edit_array = (id:number, title:string) =>
({
    type: C.EDIT_ARRAY,
    id: id,
    title: title,
})

export const check_todo  = (id:number, completed:boolean) =>
({
    type: C.CHECK_TODO,
    id: id,
    completed: completed,
})

export const remove_case = (id:number) =>
({
    type: C.REMOVE_CASE,
    id: id,
})



export const add_array_todo = (array:any) =>
({
    type: C.ADD_TODO,
    array: array
})
