package api.service;

import api.model.Usuario;
import api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario validarLogin(String login, String senha) {
    // Se o findByLogin retorna Optional, precisamos do .orElse(null) no final
    return repository.findByLogin(login)
                     .filter(u -> u.getSenha().equals(senha))
                     .orElse(null); 
}
    
    
}