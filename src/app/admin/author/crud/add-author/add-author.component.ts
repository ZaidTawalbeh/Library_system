import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectQueryClient,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { CreateAuthorType } from '../../types';
import { AuthorService } from '../../author.service';
import { QUERYKEYS } from 'src/app/queries';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
})
export class AddAuthorComponent {
  authorForm: FormGroup;
  router: Router;

  authorsService = inject(AuthorService);
  queryClient = injectQueryClient();
  constructor(
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    this.router = router;
    // Initialize form with validation
    this.authorForm = this.fb.group({
      authorname: ['', Validators.required],
      bio: ['', Validators.required],
      image: [''],
    });
  }

  mutation = injectMutation((client) => ({
    mutationFn: (newAuthor: CreateAuthorType) =>
      this.authorsService.createAuthor(newAuthor),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.allauthors] });
      this.router.navigate(['/admin/author']);
      this.toastr.success('Author created successfully');
    },
  }));

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.authorForm.patchValue({
        image: fileInput.files[0],
      });
    }
  }

  // Submit the new author data
  onCreateAuthor() {
    if (this.authorForm.valid) {
      this.mutation.mutate(this.authorForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
