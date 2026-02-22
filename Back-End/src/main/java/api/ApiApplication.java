package api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Esta anotação é o que transforma o projeto em um sistema Spring
public class ApiApplication {

    public static void main(String[] args) {
        // Este é o comando que liga o motor e conecta no PostgreSQL
        SpringApplication.run(ApiApplication.class, args);
    }
}