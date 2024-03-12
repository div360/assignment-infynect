import { Component, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../ToDo';
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  @Output() todoAdd: EventEmitter<ToDo> = new EventEmitter();
  taskname: string;
  desc: string;
  priority: string;
  startDate: string;
  endDate: string;
  showDialog = false; // Initially hidden

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

  onSubmit() {
    const todo: ToDo = {
      sno: Math.random(), // Generate a random serial number
      taskname: this.taskname,
      taskdesc: this.desc,
      priority: this.priority,
      startDate: this.startDate,
      endDate: this.endDate,
      status: 'Open'
    };

    this.todoAdd.emit(todo);
  }
}
