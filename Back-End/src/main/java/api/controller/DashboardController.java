package api.controller;

import api.dto.DashboardDTO;
import api.repository.EstofadoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*") // Permite o React acessar
public class DashboardController {

    private final EstofadoRepository repository;

    public DashboardController(EstofadoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/resumo")
    public DashboardDTO getResumoGeral() {
        // Busca os totais no banco de dados
        long showroom = repository.countByStatus("DISPONIVEL");
        long producao = repository.contarEmProducao();
        long criticos = repository.contarCriticos();
        Double receita = repository.somarReceitaTotal();

        // Empacota tudo e envia
        return new DashboardDTO(
            showroom,
            producao,
            criticos,
            receita != null ? receita : 0.0
        );
    }
}