package com.buddefly.developer.web.cucumber.stepdefs;

import com.buddefly.developer.web.DeveloperwebApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DeveloperwebApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
