import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dateForm = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    date: new FormControl(''),
  });

  private dateService = inject(DateService);

  onSubmit() {
    console.log(this.dateForm.value);
    this.dateService.productList().subscribe((result) => {
      console.log('RS: ', result);
    });
  }
}
