import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  loading = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: BookService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.maxLength(200)]],
      isbn: ['', [Validators.required, Validators.maxLength(50)]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(0), Validators.max(new Date().getFullYear())]],
      description: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loading = true;
      this.service.get(this.id).subscribe({
        next: b => {
          this.form.patchValue(b);
          this.loading = false;
        },
        error: err => {
          this.error = 'Failed to load book';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    const value: Book = this.form.value as Book;
    this.loading = true;
    const obs = this.id ? this.service.update(this.id, value) : this.service.create(value);
    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/books']);
      },
      error: err => {
        this.error = 'Save failed';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel() { this.router.navigate(['/books']); }
}
