package api.controller;

import api.dto.LoginRequestDTO;
import api.dto.LoginResponseDTO;
import api.model.Usuario;
import api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginData) {
        // Chamamos o service passando os dados do DTO
        Usuario usuario = service.validarLogin(loginData.login(), loginData.senha());

        if (usuario != null) {
            
        	return ResponseEntity.<LoginResponseDTO>ok(new LoginResponseDTO(usuario.getNome(), usuario.getRole()));
        }

        // Se falhar, retornamos um erro 401 (Não autorizado)
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

	public UsuarioService getService() {
		return service;
	}

	public void setService(UsuarioService service) {
		this.service = service;
	}
}