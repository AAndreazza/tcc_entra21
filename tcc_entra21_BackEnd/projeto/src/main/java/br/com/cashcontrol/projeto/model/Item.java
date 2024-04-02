package br.com.cashcontrol.projeto.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "item")
public class Item {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long cdItem;
	
	@Column(length = 50, nullable = false)
	private String produto;
	
	@Column(nullable = false)
	private LocalDate dataCompra;
	
	@Column(nullable = false)
	private double valor;
	
	@Column(length = 200, nullable = true)
	private String descricao;
	
	@Column(nullable = false, columnDefinition = "CHAR(2)")
	private int sgSetor;
	
	@Column(nullable = true, columnDefinition = "BIGINT DEFAULT '0'")
	private int quantidade;
	
	@ManyToOne
    @JoinColumn(name = "usuarioId", nullable = true)
    private Usuario usuario;
	
	public Long getCdItem() {
		return cdItem;
	}

	public void setCdItem(Long cdItem) {
		this.cdItem = cdItem;
	}

	public String getProduto() {
		return produto;
	}

	public void setProduto(String produto) {
		this.produto = produto;
	}

	public LocalDate getDataCompra() {
		return dataCompra;
	}

	public void setDataCompra(LocalDate dataCompra) {
		this.dataCompra = dataCompra;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getSgSetor() {
		return sgSetor;
	}

	public void setSgSetor(int sgSetor) {
		this.sgSetor = sgSetor;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	
	
}
