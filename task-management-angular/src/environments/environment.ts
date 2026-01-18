export const environment = {
  production: false,
  apiUrl: 'https://localhost:7000/api'
};


// 3. Data Binding

// {{ }}: Interpolation (عرض البيانات)
// []: Property Binding (ربط خاصية)
// (): Event Binding (التعامل مع الأحداث)
// [()]: Two-way Binding (ربط ثنائي الاتجاه)

// 4. Directives (التوجيهات)

// *ngFor: Loop على array
// *ngIf: شرط لعرض العنصر
// [ngClass]: إضافة classes ديناميكية

// 5. Routing (التوجيه)

// للتنقل بين الصفحات
// routerLink: للربط بين الصفحات
// ActivatedRoute: لقراءة الـ parameters

// 6. Forms

// Template-driven: باستخدام [(ngModel)]
// Reactive: باستخدام FormGroup (أكثر احترافية)

// 7. Observables

// للتعامل مع Async operations
// استخدم subscribe للحصول على البيانات
// جزء من RxJS library