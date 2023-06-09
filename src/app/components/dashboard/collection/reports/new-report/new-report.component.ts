import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'src/app/models/report';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  reportFile!: File;
  reportForm!: FormGroup;
  fileName: string = "";
  isSubmitting: boolean = false;

  report: Report | null = null;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      reportName: ['', Validators.required],
      fileInput: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    this.reportFile = event.target.files[0];
    this.fileName = this.reportFile.name;
  }

  get form() {
    return this.reportForm.controls;
  }

  onSubmit(event: any) {
    if (this.reportForm.invalid) return;

    const collectionId = this.route.parent?.snapshot.params.collectionId;
    const reportName = event.target.elements.reportName.value;
    const fileInput = event.target.elements.fileInput.files[0];
  
    this.isSubmitting = true;

    this.dashboardService.createReport(reportName, collectionId, fileInput).subscribe((report: Report) => {
      this.report = report;
      this.router.navigate(['/dashboard/collection/' + collectionId + '/report/' + this.report?.id])
    });
  }
}
