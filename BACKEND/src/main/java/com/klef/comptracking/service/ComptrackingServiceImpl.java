package com.klef.comptracking.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.comptracking.model.Comptracking;
import com.klef.comptracking.repository.ComptrackingRepository;

@Service
public class ComptrackingServiceImpl implements ComptrackingService {

    @Autowired
    private ComptrackingRepository repo;

    @Override
    public void addComputer(Comptracking computer) {
        repo.save(computer);
    }

    @Override
    public List<Comptracking> viewAllComputers() {
        return repo.findAll();
    }

    @Override
    public Comptracking updateComputer(Comptracking computer) {
        return repo.save(computer);
    }

    @Override
    public void deleteComputer(int id) {
        repo.deleteById(id);
    }
}
