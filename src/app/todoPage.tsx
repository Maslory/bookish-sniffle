import React from "react";
import "../style/style.sass";
import { connect } from "react-redux";
import {
  request,
  edit_array,
  remove_case,
  request_сhangeData,
  request_addTodo,
  check_todo
} from "./actions/actions";

let obj: any = "";

export const TodoPage = (props: any) => {
  const textarea_note = (event: any) => {
    let min_line_count = 2;
    let line_height = 15;
    if (event.target.scrollTop > 0) {
      event.target.style.height = event.target.scrollHeight + "px";
    }
    let min_line_height = min_line_count * line_height;
    let obj = event.target;
    let div = document.getElementById(obj.id + "_div");
    if (div == null) {
      return;
    }
    div.innerHTML = obj.value;
    let obj_height = div.offsetHeight;
    if (event.keyCode == 13) obj_height += line_height;
    else if (obj_height < min_line_height) obj_height = min_line_height;
    obj.style.height = obj_height + 5 + "px";
  };

  const edit_todo = (event: any) => {
    const current_target = event.currentTarget;
    const id = current_target.parentNode;
    props.edit_array(id.getAttribute("id"), current_target.value);
  };

  const add_todoCase = (event: any) => {
    const title = event.currentTarget.parentNode.childNodes[0].value;
    let max = 0;
    for (let i = 0; i < props.array_todo.length; i++) {
      if (props.array_todo[i].userId == props.id.id) {
        if (props.array_todo[i].id > max) max = props.array_todo[i].id;
      }
    }
    props.request_addTodo(props.id.id, max + 1, title);
  };

  const deleteCase = (event: any) => {
    const current_target = event.currentTarget;
    const id = current_target.parentNode;
    props.remove_case(id.getAttribute("id"));
  };

  const open_edit = (event: any) => {
    if (obj != "") {
      return;
    }
    const current_target = event.currentTarget.parentNode.childNodes[4];
    current_target.classList.add("active");
    obj = current_target;
    document.addEventListener("click", menuCloseClickOutside);
  };

  function menuCloseClickOutside(event: any) {
    if (!event.target.matches(".todo_input, .todo_input *")) {
      obj.classList.remove("active");
      props.request_сhangeData(
        props.id.id,
        obj.parentNode.getAttribute("id"),
        obj.value,
        obj.parentNode.childNodes[0].childNodes[0].checked
      );
      document.removeEventListener("click", menuCloseClickOutside);
      obj = "";
    }
  }

  const checkInput = (event: any) => {
    props.check_todo(
      event.currentTarget.parentNode.getAttribute("id"),
      !event.currentTarget.childNodes[0].checked
    );
  };

  const completedUnfinished = () => {
    const array = props.array_todo.filter(
      (item: { userId: any }) => item.userId == props.id.id
    );
    let unfinished = array.filter(
      (c: { completed: boolean }) => c.completed == false
    );
    let completed = array.filter(
      (c: { completed: boolean }) => c.completed == true
    );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontWeight: "normal"
        }}
      >
        <span style={{ color: "green" }}>
          Завершенные дела: {completed.length}
        </span>
        <span style={{ color: "tomato" }}>
          Незавершенные дела: {unfinished.length}
        </span>
      </div>
    );
  };

  return (
    <div className="todolist_page">
      <div style={{ position: "absolute", left: "5%", fontSize: "xx-large" }}>
        Мои Дела
      </div>
      <div style={{ width: "100%", textAlign: "right", fontWeight: "bold" }}>
        {props.id.name} {completedUnfinished()}
      </div>

      <ul className="todolist">
        {typeof props.id.id == "string"
          ? props.array_todo.map(
              (
                elem: {
                  userId: number;
                  completed: boolean;
                  id: any;
                  title: string;
                },
                key: number
              ) =>
                elem.userId == props.id.id ? (
                  <li
                    className="todo_li"
                    style={{ color: elem.completed ? "green" : "red" }}
                    key={key}
                    id={elem.id}
                  >
                    <div onClick={checkInput}>
                      <input
                        className="check_box"
                        type="checkbox"
                        checked={elem.completed}
                        readOnly
                      ></input>
                      <label></label>
                    </div>

                    <div className="title">{elem.title} </div>

                    <button className="todo_edit" onClick={open_edit}>
                      <img
                        style={{ width: 20, height: 20 }}
                        src={require("../img/edit.png")}
                        alt=""
                      />
                    </button>
                    <button onClick={deleteCase} className="todo_edit">
                      {" "}
                      <img
                        style={{ width: 20, height: 15 }}
                        src={require("../img/iconmonstr-trash-can-1.svg")}
                        alt="Удалить"
                      />
                    </button>
                    <textarea
                      className="todo_input"
                      onChange={edit_todo}
                      style={{
                        fontSize: "x-large",
                        position: "absolute",
                        left: 15,
                        top: "5%",
                        width: "80%",
                        maxWidth: "700px",
                        resize: "none",
                        wordBreak: "break-word"
                      }}
                      value={elem.title}
                    ></textarea>
                  </li>
                ) : null
            )
          : null}
      </ul>
      {typeof props.id.id == "string" ? (
        <div className="contact-form__input-wrapper">
          <textarea
            id="text_area"
            className="contact-form__input contact-form__text"
            name="text"
            onKeyUp={textarea_note}
            placeholder="Введите ваше сообщение"
          ></textarea>
          <div id="text_area_div"></div>
          <button className="button_add_textarea" onClick={add_todoCase}>
            Добавить
          </button>
        </div>
      ) : null}
    </div>
  );
};

function mapStateToProps(state: {
  array_case: any;
  array_todo: any;
  selectId: any;
  request: any;
}) {
  return {
    array_users: state.array_case,
    array_todo: state.array_todo,
    id: state.selectId,
    boolean: state.request
  };
}

function mapDispatchToProps(
  dispatch: (arg0: {
    type: string;
    boolean?: boolean;
    id?: number;
    title?: string;
    userId?: number;
    completed?: boolean;
  }) => any
) {
  return {
    request: (bool: boolean) => dispatch(request(bool)),
    edit_array: (id: number, title: string) => dispatch(edit_array(id, title)),
    remove_case: (id: number) => dispatch(remove_case(id)),
    request_addTodo: (userId: number, id: number, title: string) =>
      dispatch(request_addTodo(userId, id, title)),
    request_сhangeData: (
      userId: number,
      id: number,
      title: string,
      completed: boolean
    ) => dispatch(request_сhangeData(userId, id, title, completed)),
    check_todo: (id: number, completed: boolean) =>
      dispatch(check_todo(id, completed))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
