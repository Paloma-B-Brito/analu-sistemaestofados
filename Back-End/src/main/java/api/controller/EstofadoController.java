package api.controller;

import api.model.Estofado;
import api.repository.EstofadoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estofados")
@CrossOrigin(origins = "*") // <--- Essa linha é a chave que deixa o React entrar!
public class EstofadoController {

    private final EstofadoRepository repository;

    public EstofadoController(EstofadoRepository repository) {
        this.repository = repository;
    }

    // 1. SALVAR (POST): O React manda o sofá novo aqui
    @PostMapping
    public Estofado criarEstofado(@RequestBody Estofado novoEstofado) {
        // Se não vier data, coloca a data de hoje
        if (novoEstofado.getDataEntrada() == null) {
            novoEstofado.setDataEntrada(java.time.LocalDate.now());
        }
        return repository.save(novoEstofado);
    }

    // 2. LISTAR (GET): Para usarmos depois nas tabelas
    @GetMapping
    public List<Estofado> listarTodos() {
        return repository.findAll();
    }
}