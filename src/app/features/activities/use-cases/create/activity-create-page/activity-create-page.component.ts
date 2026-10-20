import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityFormComponent } from '../../../components/activity-form/activity-form.component';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '@/features/activities/service/activity.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-create-page',
  standalone: true,
  imports: [ActivityFormComponent],
  templateUrl: './activity-create-page.component.html',
})
export class ActivityCreatePageComponent {
  private router = inject(Router);
  private service = inject(ActivityService);
  private messages = inject(MessageService);

save(a: Activity) {
  this.service.create(a).subscribe({
    next: () => {
      this.messages.add({ severity: 'success', summary: 'Succès', detail: 'Activité créée.' });
      this.router.navigate(['/activities']);
    },
    error: () => {
      this.messages.add({ severity: 'error', summary: 'Erreur', detail: 'Création impossible.' });
    },
  });
}
  back() {
    this.router.navigate(['/activities']);
  }


 
}