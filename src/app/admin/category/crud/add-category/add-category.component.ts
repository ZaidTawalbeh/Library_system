import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { CreateCategoryType } from '../../types';
import { CategoryService } from '../../category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  router: Router;
  constructor(
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      categoryname: ['', Validators.required],
      imageFile: null,
    });
    this.router = router;
  }

  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();

  mutation = injectMutation((client) => ({
    mutationFn: async (createCategory: CreateCategoryType) => {
      console.log(createCategory);
      return this.categoriesService.createCategory(createCategory);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.categories] });
      this.toastr.success('Category created successfully');
      this.router.navigate(['/admin/category']);
    },
  }));

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);
      this.categoryForm.patchValue({
        imageFile: fileInput.files[0],
      });
      console.log(this.categoryForm.value);
    }
  }

  onCreateCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.mutation.mutate(categoryData);
    } else {
      console.log('Form is invalid');
    }
  }
}
