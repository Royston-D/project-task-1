import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormService } from './form.service';
import { studentRegisteration } from './student-registeration.modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-registeration-form',
  templateUrl: './student-registeration-form.component.html',
  styleUrls: ['./student-registeration-form.component.css'],
})
export class StudentRegisterationFormComponent implements OnInit {
  studentForm!: FormGroup;
  currentData: studentRegisteration[] = [];

  // Add Subject
  subjectDetails: { name: string; mark: string }[] = [];
  editIndex: number = -1;
  editedSubjectName: string = '';
  editedSubjectMark: string = '';

  captcha: string = '';
  captchaInput: string = '';
  verificationInput: string = '';

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private http: HttpClient
  ) {
    this.studentForm = this.fb.group({
      studentName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\s.]+$')],
      ],
      studentDoB: ['', [Validators.required, this.dateValidator]],
      studentEmail: ['', [Validators.required, Validators.email]],
      studentCurrentAddress: ['', Validators.required],
      studentPermanentAddress: ['', Validators.required],
      studentMobileCountryCode: ['', Validators.required],
      studentMobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      studentGender: ['', Validators.required],
      studentSubjectName: [''],
      studentSubjectMark: [''],
      studentSubjectDetails: ['', Validators.required],

      studentEnrollmentNumber: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      studentSchoolName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')],
      ],
    });
    this.currentData = formService.studentList;
    this.generateCaptcha();
  }

  url: string = 'http://api.nightlights.io/districts';
  regions: any[] = [];
  stateNames: any[] = [];

  ngOnInit(): void {
    this.formService.fetchData();
    this.http.get<any>(this.url).subscribe((data) => {
      this.regions = data.regions;
      console.log(data);
      this.stateNames = Array.from(
        new Set(this.regions.map((region: any) => region.state_name))
      );
    });
  }

  submitForm(): void {
    let convertingDate: any = new Date(this.studentForm.value.studentDoB);
    convertingDate = convertingDate.toISOString();
    this.studentForm.value.studentSubjectDetails = this.subjectDetails;
    console.log(this.studentForm);
    if (this.studentForm.valid) {
      this.studentForm.value.studentDoB = convertingDate;
      this.formService.submit(this.studentForm.value);
      this.studentForm.reset();
    } else {
      console.log(this.studentForm);
      console.log('Invalid Response', this.studentForm.value);
    }
  }

  closeModal(): void {
    const modal = document.getElementById('personalInformationFormModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateValue = new Date(control.value);

    if (dateValue.getFullYear() > 2000) {
      return { dateAfter2000: true };
    }
    return null;
  }

  copyAddress(event: any) {
    if (event.target.checked) {
      this.studentForm.patchValue({
        studentPermanentAddress: this.studentForm.get('studentCurrentAddress')
          ?.value,
      });
    } else {
      this.studentForm.patchValue({
        studentPermanentAddress: '',
      });
    }
  }

  generateCaptcha(): void {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captcha = captcha;
  }

  verify(): void {
    if (this.verificationInput === this.captcha) {
      console.log('CAPTCHA verified successfully');
      // Proceed with verification logic
    } else {
      console.error('CAPTCHA verification failed');
      // Handle failed verification
    }
  }

  editSubject(index: number) {
    this.editIndex = index;
    this.editedSubjectName = this.subjectDetails[index].name;
    this.editedSubjectMark = this.subjectDetails[index].mark;
  }

  saveSubject(index: number) {
    if (index >= 0 && index < this.subjectDetails.length) {
      // Update the subject details directly in the array
      this.subjectDetails[index] = {
        name: this.editedSubjectName,
        mark: this.editedSubjectMark,
      };

      // Exit edit mode
      this.editIndex = -1;

      // Clear edited subject name and mark
      this.editedSubjectName = '';
      this.editedSubjectMark = '';
    } else {
      console.error('Invalid index for saving subject');
    }
  }

  addSubject() {
    const studentSubjectNameControl =
      this.studentForm.get('studentSubjectName');
    const studentSubjectMarkControl =
      this.studentForm.get('studentSubjectMark');

    if (!studentSubjectNameControl || !studentSubjectMarkControl) {
      console.error('Unable to access form controls');
      return;
    }

    const subjectName = studentSubjectNameControl.value.trim();
    const subjectMark = studentSubjectMarkControl.value.trim();

    if (!subjectName || !subjectMark) {
      console.error('Subject name or mark is empty');
      return;
    }

    if (this.subjectDetails.length >= 5) {
      console.log('Maximum limit reached. Cannot add more subjects.');
      return;
    }

    this.subjectDetails.push({ name: subjectName, mark: subjectMark });
    console.log('Subject added:', { name: subjectName, mark: subjectMark });

    // Disable the "Add" button if the subjectDetails array has reached 5 entries
    if (this.subjectDetails.length >= 5) {
      const addButton = document.getElementById(
        'addButton'
      ) as HTMLButtonElement;
      if (addButton) {
        addButton.disabled = true;
      }
    }

    // Clearing subject name and mark after adding to subjectDetails array
    studentSubjectNameControl.setValue('');
    studentSubjectMarkControl.setValue('');
  }
  removeSubject(index: number) {
    this.subjectDetails.splice(index, 1);

    // Enable the "Add" button if the subjectDetails array length becomes less than 5
    if (this.subjectDetails.length < 5) {
      const addButton = document.getElementById(
        'addButton'
      ) as HTMLButtonElement;
      if (addButton) {
        addButton.disabled = false;
      }
    }
  }
}
