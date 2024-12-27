import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  injectQuery,
  injectQueryClient,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAuthorType } from '../../types';
import { AuthorService } from '../../author.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;
  id: number | null = null;
  image: File | null = null;
  authorsService = inject(AuthorService);
  queryClient = injectQueryClient();
  private router: Router;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    // Initialize form with validation
    this.authorForm = this.fb.group({
      authorname: ['', Validators.required],
      bio: ['', Validators.required],
    });
    this.router = router;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (!this.route.snapshot.paramMap.get('id')) {
    }
    this.fillData();
  }

  fillData() {
    const data = this.authorQuery.data()!;
    if (!data) return;
    this.authorForm.patchValue(data);
  }

  // Query to fetch author data by ID
  authorQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.authors,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const author = await this.authorsService.getAuthorById(
        +(this.route.snapshot.paramMap.get('id') ?? 0)
      );
      if (author) this.authorForm.patchValue(author);
      return author;
    },
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (updatedAuthor: CreateAuthorType) =>
      this.authorsService.editAuthor({
        ...updatedAuthor,
        image: this.image ?? undefined,
        authorid: +(this.route.snapshot.paramMap.get('id') ?? -1),
      }), // Update the author by ID
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.allauthors] });
      this.router.navigate(['/admin/author']); // Replace with your target route
      this.toastr.success('Author edited successfully');
    },
  }));

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
    }
  }

  // Submit the updated author data
  onEditAuthor() {
    if (this.authorForm.valid) {
      this.mutation.mutate(this.authorForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
