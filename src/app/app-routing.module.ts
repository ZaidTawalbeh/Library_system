import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './admin/adminHome/admin-home.component';
import { BooksComponent } from './admin/books/books.component';
import { AboutusComponent } from './admin/aboutus/aboutus.component';
import { EditAboutUsComponent } from './admin/aboutus/crud/edit-about-us/edit-about-us.component';
import { GetAboutUsComponent } from './admin/aboutus/crud/get-about-us/get-about-us.component';
import { AllBooksComponent } from './admin/books/crud/all-books/all-books.component';
import { AddBookComponent } from './admin/books/crud/add-book/add-book.component';
import { EditBookComponent } from './admin/books/crud/edit-book/edit-book.component';
import { LibraryComponent } from './admin/library/library.component';
import { AllLibrariesComponent } from './admin/library/crud/all-libraries/all-libraries.component';
import { AddLibraryComponent } from './admin/library/crud/add-library/add-library.component';
import { EditLibraryComponent } from './admin/library/crud/edit-library/edit-library.component';
import { CategoryComponent } from './admin/category/category.component';
import { AllCategoriesComponent } from './admin/category/crud/all-categories/all-categories.component';
import { AddCategoryComponent } from './admin/category/crud/add-category/add-category.component';
import { EditCategoryComponent } from './admin/category/crud/edit-category/edit-category.component';
import { EditLibraryCategoriesComponent } from './admin/library/crud/edit-library-categories/edit-library-categories.component';
import { AuthorComponent } from './admin/author/author.component';
import { AllAuthorsComponent } from './admin/author/crud/all-authors/all-authors.component';
import { AddAuthorComponent } from './admin/author/crud/add-author/add-author.component';
import { EditAuthorComponent } from './admin/author/crud/edit-author/edit-author.component';
import { BorrowedBooksComponent } from './admin/borrowed-books/borrowed-books.component';
import { AllBorrowedBooksComponent } from './admin/borrowed-books/crud/all-borrowed-books/all-borrowed-books.component';
import { ContactUsComponent } from './admin/contact-us/contact-us.component';
import { GetContactUsComponent } from './admin/contact-us/crud/get-contact-us/get-contact-us.component';
import { EditContactUsComponent } from './admin/contact-us/crud/edit-contact-us/edit-contact-us.component';
import { HomePageComponent } from './admin/home-page/home-page.component';
import { GetHomePageComponent } from './admin/home-page/crud/get-home-page/get-home-page.component';
import { EditHomePageComponent } from './admin/home-page/crud/edit-home-page/edit-home-page.component';
import { GetAllUsersComponent } from './admin/user/crud/get-all-users/get-all-users.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';
import { GetAllFeedbackComponent } from './admin/feedback/crud/all-feedbacks/all-feedbacks.component';
import { FeedbackInfoComponent } from './admin/feedback/crud/feedback-info/feedback-info.component';
import { TestimonialComponent } from './admin/testimonial/testimonial.component';
import { AllTestimonialComponent } from './admin/testimonial/crud/all-testimonial/all-testimonial.component';
import { OfferComponent } from './admin/offer/offer.component';
import { AllOffersComponent } from './admin/offer/crud/all-offers/all-offers.component';
import { AddOfferComponent } from './admin/offer/crud/add-offer/add-offer.component';
import { EditOfferComponent } from './admin/offer/crud/edit-offer/edit-offer.component';
import { ReportComponent } from './admin/report/report.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { UserComponent } from './admin/user/user.component';
import { AdminHomeComponent } from './admin/adminHome/admin-home.component';
import { EmptyComponent } from './empty/empty.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { GetAdminComponent } from './admin-profile/crud/get-admin/get-admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      {
        path: 'profile/:id',
        component: GetAdminComponent,
      },
      {
        path: 'editProfile/:id',
        component: AdminProfileComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
        children: [
          { path: '', component: GetAboutUsComponent },
          { path: 'edit', component: EditAboutUsComponent },
        ],
      },
      {
        path: 'contactus',
        component: ContactUsComponent,
        children: [
          { path: '', component: GetContactUsComponent },
          { path: 'edit', component: EditContactUsComponent },
        ],
      },
      {
        path: 'homepage',
        component: HomePageComponent,
        children: [
          { path: '', component: GetHomePageComponent },
          { path: 'edit', component: EditHomePageComponent },
        ],
      },
      {
        path: 'books',
        component: BooksComponent,
        children: [
          { path: '', component: AllBooksComponent },
          {
            path: 'add',
            component: AddBookComponent,
          },
          {
            path: 'edit/:id',
            component: EditBookComponent,
          },
        ],
      },
      {
        path: 'library',
        component: LibraryComponent,
        children: [
          { path: '', component: AllLibrariesComponent },
          {
            path: 'add',
            component: AddLibraryComponent,
          },
          {
            path: 'editcategory/:libraryId',
            component: EditLibraryCategoriesComponent,
          },
          {
            path: 'edit/:id',
            component: EditLibraryComponent,
          },
        ],
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          { path: '', component: AllCategoriesComponent },
          {
            path: 'add',
            component: AddCategoryComponent,
          },
          {
            path: 'edit/:id',
            component: EditCategoryComponent,
          },
        ],
      },
      {
        path: 'user',
        component: UserComponent,
        children: [{ path: '', component: GetAllUsersComponent }],
      },
      {
        path: 'author',
        component: AuthorComponent,
        children: [
          { path: '', component: AllAuthorsComponent },
          {
            path: 'add',
            component: AddAuthorComponent,
          },
          {
            path: 'edit/:id',
            component: EditAuthorComponent,
          },
        ],
      },
      {
        path: 'offer',
        component: OfferComponent,
        children: [
          { path: '', component: AllOffersComponent },
          {
            path: 'add',
            component: AddOfferComponent,
          },
          {
            path: 'edit/:id',
            component: EditOfferComponent,
          },
        ],
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        children: [
          { path: '', component: GetAllFeedbackComponent },
          {
            path: 'info/:id',
            component: FeedbackInfoComponent,
          },
        ],
      },
      {
        path: 'testimonial',
        component: TestimonialComponent,
        children: [{ path: '', component: AllTestimonialComponent }],
      },
      {
        path: 'borrowed-books',
        component: BorrowedBooksComponent,
        children: [{ path: '', component: AllBorrowedBooksComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
