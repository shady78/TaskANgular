import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list/task-list';
import { TaskForm } from './task-form/task-form/task-form';
import { TaskDetail } from './task-detail/task-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/:id', component: TaskDetail },  
  { path: 'tasks/edit/:id', component: TaskForm },
  { path: '**', redirectTo: '/tasks' }
];


// شرح الـ Routes:

// path: '': المسار الافتراضي
// redirectTo: إعادة التوجيه
// pathMatch: 'full': مطابقة كاملة
// :id: Parameter ديناميكي