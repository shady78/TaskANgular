import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/task.model';
import { PagedResponse } from '../models/paged-response.model';
// : بتخلي الـ class ده قابل للحقن في أي component
// HttpClient: المسؤول عن إرسال HTTP Requests
// Observable: بيرجع Stream من البيانات (Async)
// HttpParams: لبناء Query Parameters

@Injectable({
  providedIn: 'root'  // الخدمة دي متاحة في كل التطبيق
})

export class TaskService {
  // عنوان الـ API
  private apiUrl = 'https://localhost:7000/api/AppTasks';

  constructor(private http: HttpClient) { }

  // جلب كل المهام مع Pagination و Filter
  getTasks(pageNumber: number = 1, pageSize: number = 10, status?: number, searchTerm?: string): Observable<PagedResponse<Task>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (status !== undefined && status !== null) {
      params = params.set('status', status.toString());
    }

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<PagedResponse<Task>>(this.apiUrl, { params });
  }

  // جلب مهمة واحدة بالـ ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // إنشاء مهمة جديدة
  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // تحديث مهمة
  updateTask(id: number, task: UpdateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // حذف مهمة
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  
}
}

