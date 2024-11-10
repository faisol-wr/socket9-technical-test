import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../services/date.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-date-calculate',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-calculate.component.html',
  styleUrl: './date-calculate.component.scss',
})
export class DateCalculateComponent {
  dateForm = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    date: new FormControl(''),
  });
  isLoading: boolean = false;
  isError: boolean = false;

  message: string = '';

  private dateService = inject(DateService);

  onSubmit() {
    const value = this.dateForm.value;
    this.message = '';
    this.isLoading = true;
    this.dateService
      .calculateDay(Number(value.year), Number(value.month), Number(value.date))
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result) => {
          console.log('Result: ', result);
          this.isError = false;
          this.message = result.day;
        },
        error: (err) => {
          console.log('Error: ', err.error);
          this.isError = true;
          this.message = err.error.message;
        },
      });
  }
}
