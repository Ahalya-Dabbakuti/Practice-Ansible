package com.klef.comptracking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.klef.comptracking.model.Comptracking;
import com.klef.comptracking.service.ComptrackingService;

@RestController
@CrossOrigin("*")
@RequestMapping("/comptrackingapi")
public class ComptrackingController {

    @Autowired
    private ComptrackingService service;
    @GetMapping("/")
    public String home()
    {
    	return "Home";
    }
    @PostMapping("/add")
    public String addComputer(@RequestBody Comptracking computer) {
        service.addComputer(computer);
        return "Computer added successfully";
    }

    @GetMapping("/viewall")
    public List<Comptracking> viewAllComputers() {
        return service.viewAllComputers();
    }

    @PutMapping("/update")
    public Comptracking updateComputer(@RequestBody Comptracking computer) {
        return service.updateComputer(computer);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteComputer(@PathVariable int id) {
        service.deleteComputer(id);
        return "Computer deleted successfully";
    }
}
