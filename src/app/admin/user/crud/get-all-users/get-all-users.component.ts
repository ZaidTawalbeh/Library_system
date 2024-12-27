import { Component, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { IMGPATH } from 'src';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css'],
})
export class GetAllUsersComponent {
  usersService = inject(UserService);
  searchTerm = '';
  categoryFilter: string | null = null;
  LibraryFilter: string | null = null;

  query = injectQuery(() => ({
    queryKey: [QUERYKEYS.allusers],
    queryFn: () => this.usersService.getAllUsers(),
  }));
  IMGPATH = IMGPATH;

  get isLoading() {
    return this.query.isLoading();
  }

  get isError() {
    return this.query.isError();
  }

  get errorMessage() {
    console.log(this.query.error());
    return this.query.error || 'An error occurred while fetching data.';
  }

  get UsersData() {
    console.log(this.query.data());
    return this.query
      .data()
      ?.filter((user) =>
        user.email
          ?.toLocaleLowerCase()
          .includes(this.searchTerm.toLocaleLowerCase())
      );
  }
}
