import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {
  showDialog = false; // Initially hidden
  toggleDialog() {
    this.showDialog = !this.showDialog;
  }
}
