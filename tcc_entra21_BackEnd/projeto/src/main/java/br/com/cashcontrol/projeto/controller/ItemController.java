package br.com.cashcontrol.projeto.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.cashcontrol.projeto.DAO.IItem;
import br.com.cashcontrol.projeto.DAO.IUsuario;
import br.com.cashcontrol.projeto.Service.CalculadoraSaldoService;
import br.com.cashcontrol.projeto.model.Item;
import br.com.cashcontrol.projeto.model.ItemDTO;
import br.com.cashcontrol.projeto.model.Usuario;

@RestController
@CrossOrigin("*")
@RequestMapping("/item")
public class ItemController {

	@Autowired
	private IItem dao;
	
	@Autowired
	private IUsuario daoU;

	@GetMapping
	public List<Item> listaItens() {
		return (List<Item>) dao.findAll();

	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<Page<Item>> listaItensUsuario(
	    @PathVariable Long usuarioId,
	    @RequestParam(required = false) Integer mes,
	    @RequestParam(required = false) Integer setor,
	    Pageable pageable) {

	    Optional<Usuario> usuarioOptional = daoU.findById(usuarioId);

	    if (usuarioOptional.isPresent()) {
	        Usuario usuario = usuarioOptional.get();

	        // Adicione filtros de mês e setor à consulta
	        Page<Item> itensDoUsuario;
	        if (mes != null && setor != null) {
	            itensDoUsuario = dao.findByUsuarioAndDataCompraMonthAndSgSetor(usuario, mes, setor, pageable);
	        } else if (mes != null) {
	            itensDoUsuario = dao.findByUsuarioAndDataCompraMonth(usuario, mes, pageable);
	        } else if (setor != null) {
	            itensDoUsuario = dao.findByUsuarioAndSgSetor(usuario, setor, pageable);
	        } else {
	            itensDoUsuario = dao.findByUsuario(usuario, pageable);
	        }

	        return ResponseEntity.ok(itensDoUsuario);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@GetMapping("/item/{itemId}")
	public ResponseEntity<Item> getItemById(@PathVariable Long itemId) {
	    Optional<Item> itemOptional = dao.findById(itemId);

	    if (itemOptional.isPresent()) {
	        Item item = itemOptional.get();
	        return ResponseEntity.ok(item);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@PostMapping
	public ResponseEntity<Void> criarItem(@RequestBody ItemDTO item) {
		Item itemCadastro = new Item();
		itemCadastro.setProduto(item.getProduto());
		itemCadastro.setDataCompra(item.getDataCompra());
		itemCadastro.setDescricao(item.getDescricao());
		itemCadastro.setSgSetor(item.getSgSetor());
		itemCadastro.setValor(item.getValor());
		itemCadastro.setQuantidade(item.getQuantidade());
		Optional<Usuario> usuario = daoU.findById(item.getUsuarioId());
		if (usuario.isPresent()) {
			itemCadastro.setUsuario(usuario.get());
		}
		dao.save(itemCadastro);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cdItem}")
				.buildAndExpand(itemCadastro.getCdItem()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PutMapping("/alterar/{cdItem}")
	public ResponseEntity<Void> atualizarItem(@RequestBody Item itemAtualizado, @PathVariable Long cdItem) {
		Item itemExistente = dao.findById(cdItem).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado com o ID: " + cdItem));

		// Atualizar as propriedades do item existente com as do item atualizado
		itemExistente.setProduto(itemAtualizado.getProduto());
		itemExistente.setDataCompra(itemAtualizado.getDataCompra());
		itemExistente.setValor(itemAtualizado.getValor());
		itemExistente.setDescricao(itemAtualizado.getDescricao());
		if(itemExistente.getQuantidade() > 0) {
			itemExistente.setQuantidade(itemAtualizado.getQuantidade());
		}

		// Salvar o item atualizado no banco de dados
		dao.save(itemExistente);

		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/deletar/{cdItem}")
	public ResponseEntity<Void> deletarItem(@PathVariable Long cdItem) {
		// Verificar se o item existe antes de tentar deletar
		if (!dao.existsById(cdItem)) {
			throw new IllegalArgumentException("Item não encontrado com o ID: " + cdItem);
		}

		// Deletar o item do banco de dados
		dao.deleteById(cdItem);

		return ResponseEntity.noContent().build();
	}

	@Autowired
	private CalculadoraSaldoService calculadoraSaldoService;

	@GetMapping("/saldo")
	public ResponseEntity<Double> obterSaldo() {
		double saldo = calculadoraSaldoService.calcularSaldo(listaItens());
		return ResponseEntity.ok(saldo);
	}

	@GetMapping("/saldoMes")
	public ResponseEntity<Double> obterSaldoMes() {
		double saldo = calculadoraSaldoService.calcularSaldoMes(listaItens());
		return ResponseEntity.ok(saldo);
	}
	
	@GetMapping("/saldo/{usuarioId}")
	public ResponseEntity<Double> obterSaldoUsuario(
	    @PathVariable Long usuarioId,
	    @RequestParam(required = false) Integer mes,
	    @RequestParam(required = false) Integer setor,
	    Pageable pageable) {

	    // Buscar o usuário pelo ID
	    Optional<Usuario> usuarioOptional = daoU.findById(usuarioId);

	    if (usuarioOptional.isPresent()) {
	        Usuario usuario = usuarioOptional.get();

	        // Buscar os itens associados a esse usuário, considerando os filtros de mês e setor
	        Page<Item> itensDoUsuario;
	        if (mes != null && setor != null) {
	            itensDoUsuario = dao.findByUsuarioAndDataCompraMonthAndSgSetor(usuario, mes, setor, pageable);
	        } else if (mes != null) {
	            itensDoUsuario = dao.findByUsuarioAndDataCompraMonth(usuario, mes, pageable);
	        } else if (setor != null) {
	            itensDoUsuario = dao.findByUsuarioAndSgSetor(usuario, setor, pageable);
	        } else {
	            itensDoUsuario =  dao.findByUsuario(usuario, pageable);
	        }

	        // Obter a lista de itens da página
	        List<Item> itensDoUsuarioList = itensDoUsuario.getContent();
	        
	        // Calcular o saldo apenas para os itens filtrados
	        double saldo = calculadoraSaldoService.calcularSaldo(itensDoUsuarioList);

	        return ResponseEntity.ok(saldo);
	    } else {
	        // Se o usuário não for encontrado, retornar uma resposta 404 (Not Found)
	        return ResponseEntity.notFound().build();
	    }
	}
}