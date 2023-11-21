package com.mystack.techblog.entities.messages;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationErrors {

    private Map<String, List<String>> errors = new HashMap<>();

    public ValidationErrors() {}

    public Map<String, List<String>> getErrors() {
        return errors;
    }

    public void addErrors(String errorName, List<String> errorMessages) {
        errors.put(errorName, errorMessages);
    }
}
