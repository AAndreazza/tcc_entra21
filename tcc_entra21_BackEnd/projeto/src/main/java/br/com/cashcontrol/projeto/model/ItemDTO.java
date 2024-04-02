package br.com.cashcontrol.projeto.model;

import java.time.LocalDate;

public class ItemDTO {

	private String produto;
	private LocalDate dataCompra;
	private double valor;
	private String descricao;
	private Long usuarioId;
	private int sgSetor;
	private int quantidade;
	
	
	public int getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
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
	public Long getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}
	public int getSgSetor() {
		return sgSetor;
	}
	public void setSgSetor(int sgSetor) {
		this.sgSetor = sgSetor;
	}
	
	
	
}
