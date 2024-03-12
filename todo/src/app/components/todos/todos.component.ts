import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {ToDo} from '../../ToDo';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TableModule, CommonModule, AddTodoComponent, EditTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: ToDo[];
  @Output() todoDelete: EventEmitter<ToDo> = new EventEmitter();
  constructor() {
    this.todos = [
      {
        sno: 1,
        taskname: 'Task 1',
        taskdesc: 'This is Task 1',
        priority: 'High',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
        status: 'Open'
      },
      {
        sno: 2,
        taskname: 'Task 2',
        taskdesc: 'This is Task 2',
        priority: 'Medium',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
        status: 'Open'
      },
      {
        sno: 3,
        taskname: 'Task 3',
        taskdesc: 'This is Task 3',
        priority: 'Low',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
        status: 'Open'
      }
    ]
  }

  deleteTodo(todo: ToDo){
    this.todos = this.todos.filter(t => t !== todo);
  }

  addTodo(todo: ToDo) {
    todo.sno = this.todos.length + 1;
    this.todos.push(todo);
  }

  onClick(todo: ToDo){
    this.deleteTodo(todo);
    this.todoDelete.emit(todo);
  }

}
