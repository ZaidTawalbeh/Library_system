import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { BooksService } from '../../books.service';
import { CreateBookType } from '../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/admin/category/category.service';
import { AuthorService } from 'src/app/admin/author/author.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm: FormGroup;
  router: Router;
  constructor(
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    this.bookForm = this.fb.group({
      bookname: ['', Validators.required],
      languages: ['', Validators.required],
      numberofpages: [0, Validators.required],
      releasedate: [new Date(), Validators.required],
      descriptions: ['', Validators.required],
      image: [''],
      quantity: [0, Validators.required],
      priceperday: [0, Validators.required],
      authorid: [0, Validators.required],
      categoryid: [0, Validators.required],
      // libraryid: [0, Validators.required],
    });
    this.router = router;
  }

  booksService = inject(BooksService);
  authorsService = inject(AuthorService);
  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();

  mutation = injectMutation((client) => ({
    mutationFn: (createBook: CreateBookType) =>
      this.booksService.createBook(createBook),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.allBooks] });
      this.toastr.success('created');
      this.router.navigate(['/admin/books']);
    },
  }));

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.bookForm.patchValue({
        image: fileInput.files[0],
      });
    }
  }

  onCreateBook() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      // Handle book creation logic here, e.g., API call
      console.log(bookData);
      this.mutation.mutate(this.bookForm.value);
    } else {
      // Handle form validation errors here
      console.log('Form is invalid');
    }
  }

  booksQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.allBooks],
    queryFn: () => this.booksService.getAllBooks(),
  }));

  authorsQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.allauthors],
    queryFn: () => this.authorsService.getAllAuthors(),
  }));
  categoriesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.categories],
    queryFn: () => this.categoriesService.getAllCategories(),
  }));

  get AuthorsData() {
    return this.authorsQuery.data();
  }
  get CategoriesData() {
    console.log(this.categoriesQuery.data());
    return this.categoriesQuery.data();
  }
}
