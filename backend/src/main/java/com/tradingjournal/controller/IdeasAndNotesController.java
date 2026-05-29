package com.tradingjournal.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tradingjournal.model.IdeasAndNotes;
import com.tradingjournal.service.IdeasAndNotesService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/ideas-and-notes")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174",
        "https://t-journal.vercel.app" })
@RequiredArgsConstructor
public class IdeasAndNotesController {

    private final IdeasAndNotesService service;

    @GetMapping
    public List<IdeasAndNotes> getAllIdeasAndNotes() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<IdeasAndNotes> create(@RequestBody IdeasAndNotes entity) {
        return ResponseEntity.ok(service.create(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<IdeasAndNotes> deleteIdeasAndNotes(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
