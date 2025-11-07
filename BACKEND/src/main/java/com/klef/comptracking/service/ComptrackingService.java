package com.klef.comptracking.service;

import java.util.List;
import com.klef.comptracking.model.Comptracking;

public interface ComptrackingService {
    void addComputer(Comptracking computer);
    List<Comptracking> viewAllComputers();
    Comptracking updateComputer(Comptracking computer);
    void deleteComputer(int id);
}
