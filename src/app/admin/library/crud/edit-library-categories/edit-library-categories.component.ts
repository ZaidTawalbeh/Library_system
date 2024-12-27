import { Component, inject } from '@angular/core';
import { LibraryService } from '../../library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { ActivatedRoute } from '@angular/router';
import { QUERYKEYS } from 'src/app/queries';
import { Category, LibraryCategory } from 'src/types';
import { EditLibraryCategory } from '../../types';
import { CategoryService } from 'src/app/admin/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-library-categories',
  templateUrl: './edit-library-categories.component.html',
  styleUrls: ['./edit-library-categories.component.css'],
})
export class EditLibraryCategoriesComponent {
  bookForm: FormGroup;
  id: number | null = null;
  categoryNameToAdd: string = '';
  searchTerm: string = '';
  libraryService = inject(LibraryService);
  categoryService = inject(CategoryService);
  queryClient = injectQueryClient();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // Initialize form with validation
    this.bookForm = this.fb.group({
      bookname: ['', Validators.required],
    });
  }

  addCategoryMutation = injectMutation((client) => ({
    mutationFn: async (editLibraryCategory: EditLibraryCategory) =>
      this.libraryService.addLibraryCategory(editLibraryCategory),
    onSuccess: () => {
      client.refetchQueries({ queryKey: [QUERYKEYS.categories] });
      client.refetchQueries({ queryKey: [QUERYKEYS.librarycategories] });
      this.toastr.success('Category added successfully');
    },
  }));

  removeCategoryMutation = injectMutation((client) => ({
    mutationFn: async (libraryCategoryId: number) =>
      this.libraryService.deleteLibraryCategory(libraryCategoryId),
    onSuccess: () => {
      client.refetchQueries({ queryKey: [QUERYKEYS.categories] });
      client.refetchQueries({ queryKey: [QUERYKEYS.librarycategories] });
      this.toastr.success('Category removed successfully');
    },
  }));

  allCategoriesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.categories],
    queryFn: async () => {
      const categories = await this.categoryService.getAllCategories();
      return categories;
    },
  }));

  allLibrariesCategories = injectQuery(() => ({
    queryKey: [QUERYKEYS.librarycategories],
    queryFn: async () => {
      const libraryCategories =
        await this.categoryService.getAllLibrariesCategories();
      return libraryCategories;
    },
  }));

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('libraryId') ?? 0);
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.bookForm.patchValue({
        image: fileInput.files[0],
      });
    }
  }

  get isLoading() {
    return this.allCategoriesQuery.isLoading();
  }

  get isError() {
    return this.allCategoriesQuery.isError();
  }

  get errorMessage() {
    console.log(this.allCategoriesQuery.error);
    return (
      this.allCategoriesQuery.error || 'An error occurred while fetching data.'
    );
  }

  get LibraryCategoriesData() {
    // console.log(this.allLibrariesCategories.data());
    const libraryCategoriesIds = this.allLibrariesCategories
      .data()
      ?.filter(
        (libcat) =>
          libcat.libraryid === +this.route.snapshot.paramMap.get('libraryId')!
      )
      .map((libcat) => libcat.categoryid);

    // console.log('librarCategoriesIds', libraryCategoriesIds);

    return this.allCategoriesQuery
      .data()
      ?.filter(
        (category: Category) =>
          libraryCategoriesIds?.includes(category.categoryid) &&
          category.categoryname
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
  }

  get AvailableCategoriesToAdd() {
    const libraryCategoriesIds = this.LibraryCategoriesData?.map(
      (c) => c.categoryid
    );

    return this.allCategoriesQuery
      .data()
      ?.filter(
        (category: Category) =>
          !libraryCategoriesIds?.includes(category.categoryid)
      );
  }

  async onAddCategory(categoryName: string | null) {
    if (!categoryName) {
      this.toastr.warning('Please select a category before adding.');
      return;
    }

    const selectedCategory = this.AvailableCategoriesToAdd?.find(
      (categ) => categ.categoryname === categoryName
    );

    if (!selectedCategory) {
      this.toastr.warning('Selected category is invalid or already added.');
      return;
    }

    const { categoryid } = selectedCategory;

    await this.addCategoryMutation.mutateAsync({
      categoryid,
      libraryid: this.id!,
    });
  }

  async onRemoveCategory(categoryId: number) {
    const libraryCategory = this.allLibrariesCategories
      .data()
      ?.find(
        (libcat) =>
          libcat.categoryid === categoryId && libcat.libraryid === this.id
      );

    if (!libraryCategory) {
      this.toastr.warning('Category not found or already removed.');
      return;
    }

    await this.removeCategoryMutation.mutateAsync(
      libraryCategory.librarycategoryid
    );
  }
}
