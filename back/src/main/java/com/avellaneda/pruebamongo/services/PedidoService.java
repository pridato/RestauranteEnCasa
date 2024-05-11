package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.Comida;
import com.avellaneda.pruebamongo.Model.ComidaPedido;
import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.controller.PedidoController;
import com.avellaneda.pruebamongo.repository.ComidaRepository;
import com.avellaneda.pruebamongo.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
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
    @Autowired
    private ComidaRepository comidaRepository;

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

            List<String> idComidas = pedido.getComidas().stream().map(ComidaPedido::getComidaId).toList();

            // a partir del id de la comida lo dividimos entre el length de la lista

            for (String id: idComidas) {
                // sacamos la comida a partir del id y metemos el tiempo de preparacion
                Comida comida = comidaRepository.findById(id).orElse(null);
                if (comida != null) {

                    int minutosPreparacion = (int) ChronoUnit.MINUTES.between(pedido.getHoraPedido().toInstant(), new Date().toInstant()) / idComidas.size();

                    // aumentamos las veces que se ha preparado y lo dividimos entre este
                    comida.setVecesComprado(comida.getVecesComprado() + 1);
                    comida.setTiempoPreparacion(minutosPreparacion / comida.getVecesComprado());
                    comidaRepository.save(comida);
                }
            }
            this.pedidoRepository.save(pedido);
        }
        return pedido != null;
    }

    /**
     * metodo para obtener los pedidos del usuario para que lo compruebe
     * @param id_usuario
     * @return
     */
    public List<Pedido> obtenerPedidosUsuario(String id_usuario) {
        return this.pedidoRepository.findByUsuarioId(id_usuario).stream().sorted(Comparator.comparing(Pedido::getHoraPedido).reversed()).toList();
    }

    public List<Pedido> obtenerPedidosHechos() {
        return this.pedidoRepository.findAll().stream().filter(pedido -> pedido.getEstado().equals("Preparado")).sorted(Comparator.comparing(Pedido::getHoraPedido).reversed()).toList();
    }
}