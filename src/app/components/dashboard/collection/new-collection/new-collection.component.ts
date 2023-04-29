import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {
  collection: Collection | null = null;
  report: Report | null = null;
  collectionForm!: FormGroup;
  reportFile!: File;

  isSubmitting: boolean = false;
  
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.collectionForm = this.formBuilder.group({
      collectionName: ['', Validators.required],
      reportName: ['', Validators.required],
      fileInput: ['', Validators.required]
    });
  }

  get form() {
    return this.collectionForm.controls;
  }

  onFileChange(event: any) {
    this.reportFile = event.target.files[0];
  }

  onSubmit(event: any) {
    if (this.collectionForm.invalid) return;

    const collectionName = event.target.elements.collectionName.value;
    const reportName = event.target.elements.reportName.value;
    const fileInput = event.target.elements.fileInput.files[0];

    this.isSubmitting = true;
  
    this.dashboardService.createCollection(collectionName).pipe(
      switchMap((collection: Collection) => {
        this.collection = collection;
        return this.dashboardService.createReport(reportName, collection.id, fileInput);
      })
    ).subscribe((report: Report) => {
      this.report = report;
      this.router.navigate(['/dashboard/collection/' + this.collection?.id + '/reports']);
    });
  }
}
