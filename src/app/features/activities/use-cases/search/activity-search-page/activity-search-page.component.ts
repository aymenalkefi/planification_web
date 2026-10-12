import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ActivityService } from '../../../service/activity.service';
import { Activity } from '../../../models/activity.model';
import { ActivitySearchCriteria } from '../../../models/activity-search-criteria.model';
import { ActivitySearchFormComponent } from '../activity-search-form/activity-search-form.component';

@Component({
  selector: 'app-activity-search-page',
  standalone: true,
  imports: [
    TableModule, ButtonModule, ConfirmDialogModule, MultiSelectModule,
    FormsModule, ActivitySearchFormComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './activity-search-page.component.html',
})
export class ActivitySearchPageComponent {
  private service = inject(ActivityService);
  private router = inject(Router);
  private confirm = inject(ConfirmationService);
  private messages = inject(MessageService);

  activities = signal<Activity[]>([]);
  total = signal(0);
  loading = signal(false);

  first = 0;
  rows = 10;
  private sortField = 'id';
  private sortOrder = 1;
  private criteria: ActivitySearchCriteria = {};

  cols = [
    { field: 'id', header: 'id' },
    { field: 'name', header: 'Nom' },
    { field: 'description', header: 'Description' },
    { field: 'durationMinutes', header: 'Durée (min)' },
  ];
  selectedCols = [...this.cols];

  onLazyLoad(e: TableLazyLoadEvent) {
    this.first = e.first ?? 0;
    this.rows = e.rows ?? 10;
    if (typeof e.sortField === 'string') {
      this.sortField = e.sortField;
      this.sortOrder = e.sortOrder ?? 1;
    }
    this.load();
  }

  search(criteria: ActivitySearchCriteria) {
    this.criteria = criteria;
    this.first = 0;
    this.load();
  }

  private load() {
    this.loading.set(true);
    const page = Math.floor(this.first / this.rows);
    const sort = `${this.sortField},${this.sortOrder === 1 ? 'asc' : 'desc'}`;

    this.service.searchPaged(this.criteria, page, this.rows, sort).subscribe({
      next: res => {
        this.activities.set(res.content);
        this.total.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  create()              { this.router.navigate(['/activities/new']); }
  consult(a: Activity)  { this.router.navigate(['/activities', a.id]); }
  edit(a: Activity)     { this.router.navigate(['/activities', a.id, 'edit']); }

  remove(a: Activity) {
    this.confirm.confirm({
      header: 'Confirmation',
      message: `Supprimer « ${a.name} » ?`,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.service.delete(a.id!).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: 'Succès', detail: 'Activité supprimée.' });
            this.load();
          },
          error: () => {
            this.messages.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression impossible.' });
          },
        });
      },
    });
  }
}