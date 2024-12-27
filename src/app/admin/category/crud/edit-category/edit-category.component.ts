import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import {
  injectQuery,
  injectQueryClient,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCategoryType, EditCategoryType } from '../../types';
import { QUERYKEYS } from 'src/app/queries';
import { Category } from 'src/types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedFile: File | null = null;
  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();
  router: Router;
  id: number = -1;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    // Initialize form with validation
    this.categoryForm = this.fb.group({
      categoryname: [''],
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
    const data = this.categoryQuery.data()!;
    if (!data) return;
    this.categoryForm.patchValue(data);
  }

  // Query to fetch category data by ID
  categoryQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.categories,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const category = await this.categoriesService.getCategoryById(
        +(this.route.snapshot.paramMap.get('id') ?? 0)
      );
      if (category) {
        this.categoryForm.patchValue(category);
      }
      return category;
    },
  }));

  mutation = injectMutation((client) => ({
    mutationFn: async (updatedCategory: EditCategoryType) => {
      return await this.categoriesService.editCategory({
        ...updatedCategory,
        categoryid: +(this.route.snapshot.paramMap.get('id') ?? 0),
        image: this.selectedFile ?? undefined,
      });
    },
    onSuccess: () => {
      client.refetchQueries({
        queryKey: [
          QUERYKEYS.categories,
          +(this.route.snapshot.paramMap.get('id') ?? -1),
        ],
      });
      client.refetchQueries({
        queryKey: [QUERYKEYS.categories],
      });
      this.toastr.success('Category edited successfully');
      this.router.navigate(['/admin/category']);
    },
  }));

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview the selected image by setting it as the form control's value
      const reader = new FileReader();
      reader.onload = () => {
        this.categoryForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Submit the updated category data
  onEditCategory() {
    if (this.categoryForm.valid) {
      this.mutation.mutate(this.categoryForm.value);
    } else {
      this.toastr.success('Please Fill All Values');
    }
  }
}
