package api.model;


import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "estofado")
public class Estofado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo; // Ex: "Sofá Chesterfield"
    
    private String status; // Ex: "DISPONIVEL", "VENDIDO", "EM_PRODUCAO", "CRITICO"
    
    private Double valor; // Preço de Venda
    
    private Double custo; // Custo de Produção
    
    private LocalDate dataEntrada; // Quando entrou no sistema

    // CONSTRUTOR VAZIO 
    public Estofado() {}

    // CONSTRUTOR CHEIO
    public Estofado(String modelo, String status, Double valor, Double custo) {
        this.modelo = modelo;
        this.status = status;
        this.valor = valor;
        this.custo = custo;
        this.dataEntrada = LocalDate.now();
    }

    // GETTERS E SETTERS (O Java precisa deles para ler e gravar)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
    
    public Double getCusto() { return custo; }
    public void setCusto(Double custo) { this.custo = custo; }

    public LocalDate getDataEntrada() { return dataEntrada; }
    public void setDataEntrada(LocalDate dataEntrada) { this.dataEntrada = dataEntrada; }
}