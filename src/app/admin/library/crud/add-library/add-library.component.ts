import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  injectMutation,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { LibraryService } from '../../library.service';
import { CreateLibraryType } from '../../types';
import { QUERYKEYS } from 'src/app/queries';
import { Router } from '@angular/router';
import * as L from 'leaflet'; // Import Leaflet
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css'],
})
export class AddLibraryComponent implements OnInit, OnDestroy {
  libraryForm: FormGroup;
  image: File | null = null;
  router: Router;
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  constructor(
    private fb: FormBuilder,
    router: Router,
    private toastr: ToastrService
  ) {
    this.libraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      image: [null],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.router = router;
  }

  libraryService = inject(LibraryService);
  queryClient = injectQueryClient();

  mutation = injectMutation((client) => ({
    mutationFn: (createLibrary: CreateLibraryType) =>
      this.libraryService.createLibrary(createLibrary),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERYKEYS.libraries] });
      this.router.navigate(['/admin/library']);
      this.toastr.success('Library Created');
    },
  }));

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  initializeMap() {
    // Set initial map center and zoom
    this.map = L.map('map').setView([31.9539, 35.9106], 13); // Amman, Jordan

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', // Default Leaflet icon
      iconSize: [25, 41], // Size of the marker
      iconAnchor: [12, 41], // Anchor point of the icon (where it touches the map)
      popupAnchor: [1, -34], // Position of the popup
      shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // Optional shadow
      shadowSize: [41, 41], // Shadow size
    });
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Listen for click events on the map
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // If a marker already exists, move it to the new position
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        // Otherwise, create a new marker
        this.marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(
          this.map!
        );
      }

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

  onCreateLibrary() {
    if (!this.libraryForm.valid || !this.image)
      this.toastr.error('Please Fill All Values');
    this.mutation.mutate({ ...this.libraryForm.value, image: this.image });
  }
}
