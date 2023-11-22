package com.mystack.techblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TechblogApplication {
    //TODO -> Fazer as migrations do flyway com cada detalhe de criação das entidades e relacionamentos e depois desativar o ddl auto (update sql)
	public static void main(String[] args) {
		SpringApplication.run(TechblogApplication.class, args);
	}
}
