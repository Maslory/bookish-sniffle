import {
  put,
  takeEvery,
  select
} from 'redux-saga/effects'
import C from '../constants/constants'
import {
  request,

} from '../actions/actions'
import axios from 'axios';
import {add_array, add_array_todo} from '../actions/actions'

function* getApiData() {
  try {
    const state = yield select(); // получаем состояние из store для отправки
    const data_users = yield axios.get("https://jsonplaceholder.typicode.com/users")
     yield put(add_array(data_users.data))
     const data_todo = yield axios.get("https://jsonplaceholder.typicode.com/todos")
     console.log(data_todo)
     yield put(add_array_todo(data_todo.data))

  } catch (e) {
    yield put(request(false))
    // getApiData()
    console.log(e)
  }
}

function* changeApiData(c: { type: string; } ){
  try {
    const state = yield select();
    if(c.type == C.REQUEST_ADDTODO){
      const data = yield axios.post("https://jsonplaceholder.typicode.com/todos",
      state.request_addTodo)
    }
    else if(c.type == C.REQUEST_CHANGEDATA){
      const data = yield axios.post("https://jsonplaceholder.typicode.com/todos",
      state.request_changeTodo)
    }
    else if(c.type == C.REMOVE_CASE){
      const data = yield axios.post("https://jsonplaceholder.typicode.com/todos",
      state.request_removeTodo)
    }
    else if(c.type == C.CHECK_TODO){
      const data = yield axios.post("https://jsonplaceholder.typicode.com/todos",
      state.request_checkTodo)
    }
  } catch (e) {
    console.log(e)
    console.log('Повторный запрос')
    changeApiData(c);
    
  }
  
}



export default function* mySagas() {
  yield takeEvery(C.REQUESTED, getApiData)
  yield takeEvery(C.CHECK_TODO, changeApiData)
  yield takeEvery(C.REQUEST_CHANGEDATA, changeApiData)
  yield takeEvery(C.REQUEST_ADDTODO, changeApiData)
  yield takeEvery(C.REMOVE_CASE, changeApiData)
}