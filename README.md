TuRestauranteEnCasa
TuRestauranteEnCasa es un proyecto que permite a los usuarios disfrutar de la experiencia culinaria de un restaurante desde la comodidad de sus hogares. Este sistema está desarrollado utilizando Angular para el frontend y Spring para el backend. Además, se implementan tecnologías como JSON Web Tokens (JWT) y MongoDB como base de datos.

Características
Interfaz intuitiva: La interfaz de usuario está diseñada con Angular para proporcionar una experiencia de usuario fluida e intuitiva.
Autenticación segura: Se implementa autenticación mediante JWT para garantizar la seguridad de los usuarios y sus datos.
Autorización: Se utiliza OAuth3 para gestionar la autorización y controlar el acceso a los recursos del sistema.
Base de datos MongoDB: Se emplea MongoDB como base de datos, ofreciendo flexibilidad y escalabilidad para almacenar y gestionar los datos del sistema.
Gestión de pedidos: Los usuarios pueden realizar y gestionar pedidos desde la aplicación, con opciones para personalizar sus selecciones.
Gestión de menús: Los administradores pueden crear y gestionar menús, incluyendo la adición, eliminación y edición de platos.
Seguimiento de pedidos en tiempo real: Los usuarios pueden realizar un seguimiento en tiempo real del estado de sus pedidos, desde la preparación hasta la entrega.
Requisitos del Sistema
Node.js
Angular CLI
Java Development Kit (JDK)
Spring Boot
MongoDB
Instalación
Clona este repositorio: git clone https://github.com/turestauranteencasa.git
Navega al directorio del proyecto backend: cd turestauranteencasa-backend
Ejecuta el servidor Spring Boot: ./mvnw spring-boot:run
Navega al directorio del proyecto frontend: cd ../turestauranteencasa-frontend
Instala las dependencias de Angular: npm install
Inicia el servidor de desarrollo de Angular: ng serve
Configuración
Base de datos MongoDB: Asegúrate de configurar la conexión a tu instancia de MongoDB en el archivo de configuración de Spring Boot (application.properties).
Uso
Accede a la aplicación desde tu navegador web: http://localhost:4200
Regístrate como usuario o inicia sesión si ya tienes una cuenta.
Explora el menú, realiza pedidos y disfruta de la experiencia culinaria desde tu hogar.
