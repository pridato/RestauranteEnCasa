package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.Pedido;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.services.PedidoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Pedido")
@CrossOrigin(origins = "*")
public class PedidoController {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/add")
    public RestMessage anadirPedido(@RequestBody Pedido pedido) {
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

    @GetMapping("obtener-pedidos-fecha")
    public List<Pedido> obtenerPedidosFecha(@RequestParam("fecha") String fecha) {
        return this.pedidoService.obtenerPedidosFecha(fecha);
    }

    @GetMapping("obtener-pedidos-rango-fechas")
    public Map<Date, Integer> obtenerPedidosRangoFechas(@RequestParam("fechaInicio") String fecha1, @RequestParam("fechaFin") String fecha2) {
        return this.pedidoService.obtenerPedidosRangoFechas(fecha1, fecha2);
    }
}
