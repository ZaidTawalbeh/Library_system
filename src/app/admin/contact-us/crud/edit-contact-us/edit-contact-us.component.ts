// edit-contact-us.component.ts
import { Component, inject } from '@angular/core';
import { ContactUsService } from '../../contact-us.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { EditContactUsType } from '../../types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact-us',
  templateUrl: './edit-contact-us.component.html',
  styleUrls: ['./edit-contact-us.component.css'],
})
export class EditContactUsComponent {
  contactUsService = inject(ContactUsService);
  queryClient = injectQueryClient();
  selectedFile: File | null = null; // Holds the selected file
  router: Router;

  constructor(router: Router, private toastr: ToastrService) {
    this.router = router;
  }
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.contactus],
    queryFn: () => this.contactUsService.getContactUs(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (contactUs: EditContactUsType) =>
      this.contactUsService.editContactUs(contactUs, this.selectedFile), // Pass the file
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.contactus] });
      this.router.navigate(['/admin/contactus']);

      this.toastr.success('Contact information updated');
    },
  }));

  onEditContactUs(contactUs: EditContactUsType) {
    this.mutation.mutate(contactUs);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    return this.query.error || 'An error occurred while fetching data.';
  }

  get contactUsData() {
    return this.query.data()!;
  }
}
