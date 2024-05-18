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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.*;
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

        if (pedido != null) {
            logger.info(pedido.toString());
            pedido.setEstado("Preparado");

            List<String> idComidas = pedido.getComidas().stream().map(ComidaPedido::getComidaId).toList();

            // a partir del id de la comida lo dividimos entre el length de la lista

            for (String id : idComidas) {
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
     * metodo para devolver los pedidos filtrados a través de una fecha
     * damos x omitido horas y segundos, solo nos interesa el día. PENDIENTE rango fechas
     *
     * @param fecha
     * @return
     */
    public List<Pedido> obtenerPedidosFecha(String fecha) {

        // obtenemos todas las fechas
        List<Pedido> pedidos = new ArrayList<>();

        try {

            Calendar calFechaSeleccionada = getCalendar(fecha);
            int diaSeleccionado = calFechaSeleccionada.get(Calendar.DAY_OF_MONTH);
            int mesSeleccionado = calFechaSeleccionada.get(Calendar.MONTH);

            return this.pedidoRepository.findAll()
                    .stream()
                    .filter(pedido -> {
                        Calendar calPedido = Calendar.getInstance();
                        calPedido.setTime(pedido.getHoraPedido());
                        int diaPedido = calPedido.get(Calendar.DAY_OF_MONTH);
                        int mesPedido = calPedido.get(Calendar.MONTH);

                        return diaPedido == diaSeleccionado && mesPedido == mesSeleccionado;
                    })
                    .toList();

        } catch (ParseException e) {
            System.err.println("Error al parsear la fecha");
        }

        return pedidos;

    }

    /**
     * metodo para obtener los pedidos totales en un rango de fechas
     * @param fecha1
     * @param fecha2
     * @return
     */
    public Map<Date, Integer> obtenerPedidosRangoFechas(String fecha1, String fecha2) {
        // Crear un map fecha -> num total de pedidos
        Map<Date, Integer> pedidosPorFecha = new TreeMap<>();

        // tenemos un rango x ejem del 1 de mayo al 5, vamos a calcular de cada dia el numero total de pedidos e integrarlo en el map
        try {
            Calendar calFecha1 = getCalendar(fecha1);
            Calendar calFecha2 = getCalendar(fecha2);

            int dia1 = calFecha1.get(Calendar.DAY_OF_MONTH);
            int mes1 = calFecha1.get(Calendar.MONTH);

            int dia2 = calFecha2.get(Calendar.DAY_OF_MONTH);
            int mes2 = calFecha2.get(Calendar.MONTH);


            for (int i = dia1; i <= dia2; i++) {
                for (int j = mes1; j <= mes2; j++) {

                    // para evitar el fallo de expresiones lambda
                    final int dia = i;
                    final int mes = j;

                    // 1º creamos el calendario con el formato DIA - MES - AÑO de cada fecha
                    Calendar cal = Calendar.getInstance();
                    cal.set(Calendar.DAY_OF_MONTH, i);
                    cal.set(Calendar.MONTH, j);
                    cal.set(Calendar.YEAR, calFecha1.get(Calendar.YEAR));


                    // obtenemos los pedidos de esa fecha
                    List<Pedido> pedidos = this.pedidoRepository.findAll()
                            .stream()
                            .filter(pedido -> {
                                Calendar calPedido = Calendar.getInstance();
                                calPedido.setTime(pedido.getHoraPedido());
                                int diaPedido = calPedido.get(Calendar.DAY_OF_MONTH);
                                int mesPedido = calPedido.get(Calendar.MONTH);

                                return diaPedido == dia && mesPedido == mes;
                            })
                            .toList();

                    // guardamos en el map la fecha formateada y el numero de pedidos
                    Date fechaSeleccionada = cal.getTime();

                    pedidosPorFecha.put(fechaSeleccionada, pedidos.size());
                }
            }

        } catch (ParseException e) {
            System.err.println("Error al parsear la fecha");
    }
        return pedidosPorFecha;
    }



    /**
     * metodo para parsear correctamente la fecha y obtener el día y el mes
     *
     * @param fecha => formato "Thu May 16 2024 19:46:24 GMT+0200"
     * @return
     * @throws ParseException
     */
    private static Calendar getCalendar(String fecha) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("EE MMM dd yyyy HH:mm:ss z ", Locale.ENGLISH);
        Date fechaSeleccionada = formatter.parse(fecha);


        // nos interesa solo el día y el mes por lo que lo parseamos
        // a partir del string sacamos el día y el mes
        // usamos calendar para sacar el día y el mes y comp. solo estos evitando mins y segs
        Calendar calFechaSeleccionada = Calendar.getInstance();
        calFechaSeleccionada.setTime(fechaSeleccionada);
        return calFechaSeleccionada;
    }

    /**
     * metodo para obtener los pedidos del usuario para que lo compruebe
     *
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