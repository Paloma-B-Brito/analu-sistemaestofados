package api.repository;

import api.model.Estofado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EstofadoRepository extends JpaRepository<Estofado, Long> {

    // 1. Conta quantos itens existem com um status específico (Ex: "DISPONIVEL")
    long countByStatus(String status);

    // 2. Query Personalizada para contar itens em produção
    // (Consideramos que não está pronto nem vendido)
    @Query("SELECT COUNT(e) FROM Estofado e WHERE e.status = 'EM_PRODUCAO'")
    long contarEmProducao();

    // 3. Query para contar itens críticos (Atrasados ou com defeito)
    @Query("SELECT COUNT(e) FROM Estofado e WHERE e.status = 'CRITICO'")
    long contarCriticos();

    // 4. Query para somar todo o dinheiro que já entrou (Receita)
    // O COALESCE serve para retornar 0 se não tiver nenhuma venda, evitando erro de NULL
    @Query("SELECT COALESCE(SUM(e.valor), 0) FROM Estofado e WHERE e.status = 'VENDIDO'")
    Double somarReceitaTotal();
}