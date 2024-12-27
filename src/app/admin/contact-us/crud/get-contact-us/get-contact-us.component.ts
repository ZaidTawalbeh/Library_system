import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { ContactUsService } from '../../contact-us.service';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-get-contact-us',
  templateUrl: './get-contact-us.component.html',
  styleUrls: ['./get-contact-us.component.css'],
})
export class GetContactUsComponent {
  contactus = inject(ContactUsService);
  queryClient = injectQueryClient();
  IMGPATH = IMGPATH;

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.contactus],
    queryFn: () => this.contactus.getContactUs(),
  }));

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    console.log(this.query.error());
    return this.query.error || 'An error occurred while fetching data.';
  }

  get contactUsData() {
    return this.query.data();
  }
}
