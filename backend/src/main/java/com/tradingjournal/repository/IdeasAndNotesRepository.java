package com.tradingjournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tradingjournal.model.IdeasAndNotes;
import com.tradingjournal.model.User;

public interface IdeasAndNotesRepository extends JpaRepository<IdeasAndNotes, Long> {

    List<IdeasAndNotes> findAllByUserOrderByCreatedAtDesc(User user);
}
