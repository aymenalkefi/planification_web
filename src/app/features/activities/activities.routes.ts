import { Routes } from '@angular/router';

export const ACTIVITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./use-cases/search/activity-search-page/activity-search-page.component')
        .then(m => m.ActivitySearchPageComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./use-cases/create/activity-create-page/activity-create-page.component')
        .then(m => m.ActivityCreatePageComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./use-cases/edit/activity-edit-page/activity-edit-page.component')
        .then(m => m.ActivityEditPageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./use-cases/consult/activity-consult-page/activity-consult-page.component')
        .then(m => m.ActivityConsultPageComponent),
  },
];