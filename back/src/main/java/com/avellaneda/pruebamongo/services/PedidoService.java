package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.controller.PedidoController;
import com.avellaneda.pruebamongo.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @Autowired
    private PedidoRepository pedidoRepository;

    /**
     * simplemente recibimos un pedido y lo añadimos a mongo
     *
     * @param pedido
     * @return
     */
    public RestMessage addPedido(Pedido pedido) {
        RestMessage restMessage = new RestMessage();
        // nos aseguramos que el pedido está "firmado" por un usuario
        if (pedido.getUsuarioId() != null) {
            if (pedido.getEstado() == null) {
                pedido.setEstado("En preparación");
            }
            // guardamos tmb la hora en la que se ha hecho el pedido
            pedido.setHoraPedido(new Date());
            pedidoRepository.save(pedido);
            restMessage.setCodigo(0);
            restMessage.setMensaje("Pedido guardado correctamente en mongo");
            logger.info("comida guardada");
        } else {
            restMessage.setCodigo(1);
            restMessage.setError("No hay ningún usuario realizando el pedido error");
        }

        return restMessage;
    }

    public List<Pedido> obtenerPedidos() {
        // devolver una lista de pedido ordenada x fecha en des.
        List<Pedido> pedidos = this.pedidoRepository.findAll();
        // añadimos solo los pedidos "en preparacion". Una vez hechos se eliminarán para que los cocineros no lo vean
        return pedidos
                .stream()
                .sorted(Comparator.comparing(Pedido::getHoraPedido))
                .filter(pedido -> pedido.getEstado().equals("En Preparación"))
                .collect(Collectors.toList());
    }


    public Boolean modificarPedido(String id_pedido) {
        // hay que modificar el pedido en especifico para mostrar estado = "Preparado"
        List<Pedido> pedidos = this.pedidoRepository.findAll();

        Pedido pedido = pedidos.stream().filter(data -> data.getId().equals(id_pedido)).findFirst().orElse(null);

        if(pedido != null) {
            logger.info(pedido.toString());
            pedido.setEstado("Preparado");
            this.pedidoRepository.save(pedido);
        }
        return pedido != null;
    }

}
