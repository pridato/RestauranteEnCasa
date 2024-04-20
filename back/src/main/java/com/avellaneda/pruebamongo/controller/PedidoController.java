package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.repository.PedidoRepository;
import com.avellaneda.pruebamongo.services.PedidoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.web.bind.annotation.*;

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



}
