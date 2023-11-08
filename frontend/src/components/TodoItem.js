import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompletedAsync, deleteTodoAsync } from "../redux/todoSlice";
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handlecompleteClick = (e) => {
    e.target.parentNode.parentElement.parentElement.classList.add("slide-left");
    setTimeout(() => {
      e.target.parentNode.parentElement.parentElement.classList.remove(
        "slide-left"
      );
      dispatch(updateCompletedAsync({ id: id, completed: !completed }));
    }, 500);
  };
  const handleDeleteClick = (e) => {
    e.target.parentNode.parentElement.classList.add("slide-left");
    setTimeout(() => {
      e.target.parentNode.parentElement.classList.remove("slide-left");
      dispatch(deleteTodoAsync({ id: id }));
    }, 500);
  };
  return (
    <li
      className={`list-group-item slide-animation ${
        completed && "list-group-item-success  "
      }`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handlecompleteClick}></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
