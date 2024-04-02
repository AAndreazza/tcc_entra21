package br.com.cashcontrol.projeto.Service;

import br.com.cashcontrol.projeto.model.Item;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CalculadoraSaldoService {

	public double calcularSaldo(List<Item> itens) {
		double total = 0;
		
		for (Item itemLista : itens) {
			if (itemLista.getQuantidade() != 0) {
				total += itemLista.getValor() * itemLista.getQuantidade();
			} else {
				total += itemLista.getValor();
			}
		}

		return total;
	}

	public double calcularSaldoMes(List<Item> itens) {
		double total = 0;

		for (Item itemLista : itens) {
			if (itemLista.getDataCompra().isAfter(LocalDate.now().minusMonths(1))) {
				total += itemLista.getValor();
			}
		}

		return total;
	}
}
