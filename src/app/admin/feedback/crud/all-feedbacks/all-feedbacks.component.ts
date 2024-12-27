import { Component, OnInit, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { FeedbackService } from '../../feedback.service'; // Adjust the path to your FeedbackService
import { FeedBack } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.css'],
})
export class GetAllFeedbackComponent {
  feedbackService = inject(FeedbackService);
  searchTerm = '';
  filter = '';
  rotuer: Router;
  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allfeedback], // Adjust the query key
    queryFn: () => this.feedbackService.getAllFeedback(), // Call the method to get all feedback
  }));

  constructor(router: Router) {
    this.rotuer = router;
  }

  onFilterChange = (val: string) => (this.filter = val);
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

  get PendingFeedbackData() {
    return this.query
      .data()
      ?.filter(
        (feedback: FeedBack) =>
          feedback.email
            ?.toLocaleLowerCase()
            .includes(this.searchTerm.toLocaleLowerCase()) &&
          feedback.status
            .toLocaleLowerCase()
            .includes(this.filter.toLowerCase())
      );
  }
}
