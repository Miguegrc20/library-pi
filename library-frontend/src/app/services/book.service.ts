import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

// Use relative path so Nginx (prod) or Angular dev proxy can redirect to backend service.
const BASE_URL = '/api/books';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(BASE_URL);
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}/${id}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(BASE_URL, book);
  }

  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${BASE_URL}/${id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
