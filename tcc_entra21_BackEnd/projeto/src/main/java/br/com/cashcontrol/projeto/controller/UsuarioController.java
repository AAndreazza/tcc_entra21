package br.com.cashcontrol.projeto.controller;

import java.net.URI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.cashcontrol.projeto.DAO.IUsuario;
import br.com.cashcontrol.projeto.model.Usuario;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private IUsuario dao;

	@GetMapping
	public List<Usuario> listaUsuarios() {
		return (List<Usuario>) dao.findAll();
	}

	@PostMapping
	public ResponseEntity<String> criarUsuario(@RequestBody Usuario usuario) {
	    try {
	        if (dao.existsByCpf(usuario.getCpf())) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado.");
	        } else if (dao.existsByEmail(usuario.getEmail())) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
	        } else if (dao.existsByTelefone(usuario.getTelefone())) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("Telefone já cadastrado.");
	        }

	        Usuario usuarioNovo = dao.save(usuario);
	        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cpf}")
	                .buildAndExpand(usuarioNovo.getCpf()).toUri();
	        return ResponseEntity.created(uri).build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.");
	    }
	}


}
