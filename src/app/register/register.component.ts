import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SweetAlertService } from '../core/sweet-alert.service';
import { HelperService } from '../core/helper.service';
import { HttpApiService } from '../core/httpApi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private alertService: SweetAlertService,
    private helperService: HelperService,
    private httpApiService: HttpApiService
  ) {}
  personalDetailsFormInvalid: boolean = false;
  universityDetailsFormInvalid: boolean = false;
  workDetailsFormInvalid: boolean = false;
  team = new FormControl('');
  teamList: string[] = [
    'Vice-Chairperson',
    'Technical',
    'Designing/Graphics',
    'PR & Outreach',
    'Marketing',
    'Events',
    'Social Media',
  ];

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
  }

  static emailValidator(email: any): any {
    if (email.pristine) {
      return null;
    }
    const email_REGEXP =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email.markAsTouched();
    if (email_REGEXP.test(email.value)) {
      return null;
    }
    return {
      invalidEmail: true,
    };
  }

  registerForm = this.fb.group({
    personalDetailsForm: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, RegisterComponent.emailValidator]],

      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
    }),
    universityDetailsForm: this.fb.group({
      rollNo: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      branch: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required]],
    }),
    workDetailsForm: this.fb.group({
      team: ['', Validators.required],
      workLink: [''],
    }),
  });

  onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      let data = {
        name: `${this.registerForm.controls?.personalDetailsForm?.value?.fullName}`,
        email: `${this.registerForm.controls?.personalDetailsForm?.value?.email}`,
        phone: `${this.registerForm.controls?.personalDetailsForm?.value?.phone}`,
        rollNo: `${this.registerForm.controls?.universityDetailsForm?.value?.rollNo}`,
        branch: `${this.registerForm.controls?.universityDetailsForm?.value?.branch}`,
        year: `${this.registerForm.controls?.universityDetailsForm?.value?.year}`,
        role: `${this.registerForm.controls?.workDetailsForm?.value?.team.join(
          ','
        )}`,
        link: `${this.registerForm.controls?.workDetailsForm?.value?.workLink}`,
      };
      this.alertService.onConfirmAlert().then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          console.log(this.registerForm.value);
          this.helperService.hideBanner();
          this.helperService.showLoader();
          this.httpApiService.registerWithUs(data).subscribe(
            (res) => {
              this.helperService.hideLoader();
              this.registerForm.reset();
              this.alertService.onFormSubmission(
                'Application Submitted',
                'We will communicate with you, for further steps',
                'success'
              );
              console.log(res);
            },
            (err) => {
              console.log(err.message);
              this.helperService.hideLoader();
              this.alertService.onErrorAlert(
                'Oh Snap!',
                'There is some error from our side, Please come back later',
                'error'
              );
            }
          );
        }
      });
    } else {
      this.workDetailsFormInvalid = true;
      setTimeout(() => {
        this.workDetailsFormInvalid = false;
      }, 2000);
    }
  }

  get fullName() {
    return this.registerForm.get('personalDetailsForm')?.get('fullName');
  }
  get email() {
    return this.registerForm.get('personalDetailsForm')?.get('email');
  }
  get phone() {
    return this.registerForm.get('personalDetailsForm')?.get('phone');
  }
  get rollNo() {
    return this.registerForm.get('universityDetailsForm')?.get('rollNo');
  }
  get branch() {
    return this.registerForm.get('universityDetailsForm')?.get('branch');
  }
  get year() {
    return this.registerForm.get('universityDetailsForm')?.get('year');
  }
  get teams() {
    return this.registerForm.get('workDetailsForm')?.get('team');
  }
  get workLink() {
    return this.registerForm.get('workDetailsForm')?.get('workLink');
  }

  ngAfterViewInit(): void {
    this.document
      .querySelectorAll('.btn-navigate-form-step')
      .forEach((formNavigationBtn: any) => {
        formNavigationBtn.addEventListener('click', () => {
          const stepNumber = parseInt(
            formNavigationBtn.getAttribute('step_number')
          );
          if (
            formNavigationBtn.textContent
              .replace(/(<([^>]+)>)/gi, '')
              .toLowerCase()
              .trim() == 'next' &&
            formNavigationBtn.getAttribute('step_number') == 2
          ) {
            if (
              !(
                this.registerForm.get('personalDetailsForm')?.status ==
                'INVALID'
              )
            ) {
              this.personalDetailsFormInvalid = false;
              this.navigateToFormStep(stepNumber);
            } else {
              this.personalDetailsFormInvalid = true;
              setTimeout(() => {
                this.personalDetailsFormInvalid = false;
              }, 2000);
            }
          } else if (
            formNavigationBtn.textContent
              .replace(/(<([^>]+)>)/gi, '')
              .toLowerCase()
              .trim() == 'next' &&
            formNavigationBtn.getAttribute('step_number') == 3
          ) {
            if (
              !(
                this.registerForm.get('universityDetailsForm')?.status ==
                'INVALID'
              )
            ) {
              this.universityDetailsFormInvalid = false;
              this.navigateToFormStep(stepNumber);
            } else {
              this.universityDetailsFormInvalid = true;
              setTimeout(() => {
                this.universityDetailsFormInvalid = false;
              }, 2000);
            }
          } else if (
            formNavigationBtn.textContent
              .replace(/(<([^>]+)>)/gi, '')
              .toLowerCase()
              .trim() == 'back'
          ) {
            this.navigateToFormStep(stepNumber);
          }
        });
      });
  }

  navigateToFormStep = (stepNumber: any) => {
    this.document.querySelectorAll('.form-step').forEach((formStepElement) => {
      formStepElement.classList.add('d-none');
    });
    this.document
      .querySelectorAll('.form-stepper-list')
      .forEach((formStepHeader) => {
        formStepHeader.classList.add('form-stepper-unfinished');
        formStepHeader.classList.remove(
          'form-stepper-active',
          'form-stepper-completed'
        );
      });
    this.document
      .querySelector('#step-' + stepNumber)
      ?.classList.remove('d-none');
    const formStepCircle = this.document.querySelector(
      'li[step="' + stepNumber + '"]'
    );
    formStepCircle?.classList.remove(
      'form-stepper-unfinished',
      'form-stepper-completed'
    );
    formStepCircle?.classList.add('form-stepper-active');

    for (let index = 0; index < stepNumber; index++) {
      const formStepCircle = this.document.querySelector(
        'li[step="' + index + '"]'
      );
      if (formStepCircle) {
        formStepCircle.classList.remove(
          'form-stepper-unfinished',
          'form-stepper-active'
        );
        formStepCircle.classList.add('form-stepper-completed');
      }
    }
  };
}
