import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId?: number;

  priorities = [
    { value: TaskPriority.Low, label: 'Low' },
    { value: TaskPriority.Medium, label: 'Medium' },
    { value: TaskPriority.High, label: 'High' }
  ];

  statuses = [
    { value: TaskStatus.New, label: 'New' },
    { value: TaskStatus.InProgress, label: 'In Progress' },
    { value: TaskStatus.Completed, label: 'Completed' },
    { value: TaskStatus.Archived, label: 'Archived' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // التحقق إذا كنا في وضع التعديل
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTask();
      }
    });
  }

  // تهيئة الـ Form
  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(1000)],
      dueDate: ['', Validators.required],
      priority: [TaskPriority.Medium, Validators.required],
      status: [TaskStatus.New]
    });
  }

  // تحميل بيانات المهمة في حالة التعديل
  loadTask(): void {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.split('T')[0],
            priority: this.getPriorityValue(task.priority),
            status: this.getStatusValue(task.status)
          });
        },
        error: (error) => {
          console.error('Error loading task:', error);
          alert('Failed to load task');
          this.router.navigate(['/tasks']);
        }
      });
    }
  }

  // حفظ المهمة
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

    
      if (this.isEditMode && this.taskId) {
        // تحديث
        this.taskService.updateTask(this.taskId, formValue).subscribe({
          next: () => {
            alert('Task updated successfully');
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error updating task:', error);
            alert('Failed to update task');
          }
        });
      } else {
        // إنشاء جديد
        this.taskService.createTask(formValue).subscribe({
          next: () => {
            alert('Task created successfully');
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error creating task:', error);
            alert('Failed to create task');
          }
        });
      }
    }
  }

  // إلغاء والعودة
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  // Helper methods
  getPriorityValue(priority: string): number {
    switch (priority.toLowerCase()) {
      case 'low': return TaskPriority.Low;
      case 'medium': return TaskPriority.Medium;
      case 'high': return TaskPriority.High;
      default: return TaskPriority.Medium;
    }
  }

  getStatusValue(status: string): number {
    switch (status.toLowerCase()) {
      case 'new': return TaskStatus.New;
      case 'inprogress': return TaskStatus.InProgress;
      case 'completed': return TaskStatus.Completed;
      case 'archived': return TaskStatus.Archived;
      default: return TaskStatus.New;
    }

  }
}


// شرح الـ Form:

// FormBuilder: لإنشاء Reactive Forms
// Validators: للتحقق من صحة البيانات
// patchValue: لملء الـ Form بالبيانات
// ReactiveFormsModule: مطلوب للـ Reactive Forms