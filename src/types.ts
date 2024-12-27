export type Book = {
  bookid: number;
  bookname?: string;
  languages?: string;
  numberofpages?: number;
  releasedate?: Date;
  descriptions?: string;
  image?: string;
  quantity?: number;
  priceperday?: number;
  authorid?: number;
  categoryid?: number;
  libraryid?: number;

  author?: Author;
  category?: Category;
  library?: Library;
  bookreviews: BookReview[];
  borrowedbooks: BorrowedBook[];
  favoritebooks: FavoriteBook[];
};

export type Author = {
  authorid: number;
  authorname?: string;
  bio?: string;
  image?: string;
  books: Book[];
};

export type Category = {
  categoryid: number; // Equivalent to decimal Categoryid
  categoryname: string; // Equivalent to string Categoryname
  iconpath?: string; // Equivalent to string? Iconpath
  books: Book[]; // Equivalent to ICollection<Book> Books
  librarycategories: LibraryCategory[]; // Equivalent to ICollection<Librarycategory> Librarycategories
};

export type LibraryCategory = {
  librarycategoryid: number; // Equivalent to decimal Librarycategoryid
  libraryid?: number; // Equivalent to decimal? Libraryid
  categoryid?: number; // Equivalent to decimal? Categoryid
  category?: Category; // Equivalent to virtual Category? Category
  library?: Library; // Equivalent to virtual Library? Library
};

export type Library = {
  libraryid: number; // Equivalent to decimal Libraryid
  name?: string; // Equivalent to string? Name
  email?: string; // Equivalent to string? Email
  image?: string; // Equivalent to string? Image
  phonenumber?: string; // Equivalent to string? Phonenumber
  longitude?: string; // Equivalent to string? Longitude
  latitude?: string; // Equivalent to string? Latitude
  createdat?: Date; // Equivalent to DateTime? Createdat

  books: Book[]; // Equivalent to ICollection<Book> Books
  borrowedbooks: BorrowedBook[]; // Equivalent to ICollection<Borrowedbook> Borrowedbooks
  librarycategories: LibraryCategory[]; // Equivalent to ICollection<Librarycategory> Librarycategories
  libraryratings: LibraryRating[]; // Equivalent to ICollection<Libraryrating> Libraryratings
  offers: Offer[]; // Equivalent to ICollection<Offer> Offers
};

export type BorrowedBook = {
  id: number; // Equivalent to decimal Id
  borrowingdate?: Date; // Equivalent to DateTime? Borrowingdate
  duedate?: Date; // Equivalent to DateTime? Duedate
  amount?: number; // Equivalent to decimal? Amount
  createdat?: Date; // Equivalent to DateTime? Createdat
  status?: string; // Equivalent to string? Status
  bookid?: number; // Equivalent to decimal? Bookid
  userid?: number; // Equivalent to decimal? Userid
  libraryid?: number; // Equivalent to decimal? Libraryid

  book?: Book; // Equivalent to virtual Book? Book
  library?: Library; // Equivalent to virtual Library? Library
  user?: User; // Equivalent to virtual User? User
  paidfees: PaidFee[]; // Equivalent to ICollection<Paidfee> Paidfees
};

export type BookReview = {
  id: number; // Equivalent to decimal Id
  rating?: string; // Equivalent to string? Rating
  comments?: string; // Equivalent to string? Comments
  createdat?: Date; // Equivalent to DateTime? Createdat
  userid?: number; // Equivalent to decimal? Userid
  bookid?: number; // Equivalent to decimal? Bookid

  book?: Book; // Equivalent to virtual Book? Book
  user?: User; // Equivalent to virtual User? User
};

export type FavoriteBook = {
  favoritebookid: number; // Equivalent to decimal Favoritebookid
  bookid?: number; // Equivalent to decimal? Bookid
  userid?: number; // Equivalent to decimal? Userid
  createdat?: Date; // Equivalent to DateTime? Createdat

  book?: Book; // Equivalent to virtual Book? Book
  user?: User; // Equivalent to virtual User? User
};

export type LibraryRating = {
  libraryratingid: number; // Equivalent to decimal Libraryratingid
  rate?: number; // Equivalent to decimal? Rate
  userid?: number; // Equivalent to decimal? Userid
  libraryid?: number; // Equivalent to decimal? Libraryid

  library?: Library; // Equivalent to virtual Library? Library
  user?: User; // Equivalent to virtual User? User
};

export type Offer = {
  offerid: number; // Equivalent to decimal Offerid
  offerpercentage : number; // Equivalent to decimal? Offerpercentage
  libraryid?: number; // Equivalent to decimal? Libraryid
  library?: Library; // Equivalent to virtual Library? Library
};

export type User = {
  userid: number; // Equivalent to decimal Userid
  image: string; // Equivalent to string? Image
  firstname: string; // Equivalent to string? Firstname
  lastname: string; // Equivalent to string? Lastname
  email: string; // Equivalent to string? Email
  phonenumber: string; // Equivalent to string? Phonenumber
  address: string; // Equivalent to string? Address
  bookreviews?: BookReview[]; // Equivalent to virtual ICollection<Bookreview> Bookreviews
  borrowedbooks?: BorrowedBook[]; // Equivalent to virtual ICollection<Borrowedbook> Borrowedbooks
  creditcards?: CreditCard[]; // Equivalent to virtual ICollection<Creditcard> Creditcards
  favoritebooks?: FavoriteBook[]; // Equivalent to virtual ICollection<Favoritebook> Favoritebooks
  libraryratings?: LibraryRating[]; // Equivalent to virtual ICollection<Libraryrating> Libraryratings
  logins?: Login[]; // Equivalent to virtual ICollection<Login> Logins
  paidfees?: PaidFee[]; // Equivalent to virtual ICollection<Paidfee> Paidfees
};

export type CreditCard = {
  id: number; // Equivalent to decimal Id
  holdername?: string; // Equivalent to string? Holdername
  creditnumber?: number; // Equivalent to long? Creditnumber
  expirydate?: Date; // Equivalent to DateTime? Expirydate
  cvv?: number; // Equivalent to byte? Cvv
  balance?: number; // Equivalent to decimal? Balance
  userid?: number; // Equivalent to decimal? Userid

  user?: User; // Equivalent to virtual User? User
};

export type Login = {
  loginid: number; // Equivalent to decimal Loginid
  username?: string; // Equivalent to string? Username
  password?: string; // Equivalent to string? Password
  roleid?: number; // Equivalent to decimal? Roleid
  userid?: number; // Equivalent to decimal? Userid

  role?: Role; // Equivalent to virtual Role? Role
  user?: User; // Equivalent to virtual User? User
};

export type PaidFee = {
  feeid: number; // Equivalent to decimal Feeid
  returningdate: Date; // Equivalent to DateTime? Returningdate
  feeamount: number; // Equivalent to decimal? Feeamount
  userid: number; // Equivalent to decimal? Userid
  borrowedbookid: number; // Equivalent to decimal? Borrowedbookid
  useremail: string; // Equivalent to string? UserEmail
  createdat: Date; // Equivalent to DateTime? Createdat

  borrowedbook?: BorrowedBook; // Equivalent to virtual Borrowedbook? Borrowedbook
  user?: User; // Equivalent to virtual User? User
};

export type Role = {
  roleid: number; // Equivalent to decimal Roleid
  rolename?: string; // Equivalent to string? Rolename

  logins?: Login[]; // Equivalent to virtual ICollection<Login> Logins
};

export type ContactUs = {
  contactusid: number;
  location: string;
  email: string;
  phonenumber: number;
  image: string;
};

export type HomePage = {
  id: number;
  imagelogo: string;
  p_WELCOME: string;
  imagemain: string;
  p_FOOTER: string;
  p_COPYRIGTH: string;
};

export type FeedBack = {
  feedbackid: number;
  sendername: string;
  email: string;
  title: string;
  message: string;
  status: string;
};

export type Testimonial = {
  testimonialid: number;
  message: string;
  rate: number;
  createdat: string; // ISO date string format
  userid: number;
  firstname: string;
  lastname: string;
  image: string;
};

export interface ReportResponse {
  reports: Report[];
  chartData: ChartData[];
  
}

export interface ChartData{
  totalSalesAmount:number;
  monthOrWeek: string;
}
export interface Report {
  amount: number;
  bookname: string;
  borrowingdate: string; // or Date if you convert the string to Date
  duedate: string; // or Date if you convert the string to Date
  firstname: string;
  lastname: string;
}
