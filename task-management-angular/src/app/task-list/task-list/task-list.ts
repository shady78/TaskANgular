import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { PagedResponse } from '../../models/paged-response.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList  implements OnInit{
  tasks: Task[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalRecords = 0;
  searchTerm = '';
  selectedStatus: number | undefined;
  statusOptions = [
    { value: 1, label: 'New' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Completed' },
    { value: 4, label: 'Archived' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.currentPage, this.pageSize, this.selectedStatus, this.searchTerm)
      .subscribe({
        next: (response: PagedResponse<Task>) => {
          this.tasks = response.data;
          this.currentPage = response.pageNumber;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
          alert('Failed to load tasks');
        }
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadTasks();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadTasks();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTasks();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTasks();
    }
  }

  viewTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          alert('Task deleted successfully');
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        }
      });
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'badge bg-danger';
      case 'medium': return 'badge bg-warning';
      case 'low': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'new': return 'badge bg-primary';
      case 'inprogress': return 'badge bg-info';
      case 'completed': return 'badge bg-success';
      case 'archived': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}