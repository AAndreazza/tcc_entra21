package br.com.cashcontrol.projeto.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.cashcontrol.projeto.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Long>{

	 boolean existsByEmail(String email);
	 boolean existsByTelefone(String telefone);
	 boolean existsByCpf(String cpf);
}
