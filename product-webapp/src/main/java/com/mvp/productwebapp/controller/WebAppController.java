package com.stackroute.productwebapp.controller;

import org.apache.maven.model.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebAppController {

    @GetMapping(value="/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }
}
