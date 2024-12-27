import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { TestimonialService } from '../../testimonial.service';
import { Testimonial } from 'src/types';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-testimonial',
  templateUrl: './all-testimonial.component.html',
  styleUrls: ['./all-testimonial.component.css'],
})
export class AllTestimonialComponent {
  constructor(private toastr: ToastrService) {}
  testimonialService = inject(TestimonialService);
  searchTerm = '';
  filter = 'Pending';

  pendingTestimonialQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.pendingtestimonial],
    queryFn: () => this.testimonialService.getPendingTestimonials(),
  }));
  acceptedTestimonialQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.acceptedtestimonial],
    queryFn: () => this.testimonialService.getAcceptedTestimonials(),
  }));

  acceptMutation = injectMutation((client) => ({
    mutationFn: async (id: number) => {
      await this.testimonialService.acceptTestimonial(id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.pendingtestimonial] });
      client.invalidateQueries({ queryKey: [QUERYKEYS.acceptedtestimonial] });
      this.toastr.success('Accepted');
    },
  }));

  deleteMutation = injectMutation((client) => ({
    mutationFn: async (id: number) => {
      await this.testimonialService.deleteTestimonial(id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.pendingtestimonial] });
      client.invalidateQueries({ queryKey: [QUERYKEYS.acceptedtestimonial] });
      this.toastr.success('Deleted');
    },
  }));

  async onAcceptTestimonial(id: number) {
    await this.acceptMutation.mutateAsync(id);
  }
  async onDeleteTestimonial(id: number) {
    await this.deleteMutation.mutateAsync(id);
  }

  onFilterChange = (val: string) => (this.filter = val);

  get PendingTestimonials() {
    return this.pendingTestimonialQuery.data();
  }

  get AcceptedTestimonials() {
    return this.acceptedTestimonialQuery.data();
  }

  get GetTestimoinals() {
    let testimoinals = [] as Testimonial[];
    if (this.filter === 'Pending')
      testimoinals = this.pendingTestimonialQuery.data() ?? [];
    // else if this.filter === 'Accepted';
    else testimoinals = this.acceptedTestimonialQuery.data() ?? [];
    // else return [...this.pendingTestimonialQuery.data()!]

    return testimoinals.filter((testi) =>
      (testi.firstname + testi.lastname).includes(this.searchTerm)
    );
  }
}
