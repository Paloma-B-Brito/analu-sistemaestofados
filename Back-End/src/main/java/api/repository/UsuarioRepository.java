package api.repository;

import api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Optional é uma boa prática de arquitetura para evitar erros de valor nulo
    Optional<Usuario> findByLogin(String login);
}