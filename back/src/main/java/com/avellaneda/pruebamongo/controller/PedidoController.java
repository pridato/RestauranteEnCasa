package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.services.PedidoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Pedido")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/add")
    public RestMessage anadirPedido(@RequestBody Pedido pedido) {
        logger.info(pedido.toString());
        return pedidoService.addPedido(pedido);
    }

    @GetMapping("obtener-pedidos")
    public List<Pedido> obtenerPedidos() {
        return this.pedidoService.obtenerPedidos();
    }

    @PostMapping("eliminar")
    public Boolean eliminarPedido(@RequestBody String id_pedido) {
        return this.pedidoService.modificarPedido(id_pedido);
    }

    @GetMapping("obtener-pedidos-usuario")
    public List<Pedido> obtenerPedidosUsuario(@RequestParam("id") String id_usuario) {
        return this.pedidoService.obtenerPedidosUsuario(id_usuario);
    }

    @GetMapping("obtener-pedidos-hechos")
    public List<Pedido> obtenerPedidosHechos() {
        return this.pedidoService.obtenerPedidosHechos();
    }
}
