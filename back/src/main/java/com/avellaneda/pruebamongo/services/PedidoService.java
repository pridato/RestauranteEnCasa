package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.controller.PedidoController;
import com.avellaneda.pruebamongo.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoService {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @Autowired
    private PedidoRepository pedidoRepository;

    /**
     * simplemente recibimos un pedido y lo añadimos a mongo
     * @param pedido
     * @return
     */
    public RestMessage addPedido(Pedido pedido) {
        RestMessage restMessage = new RestMessage();
        // nos aseguramos que el pedido está "firmado" por un usuario
        if(pedido.getUsuarioId() != null) {
            if(pedido.getEstado() == null) {
                pedido.setEstado("En preparación");
            }
            pedidoRepository.save(pedido);
            restMessage.setCodigo(0);
            restMessage.setMensaje("Pedido guardado correctamente en mongo");
            logger.info("comida guardada");
        }
        else {
            restMessage.setCodigo(1);
            restMessage.setError("No hay ningún usuario realizando el pedido error");
        }

        return restMessage;
    }
}
