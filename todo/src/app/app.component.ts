import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import {TodosComponent} from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TableModule } from 'primeng/table';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosComponent , CommonModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
}
