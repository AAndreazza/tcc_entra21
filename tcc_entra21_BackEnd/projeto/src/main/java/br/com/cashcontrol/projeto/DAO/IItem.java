package br.com.cashcontrol.projeto.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.cashcontrol.projeto.model.Item;
import br.com.cashcontrol.projeto.model.Usuario;

import java.util.List;

public interface IItem extends CrudRepository<Item, Long> {

    @Query("SELECT i FROM Item i WHERE i.usuario = :usuario")
    List<Item> findByUsuario(@Param("usuario") Usuario usuario);

    @Query("SELECT i FROM Item i WHERE i.usuario = :usuario")
    Page<Item> findByUsuario(@Param("usuario") Usuario usuario, Pageable pageable);

    @Query("SELECT i FROM Item i WHERE i.usuario = :usuario AND MONTH(i.dataCompra) = :month AND i.sgSetor = :sgSetor")
    Page<Item> findByUsuarioAndDataCompraMonthAndSgSetor(
            @Param("usuario") Usuario usuario,
            @Param("month") int month,
            @Param("sgSetor") int sgSetor,
            Pageable pageable);

    @Query("SELECT i FROM Item i WHERE i.usuario = :usuario AND MONTH(i.dataCompra) = :month")
    Page<Item> findByUsuarioAndDataCompraMonth(
            @Param("usuario") Usuario usuario,
            @Param("month") int month,
            Pageable pageable);

    @Query("SELECT i FROM Item i WHERE i.usuario = :usuario AND i.sgSetor = :sgSetor")
    Page<Item> findByUsuarioAndSgSetor(
            @Param("usuario") Usuario usuario,
            @Param("sgSetor") int sgSetor,
            Pageable pageable);
}