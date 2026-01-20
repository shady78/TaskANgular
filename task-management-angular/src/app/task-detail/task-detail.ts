import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-detail',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements OnInit {
  task?: Task;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadTask(+id);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        alert('Task not found');
        this.router.navigate(['/tasks']);
      }
    });
  }

  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks/edit', this.task.id]);
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          alert('Task deleted successfully');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'badge bg-danger';
      case 'medium': return 'badge bg-warning text-dark';
      case 'low': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'new': return 'badge bg-primary';
      case 'inprogress': return 'badge bg-info text-dark';
      case 'completed': return 'badge bg-success';
      case 'archived': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}
