import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  error?: string;

  constructor(private service: BookService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => {
        this.books = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load books';
        this.loading = false;
        console.error(err);
      }
    });
  }

  add() {
    this.router.navigate(['/books/new']);
  }

  edit(b: Book) {
    if (!b.id) return;
    this.router.navigate(['/books', b.id, 'edit']);
  }

  remove(b: Book) {
    if (!b.id) return;
    if (!confirm(`Delete book "${b.title}"?`)) return;
    this.service.delete(b.id).subscribe({
      next: () => this.load(),
      error: err => console.error(err)
    });
  }
}
