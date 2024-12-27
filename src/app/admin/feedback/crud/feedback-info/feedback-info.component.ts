import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { FeedbackService } from '../../feedback.service';
import { ReplyToFeedBackType } from '../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-info',
  templateUrl: './feedback-info.component.html',
  styleUrls: ['./feedback-info.component.css'],
})
export class FeedbackInfoComponent {
  router: Router;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private toastr: ToastrService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.router = router;
    console.log(this.id);
  }
  id: number;

  feedbackService = inject(FeedbackService);
  emailReplyBody = '';

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.feedback, this.id],
    queryFn: () => this.feedbackService.getAllFeedbackById(this.id),
    enabled: !!this.id,
  }));

  mutation = injectMutation((queryClient) => ({
    mutationFn: async (replyToFeedBack: ReplyToFeedBackType) => {
      this.feedbackService.replyToFeedBack(replyToFeedBack);
    },
    onSuccess: () => {
      this.toastr.success('Replied Successfully');
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: [QUERYKEYS.allfeedback] });
        queryClient.refetchQueries({ queryKey: [QUERYKEYS.feedback, this.id] });
        this.router.navigate(['/admin/feedback']);
      }, 800);
    },
  }));

  async onSendReply() {
    await this.mutation.mutateAsync({
      feedbackData: this.feedback,
      emailReplyBody: this.emailReplyBody,
    });
  }

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

  get feedback() {
    return this.query.data()!;
  }
}
