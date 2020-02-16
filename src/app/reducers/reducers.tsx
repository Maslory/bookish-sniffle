import C from "../constants/constants";
import initialState from "../store/InitialState";

export const selectId = (state = initialState.selectId, action: { type: string; id: number; name: string; }) => {
    switch(action.type){
        case C.CHANGE_ID:
            return{ id: action.id, name: action.name}
        default:
            return state
    }
}




export const request = (state = initialState.request, action: { type: string; boolean: boolean; }) => {
    switch(action.type){
        case C.REQUESTED:
            return action.boolean
        default:
            return state
    }
}

export const request_addTodo = (state = initialState.request, action: { type: string; userId: number; id: number; title: string; }) => {
  switch(action.type){
      case C.REQUEST_ADDTODO:
          return {
            userId: action.userId,
            id: action.id,
            title: action.title,
            completed: false
          }
      default:
          return state
  }
}

export const edit_todo = (state = initialState.edit_todo, action: { type: string; title: string; id: number; }) => {
  switch(action.type){
      case C.EDIT_ARRAY:
          return {
            title: action.title,
            id: action.id,
          }
      default:
          return state
  }
}



export const request_removeTodo = (state = initialState.request, action: { type: string; id: number; }) => {
  switch(action.type){
      case C.REMOVE_CASE:
          return {
            id: action.id
          }
      default:
          return state
  }
}
export const request_changeTodo = (state = initialState.request, action: { type: string; userId: number; id: number; title: string; completed: boolean; }) => {
  switch(action.type){
      case C.REQUEST_CHANGEDATA:
          return {
            userId: action.userId,
            id: action.id,
            title: action.title,
            completed: action.completed
          }
      default:
          return state
  }
}

export const request_checkTodo = (state = false, action: { type: string; id: number; completed: boolean; }) => {
  switch(action.type){
      case C.CHECK_TODO:
          return {
            id: action.id,
            completed: action.completed
          }
      default:
          return state
  }
}



export const array_case = (state = initialState.array_case, action: { type: string; array: any; }) => {
  switch (action.type) {
   
    
    case C.ADD_ARRAY:
        return action.array



    default:
      return state;
  }
};


export const array_todo = (state = initialState.array_todo, action: { type: string; userId: number; id: number; title: string; completed: boolean; array: any; }) => {
  switch (action.type) {
    case C.REQUEST_ADDTODO:
      return [...state,
        {
          userId: action.userId,
            id: action.id,
            title: action.title,
            completed: false
        }
      ]
      

    case C.CHECK_TODO:
      return state.map((todo) =>
        todo.id == action.id ?
        {
          userId: todo.userId,
          id: todo.id,
          title: todo.title,
          completed: action.completed
        }
        : todo
      );
    
    case C.ADD_TODO:
        return action.array

    case C.REMOVE_CASE:
      return state.filter((c) => c.id != action.id);
    
    case C.EDIT_ARRAY:
      return state.map((todo) =>
          todo.id == action.id ?
          {
            userId: todo.userId,
            id: todo.id,
            title: action.title,
            completed: todo.completed
          }
          : todo
        );

    

    default:
      return state;
  }
};


