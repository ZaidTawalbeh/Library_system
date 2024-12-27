import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { LibraryService } from '../../library.service';
import { CreateLibraryType, EditLibraryType } from '../../types';
import { QUERYKEYS } from 'src/app/queries';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet'; // Import Leaflet
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.css'],
})
export class EditLibraryComponent implements OnInit {
  libraryForm: FormGroup;
  image: File | null = null;
  id: number = -1;
  router: Router;
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
    private toastr: ToastrService
  ) {
    this.libraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.router = router;
  }

  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();

  // Query to fetch the library data by ID
  libraryQuery = injectQuery(() => ({
    queryKey: [
      QUERYKEYS.libraries,
      +(this.route.snapshot.paramMap.get('id') ?? -1),
    ],
    queryFn: async () => {
      const library = await this.libraryService.getLibraryById(
        +(this.route.snapshot.paramMap.get('id') ?? -1)
      );
      if (library) this.libraryForm.patchValue(library);
      this.initializeMap();
      return library;
    },
  }));
  mutation = injectMutation((client) => ({
    mutationFn: (updatedLibrary: EditLibraryType) =>
      this.libraryService.editLibrary(
        +(this.route.snapshot.paramMap.get('id') ?? 0),
        {
          ...updatedLibrary,
          image: this.image ?? undefined,
          libraryid: +(this.route.snapshot.paramMap.get('id') ?? -1),
        }
      ),
    onSuccess: () => {
      client.refetchQueries({ queryKey: [QUERYKEYS.libraries] });
      client.refetchQueries({
        queryKey: [
          QUERYKEYS.libraries,
          +(this.route.snapshot.paramMap.get('id') ?? -1),
        ],
      });
      this.toastr.success('Library edited successfully');
      setTimeout(() => {
        this.router.navigate(['/admin/library']);
      }, 200); // Delaying the navigation slightly to ensure mutation is fully complete
      this.initializeMap();
    },
  }));

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (!this.route.snapshot.paramMap.get('id')) {
      this.toastr.error('No ID provided');
      return;
    }
    this.fillData();
    this.initializeMap();
  }

  fillData() {
    const data = this.libraryQuery.data()!;
    if (data) {
      this.libraryForm.patchValue(data);
    }
  }

  initializeMap() {
    // Initialize the map with a default view (e.g., using the current library latitude and longitude)
    console.log(this.libraryForm.value);
    if (
      !this.libraryForm.get('latitude')?.value ||
      !this.libraryForm.get('longitude')?.value
    )
      return;

    const lat = this.libraryForm.get('latitude')?.value || 31.9539;
    const lng = this.libraryForm.get('longitude')?.value || 35.9106;
    this.map = L.map('map').setView([lat, lng], 13); // Set map to library's coordinates or default to Amman, Jordan

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Custom marker icon
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', // Default Leaflet icon
      iconSize: [25, 41], // Size of the marker
      iconAnchor: [12, 41], // Anchor point of the icon (where it touches the map)
      popupAnchor: [1, -34], // Position of the popup
      shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // Optional shadow
      shadowSize: [41, 41], // Shadow size
    });

    // Create or update marker based on the existing latitude and longitude
    this.marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(this.map);

    // Listen for map click events to update latitude and longitude in the form
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      // Move the marker to the clicked position
      this.marker!.setLatLng([lat, lng]);

      // Update latitude and longitude form controls
      this.libraryForm.patchValue({
        latitude: lat,
        longitude: lng,
      });
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.image = file;
    }
  }

  onEditLibrary() {
    if (this.libraryForm.valid) {
      this.mutation.mutate(this.libraryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
