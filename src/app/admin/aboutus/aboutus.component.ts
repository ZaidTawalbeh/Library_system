import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { AboutusService } from './aboutus.service';
import { EditAboutUsType } from './types';
import { QUERYKEYS } from '../../queries';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class AboutusComponent {
  aboutusService = inject(AboutusService);
  queryClient = injectQueryClient();

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.aboutus],
    queryFn: () => this.aboutusService.getAboutUs(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (aboutUs: EditAboutUsType) =>
      this.aboutusService.editAboutUs(aboutUs),
    onSuccess: () => {
      // Invalidate and refetch todos after a successful mutation
      client.invalidateQueries({ queryKey: [QUERYKEYS.aboutus] });
    },
  }));

  onCreateAboutUs(aboutUs: EditAboutUsType) {
    // Create a new todo item
    this.mutation.mutate(aboutUs);
  }
}
