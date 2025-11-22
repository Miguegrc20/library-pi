package com.crud.library.service;

import com.crud.library.model.Book;
import com.crud.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> findAll() { return repository.findAll(); }
    public Book findById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found")); }
    public Book create(Book book) { return repository.save(book); }
    public Book update(Long id, Book book) {
        Book existing = findById(id);
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        existing.setIsbn(book.getIsbn());
        existing.setYear(book.getYear());
        existing.setDescription(book.getDescription());
        return repository.save(existing);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
