import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { BooksComponent as AdminBooksComponent } from './admin/books/books.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AboutusComponent } from './admin/aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetAboutUsComponent } from './admin/aboutus/crud/get-about-us/get-about-us.component';
import { EditAboutUsComponent } from './admin/aboutus/crud/edit-about-us/edit-about-us.component';
import { RouterModule } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { AddBookComponent } from './admin/books/crud/add-book/add-book.component';
import { EditBookComponent } from './admin/books/crud/edit-book/edit-book.component';
import { UpdateBookComponent } from './admin/books/crud/update-book/update-book.component';
import { DeleteBookComponent } from './admin/books/crud/delete-book/delete-book.component';
import { AllBooksComponent } from './admin/books/crud/all-books/all-books.component';
import { LibraryComponent } from './admin/library/library.component';
import { AddLibraryComponent } from './admin/library/crud/add-library/add-library.component';
import { EditLibraryComponent } from './admin/library/crud/edit-library/edit-library.component';
import { AllLibrariesComponent } from './admin/library/crud/all-libraries/all-libraries.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddCategoryComponent } from './admin/category/crud/add-category/add-category.component';
import { AllCategoriesComponent } from './admin/category/crud/all-categories/all-categories.component';
import { EditCategoryComponent } from './admin/category/crud/edit-category/edit-category.component';
import { EditLibraryCategoriesComponent } from './admin/library/crud/edit-library-categories/edit-library-categories.component';
import { AuthorComponent } from './admin/author/author.component';
import { AddAuthorComponent } from './admin/author/crud/add-author/add-author.component';
import { EditAuthorComponent } from './admin/author/crud/edit-author/edit-author.component';
import { AllAuthorsComponent } from './admin/author/crud/all-authors/all-authors.component';
import { BorrowedBooksComponent } from './admin/borrowed-books/borrowed-books.component';
import { AllBorrowedBooksComponent } from './admin/borrowed-books/crud/all-borrowed-books/all-borrowed-books.component';
import { ContactUsComponent } from './admin/contact-us/contact-us.component';
import { HomePageComponent } from './admin/home-page/home-page.component';
import { OfferComponent } from './admin/offer/offer.component';
import { TestimonialComponent } from './admin/testimonial/testimonial.component';
import { GetContactUsComponent } from './admin/contact-us/crud/get-contact-us/get-contact-us.component';
import { EditContactUsComponent } from './admin/contact-us/crud/edit-contact-us/edit-contact-us.component';
import { GetHomePageComponent } from './admin/home-page/crud/get-home-page/get-home-page.component';
import { EditHomePageComponent } from './admin/home-page/crud/edit-home-page/edit-home-page.component';
import { UserComponent } from './admin/user/user.component';
import { GetAllUsersComponent } from './admin/user/crud/get-all-users/get-all-users.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';
import { GetAllFeedbackComponent } from './admin/feedback/crud/all-feedbacks/all-feedbacks.component';
import { FeedbackInfoComponent } from './admin/feedback/crud/feedback-info/feedback-info.component';
import { AllTestimonialComponent } from './admin/testimonial/crud/all-testimonial/all-testimonial.component';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AllOffersComponent } from './admin/offer/crud/all-offers/all-offers.component';
import { AddOfferComponent } from './admin/offer/crud/add-offer/add-offer.component';
import { EditOfferComponent } from './admin/offer/crud/edit-offer/edit-offer.component';
import { ReportComponent } from './admin/report/report.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdminHomeComponent } from './admin/adminHome/admin-home.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { GetAdminComponent } from './admin-profile/crud/get-admin/get-admin.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from './chart/chart/chart.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AppComponent,
    AdminBooksComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    GetAboutUsComponent,
    EditAboutUsComponent,
    AddBookComponent,
    EditBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    AllBooksComponent,
    LibraryComponent,
    AddLibraryComponent,
    EditLibraryComponent,
    AllLibrariesComponent,
    CategoryComponent,
    AddCategoryComponent,
    AllCategoriesComponent,
    EditCategoryComponent,
    EditLibraryCategoriesComponent,
    AuthorComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AllAuthorsComponent,
    BorrowedBooksComponent,
    AllBorrowedBooksComponent,
    ContactUsComponent,
    HomePageComponent,
    OfferComponent,
    TestimonialComponent,
    GetContactUsComponent,
    EditContactUsComponent,
    GetHomePageComponent,
    EditHomePageComponent,
    UserComponent,
    GetAllUsersComponent,
    FeedbackComponent,
    GetAllFeedbackComponent,
    FeedbackInfoComponent,
    AllTestimonialComponent,
    AllOffersComponent,
    AddOfferComponent,
    EditOfferComponent,
    ReportComponent,
    AdminProfileComponent,
    GetAdminComponent,
    ChartComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutusComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AngularQueryDevtools,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duration in ms
      positionClass: 'toast-top-center',
      preventDuplicates: true, // Avoid duplicate toasts
    }),
  ],
  exports: [CommonModule, FormsModule,NgApexchartsModule], // Export CommonModule for global use
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

    provideAngularQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 100000000,
            retry: 0,
          },
          mutations: {
            retry: 0,
          },
        },
      })
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
