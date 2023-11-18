package com.mystack.techblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class TechblogApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechblogApplication.class, args);
	}

}
