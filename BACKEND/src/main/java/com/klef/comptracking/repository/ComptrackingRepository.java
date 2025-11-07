package com.klef.comptracking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.comptracking.model.Comptracking;

public interface ComptrackingRepository extends JpaRepository<Comptracking, Integer> {
}
