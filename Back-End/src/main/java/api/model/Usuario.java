package api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario") // Garante que o Java saiba qual tabela ler
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // ESTE CAMPO ESTAVA FALTANDO:
    private String nome;
    
    private String login;
    private String senha;
    private String role;

    // MÉTODO QUE O CONTROLLER ESTÁ PROCURANDO:
    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Long getId() {
        return id;
    }
}