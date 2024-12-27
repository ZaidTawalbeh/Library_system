import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  injectQueryClient,
  injectQuery,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { BooksService } from '../../books.service';
import { QUERYKEYS } from 'src/app/queries';
import { EditBookType } from '../../types';
import { CategoryService } from 'src/app/admin/category/category.service';
import { AuthorService } from 'src/app/admin/author/author.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number;
  router: Router;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
    private toastr: ToastrService
  ) {
    this.bookForm = this.fb.group({
      bookname: ['', Validators.required],
      languages: ['', Validators.required],
      numberofpages: [0, Validators.required],
      releasedate: [new Date(), Validators.required],
      descriptions: ['', Validators.required],
      imageFile: [''],
      quantity: [0, Validators.required],
      priceperday: [0, Validators.required],
      authorid: [0, Validators.required],
      categoryid: [0, Validators.required],
      libraryid: [0],
    });
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.router = router;
  }

  booksService = inject(BooksService);
  authorsService = inject(AuthorService);
  categoriesService = inject(CategoryService);
  queryClient = injectQueryClient();

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.bookForm.patchValue({
        imageFile: fileInput.files[0],
      });
    }
  }

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.get('id')) return;
    this.bookForm.patchValue(this.bookQuery.data()!);
  }

  editBookMutation = injectMutation((client) => ({
    mutationFn: async (updatedBookData: EditBookType) => {
      await this.booksService.editBook(this.bookId, updatedBookData);
      return;
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: [QUERYKEYS.allBooks] });
      client.refetchQueries({ queryKey: [QUERYKEYS.book, this.bookId] });
      this.toastr.success('Edited');
      this.router.navigate(['/admin/books']);
    },
  }));

  async onEditBook() {
    if (this.bookForm.valid) {
      await this.editBookMutation.mutateAsync({
        ...this.bookForm.value,
        bookid: this.bookId,
      });
    } else {
      console.log('Form is invalid');
    }
  }

  bookQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.book, this.bookId],
    //the get by id return the author as null
    // queryFn: () => this.booksService.getBookById(this.bookId),
    queryFn: async () => {
      const allBooks = await this.booksService.getAllBooks();
      const currBook = allBooks.find((book) => book.bookid === this.bookId);
      console.log(currBook);
      this.bookForm.patchValue(currBook!);
      return currBook;
    },
  }));

  authorsQuery = injectQuery(() => ({
    queryKey: ['allAuthors'],
    queryFn: () => this.authorsService.getAllAuthors(),
  }));
  categoriesQuery = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => this.categoriesService.getAllCategories(),
  }));

  get AuthorsData() {
    return this.authorsQuery.data();
  }
  get CategoriesData() {
    return this.categoriesQuery.data();
  }
}
