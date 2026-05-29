package com.tradingjournal.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tradingjournal.model.IdeasAndNotes;
import com.tradingjournal.model.User;
import com.tradingjournal.repository.IdeasAndNotesRepository;
import com.tradingjournal.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IdeasAndNotesService {

    private final IdeasAndNotesRepository repo;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Käyttäjää ei löydy"));
    }

    public List<IdeasAndNotes> findAll() {
        return repo.findAllByUserOrderByCreatedAtDesc(getCurrentUser());
    }

    public IdeasAndNotes create(IdeasAndNotes ideasAndNotes) {
        ideasAndNotes.setUser(getCurrentUser());
        return repo.save(ideasAndNotes);

    }

    public IdeasAndNotes delete(Long id) {
        IdeasAndNotes entity = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Kohdetta ei löydy"));
        repo.delete(entity);
        return entity;
    }
}
