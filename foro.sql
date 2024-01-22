-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-01-2024 a las 17:07:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alcalde_foro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `contenido` varchar(10000) DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `portada` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `id_usuario`, `titulo`, `subtitulo`, `contenido`, `fecha`, `portada`) VALUES
(2, 1, 'Auto de los sueños', 'El mejor auto en precio', '<p><strong>Este auto esta tomando relevancia en las ultimas horas debido a su bajo costo de mantenimiento y produccion.</strong></p>\r\n<p><strong><img src=\"http://localhost:3000/images/1705932421417-bora.jpg\" alt=\"\" width=\"568\" height=\"426\" /></strong></p>', '2024-01-22', 'http://localhost:3000/images/1705932428444-bora.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `gasolina` int(11) DEFAULT 1,
  `confiabilidad` int(11) DEFAULT 1,
  `confort` int(11) DEFAULT 1,
  `diseno` int(11) DEFAULT 1,
  `manejo` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `id_usuario`, `id_resena`, `gasolina`, `confiabilidad`, `confort`, `diseno`, `manejo`) VALUES
(2, 1, 14, 0, 0, 3, 0, 0),
(3, 2, 14, 2, 4, 4, 4, 5),
(4, 2, 15, 3, 1, 1, 1, 1),
(5, 1, 15, 5, 4, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrete`
--

CREATE TABLE `carrete` (
  `id` int(11) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `id_resena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrete`
--

INSERT INTO `carrete` (`id`, `imagen`, `id_resena`) VALUES
(4, 'http://localhost:3000/images\\1705504828266-audi.jpg', 14),
(5, 'http://localhost:3000/images/1705505364195-audi.jpg', 15),
(6, 'http://localhost:3000/images/1705505364224-bmw.jpg', 15),
(7, 'http://localhost:3000/images/1705505364254-bora.jpg', 15),
(8, 'http://localhost:3000/images/1705505364287-sedan.png', 15),
(9, 'http://localhost:3000/images/1705930028164-audi.jpg', 16),
(10, 'http://localhost:3000/images/1705938084470-audi.jpg', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `lista_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunicados`
--

CREATE TABLE `comunicados` (
  `id` int(11) NOT NULL,
  `id_autor` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `mensaje` varchar(3500) NOT NULL,
  `fecha` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `ano` int(11) NOT NULL DEFAULT 2000,
  `hp` int(11) NOT NULL DEFAULT 0,
  `puertas` int(11) NOT NULL,
  `precio_inicial` int(11) NOT NULL DEFAULT 0,
  `precio_final` int(11) NOT NULL DEFAULT 0,
  `etiquetas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles`
--

INSERT INTO `detalles` (`id`, `modelo`, `marca`, `ano`, `hp`, `puertas`, `precio_inicial`, `precio_final`, `etiquetas`) VALUES
(16, '150', 'Motomel', 2017, 200, 0, 1005000, 2350000, 'estudiantes, deportivo'),
(17, '1.8T', 'Volkswagen', 2009, 200, 4, 45000, 120000, 'rendidor, pickup, economico'),
(19, 'A4', 'Audi', 2016, 200, 4, 80999, 126300, 'carga, familiar, deportivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE `foros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros`
--

INSERT INTO `foros` (`id`, `titulo`, `id_usuario`, `estado`) VALUES
(1, 'Vehiculos Generales', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `visitas` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `id_usuario`, `id_resena`, `visitas`) VALUES
(1, 1, 15, 112),
(3, 1, 14, 7),
(4, 2, 14, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(100) NOT NULL,
  `imagen` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `mensaje` varchar(1500) DEFAULT '',
  `imagen` varchar(130) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_usuario`, `id_foro`, `mensaje`, `imagen`) VALUES
(15, 1, 1, 'sa', ''),
(17, 2, 1, 'sa', ''),
(18, 2, 1, 'sa', ''),
(19, 2, 1, 'tonto', ''),
(20, 2, 1, 'Buens', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_likes`
--

CREATE TABLE `mensajes_likes` (
  `id` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_mensaje` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_votante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes_likes`
--

INSERT INTO `mensajes_likes` (`id`, `id_foro`, `id_mensaje`, `point`, `id_votante`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 1, 2),
(3, 1, 14, 1, 2),
(5, 1, 15, 1, 2),
(7, 1, 8, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_replica`
--

CREATE TABLE `mensajes_replica` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_mensaje` int(11) NOT NULL,
  `mensaje` text DEFAULT NULL,
  `imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes_replica`
--

INSERT INTO `mensajes_replica` (`id`, `id_usuario`, `id_foro`, `id_mensaje`, `mensaje`, `imagen`) VALUES
(8, 2, 1, 20, 'buenas', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_reply_likes`
--

CREATE TABLE `mensaje_reply_likes` (
  `id` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_reply` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_votante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_usuario`, `mensaje`, `fecha`) VALUES
(4, 2, 'Has sido baneado por tener 3 strikes', '2024-01-17'),
(5, 2, 'Has sido baneado por tener 3 strikes', '2024-01-17'),
(6, 2, 'Palabras Prohibidas', '2024-01-17'),
(7, 2, 'Has sido baneado por tener 3 strikes', '2024-01-22'),
(8, 2, 'Sancionado por no respetar las reglas', '2024-01-22'),
(9, 2, 'Has sido baneado por tener 3 strikes', '2024-01-22'),
(10, 2, 'Foto inapropiada', '2024-01-22'),
(11, 2, 'Has sido ascendido a escritor', '2024-01-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quejas`
--

CREATE TABLE `quejas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` varchar(3500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id` int(11) NOT NULL,
  `tipo_sancion` varchar(150) NOT NULL,
  `id_sancionado` int(11) NOT NULL,
  `razon` varchar(250) NOT NULL,
  `id_moderador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `tipo_sancion`, `id_sancionado`, `razon`, `id_moderador`) VALUES
(2, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(3, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(4, 'BAN', 2, 'Palabras Prohibidas', 3),
(5, 'BAN', 2, 'Palabras Prohibidas', 3),
(6, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(7, 'BAN', 2, 'Sancionado por no respetar las reglas', 1),
(8, 'STRIKE', 2, 'Sancionado por no respetar las reglas', 1),
(9, 'BAN', 2, 'Foto inapropiada', 1),
(10, 'STRIKE', 2, 'Foto inapropiada', 1),
(11, 'PERDON', 2, 'Perdonado por malas sanciones', 1),
(12, 'ASCENSO', 2, 'Se ascendio un usuario de id 2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglas`
--

CREATE TABLE `reglas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `contenido` varchar(670) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reglas`
--

INSERT INTO `reglas` (`id`, `nombre`, `contenido`) VALUES
(1, 'Regla General de Foros', 'No insultar, No Spamear, No Floodear, Respetar a usuarios.'),
(2, 'Palabras', 'Tonto, Tonto, Malo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `id_articulo` int(11) DEFAULT NULL,
  `id_resena` int(11) DEFAULT NULL,
  `id_reportante` int(11) NOT NULL,
  `motivo` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--

CREATE TABLE `resena` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_detalles` int(11) NOT NULL,
  `calificaciones` int(11) DEFAULT 0,
  `imagen` varchar(1500) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `video` varchar(500) DEFAULT NULL,
  `visitas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`id`, `id_usuario`, `id_detalles`, `calificaciones`, `imagen`, `descripcion`, `titulo`, `video`, `visitas`) VALUES
(14, 1, 16, 0, 'http://localhost:3000/images/1705349914085-tornado.jpg', 'La moto mas rendidora en la ciudad', 'Skua', '_6XzJPyAJDI', 18),
(15, 2, 17, 0, 'http://localhost:3000/images/1705505364159-bora.jpg', 'El coche elegido en Argentina', 'Bora', 'Opxhh9Oh3rg', 118),
(17, 1, 19, 0, 'http://localhost:3000/images/1705938084436-a4.jpg', 'La mejor opcion para el dia a dia', 'Audi A4', '1JZLzFT74QU', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_chasis`
--

CREATE TABLE `resena_chasis` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `motor` varchar(150) NOT NULL,
  `traccion` varchar(150) NOT NULL,
  `tranmision` varchar(150) NOT NULL,
  `frenos` varchar(150) NOT NULL,
  `neumaticos` varchar(150) NOT NULL,
  `suspdelantero` varchar(150) NOT NULL,
  `susptrasera` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_chasis`
--

INSERT INTO `resena_chasis` (`id`, `resena_id`, `motor`, `traccion`, `tranmision`, `frenos`, `neumaticos`, `suspdelantero`, `susptrasera`, `direccion`) VALUES
(13, 14, 'Centro', 'Arrastre', 'Manual', 'Frenos a disco', 'Pirelli', 'Si', 'Si', 'No'),
(14, 15, 'Centro', 'Arrastre', 'Manual', 'Si', 'Si', 'Si', 'Si', 'Si'),
(16, 17, 'Centro', 'Delantera', 'Automatica', 'Si', 'Si', 'Si', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_comentarios`
--

CREATE TABLE `resena_comentarios` (
  `id` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_comentarios`
--

INSERT INTO `resena_comentarios` (`id`, `id_resena`, `id_usuario`, `mensaje`) VALUES
(1, 15, 2, 'b'),
(2, 15, 1, 'como estas'),
(3, 15, 1, 'ass'),
(4, 14, 1, 'Hola se ve bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_confort`
--

CREATE TABLE `resena_confort` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `aire` varchar(150) NOT NULL,
  `asientosd` varchar(150) NOT NULL,
  `asientost` varchar(150) NOT NULL,
  `cierre` varchar(150) NOT NULL,
  `espejoi` varchar(150) NOT NULL,
  `espejoe` varchar(150) NOT NULL,
  `farosniebla` varchar(150) NOT NULL,
  `farosdelanteros` varchar(150) NOT NULL,
  `cambios` varchar(150) NOT NULL,
  `quemacocos` varchar(150) NOT NULL,
  `rines` varchar(150) NOT NULL,
  `vestiduras` varchar(150) NOT NULL,
  `crucero` varchar(150) NOT NULL,
  `vidrios` varchar(150) NOT NULL,
  `volante` varchar(150) NOT NULL,
  `cajuela` varchar(150) NOT NULL,
  `sensor` varchar(150) NOT NULL,
  `camara` varchar(150) NOT NULL,
  `computadora` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_confort`
--

INSERT INTO `resena_confort` (`id`, `resena_id`, `aire`, `asientosd`, `asientost`, `cierre`, `espejoi`, `espejoe`, `farosniebla`, `farosdelanteros`, `cambios`, `quemacocos`, `rines`, `vestiduras`, `crucero`, `vidrios`, `volante`, `cajuela`, `sensor`, `camara`, `computadora`) VALUES
(2, 14, 'No', 'No', 'No', 'No', '1', '2', 'No', 'Si', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'Si', 'No', 'No', 'No'),
(3, 15, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'),
(5, 17, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'No', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_entretenimiento`
--

CREATE TABLE `resena_entretenimiento` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `musica` varchar(150) NOT NULL,
  `bocinas` varchar(150) NOT NULL,
  `conex` varchar(150) NOT NULL,
  `bluetooth` varchar(150) NOT NULL,
  `tablero` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_entretenimiento`
--

INSERT INTO `resena_entretenimiento` (`id`, `resena_id`, `musica`, `bocinas`, `conex`, `bluetooth`, `tablero`) VALUES
(4, 14, 'No', 'Si', 'No', 'No', 'No'),
(5, 15, 'Si', 'Si', 'Si', 'Si', 'Si'),
(7, 17, 'Si', 'Si', 'Si', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_medidas`
--

CREATE TABLE `resena_medidas` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `largo` varchar(11) NOT NULL,
  `alto` varchar(11) NOT NULL,
  `ancho` varchar(11) NOT NULL,
  `distanciaejes` varchar(11) NOT NULL,
  `cajuela` varchar(150) NOT NULL,
  `tanque` varchar(11) NOT NULL,
  `peso` varchar(11) NOT NULL,
  `capacidadcarga` varchar(150) NOT NULL,
  `alturapiso` varchar(150) NOT NULL,
  `capacidadvadeo` varchar(150) NOT NULL,
  `anguloataque` varchar(150) NOT NULL,
  `angulopartida` varchar(150) NOT NULL,
  `anguloventral` varchar(150) NOT NULL,
  `remolque` varchar(150) NOT NULL,
  `escalonamiento` varchar(150) NOT NULL,
  `inclinacion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_medidas`
--

INSERT INTO `resena_medidas` (`id`, `resena_id`, `largo`, `alto`, `ancho`, `distanciaejes`, `cajuela`, `tanque`, `peso`, `capacidadcarga`, `alturapiso`, `capacidadvadeo`, `anguloataque`, `angulopartida`, `anguloventral`, `remolque`, `escalonamiento`, `inclinacion`) VALUES
(6, 14, '200', '110', '70', '250', 'No', '10', '1250', '350 KG', '60', '2000', '90 deg', '60 deg', '-50 deg', 'Si', 'Si', '200'),
(7, 15, '220', '80', '90', '20', '50', '80', '4500', '2400', '30', '30', '30deg', '30deg', '70deg', 'Si', '30deg', '50deg'),
(9, 17, '250', '90', '180', '90', '50', '120', '6400', '3200KG', '50', 'Si', '80deg', '80deg', '80deg', 'Si', 'Si', '20deg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_motor`
--

CREATE TABLE `resena_motor` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `combustible` varchar(150) NOT NULL,
  `potencia` int(11) NOT NULL,
  `torque` varchar(150) NOT NULL,
  `cilindros` int(11) NOT NULL,
  `valvulas` varchar(150) NOT NULL,
  `alimentacion` varchar(150) NOT NULL,
  `sistema` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_motor`
--

INSERT INTO `resena_motor` (`id`, `resena_id`, `combustible`, `potencia`, `torque`, `cilindros`, `valvulas`, `alimentacion`, `sistema`) VALUES
(13, 14, 'Nafta', 200, 'Arrastre', 150, '3', 'Interna', 'Si'),
(14, 15, 'Diesel', 200, 'Arrastre', 200, 'º5', 'Interna', 'Si'),
(16, 17, 'Nafta', 200, 'Arrastre', 4, '7', 'Interna', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_perfomance`
--

CREATE TABLE `resena_perfomance` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `aceleracion` int(11) NOT NULL,
  `velocidad` int(11) NOT NULL,
  `rendimientociudad` varchar(150) NOT NULL,
  `rendimientoruta` varchar(150) NOT NULL,
  `rendimientomixto` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_perfomance`
--

INSERT INTO `resena_perfomance` (`id`, `resena_id`, `aceleracion`, `velocidad`, `rendimientociudad`, `rendimientoruta`, `rendimientomixto`) VALUES
(13, 14, 65, 250, 'Excelente', 'Estandar', 'Bueno'),
(14, 15, 78, 170, 'Bueno', 'Bueno', 'Regular'),
(16, 17, 100, 350, 'Bueno', 'Bueno', 'Excelente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_seguridad`
--

CREATE TABLE `resena_seguridad` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `airbag` varchar(150) NOT NULL,
  `abs` varchar(150) NOT NULL,
  `distfrenado` varchar(150) NOT NULL,
  `asistfrenado` varchar(150) NOT NULL,
  `alarma` varchar(150) NOT NULL,
  `anclaje` varchar(150) NOT NULL,
  `cinturones` varchar(150) NOT NULL,
  `otros` varchar(450) NOT NULL,
  `sensor` varchar(150) NOT NULL,
  `terceraluz` varchar(150) NOT NULL,
  `autobloqueo` varchar(150) NOT NULL,
  `controlestabilidad` varchar(150) NOT NULL,
  `controltraccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_seguridad`
--

INSERT INTO `resena_seguridad` (`id`, `resena_id`, `airbag`, `abs`, `distfrenado`, `asistfrenado`, `alarma`, `anclaje`, `cinturones`, `otros`, `sensor`, `terceraluz`, `autobloqueo`, `controlestabilidad`, `controltraccion`) VALUES
(4, 14, 'Si', 'Si', 'No', 'No', 'Si', 'No', 'No', 'No', 'No', 'No', 'No', 'Si', 'No'),
(5, 15, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'),
(7, 17, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'No hay otras especificaciones', 'Si', 'No', 'No', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo`
--

CREATE TABLE `subforo` (
  `id` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `silenciado` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo`
--

INSERT INTO `subforo` (`id`, `id_resena`, `tipo`, `silenciado`) VALUES
(1, 1, 0, 0),
(2, 1, 1, 0),
(3, 1, 2, 1),
(4, 13, 0, 0),
(5, 13, 1, 0),
(6, 13, 2, 0),
(7, 14, 0, 0),
(8, 14, 1, 0),
(9, 14, 2, 0),
(10, 15, 0, 0),
(11, 15, 1, 0),
(12, 15, 2, 0),
(13, 16, 0, 0),
(14, 16, 1, 0),
(15, 16, 2, 0),
(16, 17, 0, 0),
(17, 17, 1, 0),
(18, 17, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_comentario`
--

CREATE TABLE `subforo_comentario` (
  `id` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `texto` varchar(1500) DEFAULT NULL,
  `imagen` varchar(1500) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_comentario`
--

INSERT INTO `subforo_comentario` (`id`, `id_subforo`, `texto`, `imagen`, `id_usuario`) VALUES
(1, 9, '', 'http://localhost:3000/images/foros/1705501735098-bmw.jpg', 2),
(3, 10, 'buenas', '', 1),
(5, 10, 'hola', '', 2),
(6, 7, 'Yo creo que es buena la mecanica de este auto.', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_likes`
--

CREATE TABLE `subforo_likes` (
  `id` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_usuario` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_likes`
--

INSERT INTO `subforo_likes` (`id`, `id_comentario`, `point`, `id_usuario`, `id_subforo`) VALUES
(7, 3, 1, 1, 10),
(11, 5, 1, 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_replicas`
--

CREATE TABLE `subforo_replicas` (
  `id` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` varchar(800) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_replicas`
--

INSERT INTO `subforo_replicas` (`id`, `id_subforo`, `id_comentario`, `id_usuario`, `texto`, `imagen`) VALUES
(6, 10, 2, 2, 'yo bien', ''),
(7, 9, 1, 1, 'Buenisima imagen', ''),
(8, 10, 5, 1, 'como va?', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_reply_likes`
--

CREATE TABLE `subforo_reply_likes` (
  `id` int(11) NOT NULL,
  `id_reply` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `rol` text NOT NULL DEFAULT 'usuario',
  `contraseña` text DEFAULT NULL,
  `strikes` int(11) DEFAULT 0,
  `ban` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `ciudad`, `correo`, `rol`, `contraseña`, `strikes`, `ban`) VALUES
(1, 'ADMIN', 'Cancun', 'admin@alcaldeforo.com', 'superadmin', '$2b$10$5r7Rp1ybTfWQbjbQ0tsNUuLYKiTdDWWDrzl3ojJB3PKSu4C0b9w6K', 0, 0),
(2, 'Jorge', 'Mexicali', 'test@gmail.com', 'escritor', '$2b$10$HOeSCYqgg8vazb8Ie28CfuZ/BGBtihcQCidBWrRFA.ZZFSUD86DRC', 5, 0),
(3, 'Automatizacion', 'Mexicali', 'bot@alcaldeforo.com', 'bot', '$2b$10$l2H0MoOdolNIuBwDTlvymuNdF.ikZJIBwFoV8eTMOVCZ682H.tKay', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus`
--

CREATE TABLE `versus` (
  `id` int(11) NOT NULL,
  `coche1_id` int(11) NOT NULL,
  `coche2_id` int(11) NOT NULL,
  `imagen` varchar(750) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus_comentarios`
--

CREATE TABLE `versus_comentarios` (
  `id` int(11) NOT NULL,
  `id_versus` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` varchar(500) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus_votos`
--

CREATE TABLE `versus_votos` (
  `id` int(11) NOT NULL,
  `id_versus` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_coche` int(11) NOT NULL,
  `punto` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrete`
--
ALTER TABLE `carrete`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coches`
--
ALTER TABLE `coches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comunicados`
--
ALTER TABLE `comunicados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `foros`
--
ALTER TABLE `foros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes_likes`
--
ALTER TABLE `mensajes_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes_replica`
--
ALTER TABLE `mensajes_replica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensaje_reply_likes`
--
ALTER TABLE `mensaje_reply_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `quejas`
--
ALTER TABLE `quejas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_chasis`
--
ALTER TABLE `resena_chasis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_comentarios`
--
ALTER TABLE `resena_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_confort`
--
ALTER TABLE `resena_confort`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_entretenimiento`
--
ALTER TABLE `resena_entretenimiento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_medidas`
--
ALTER TABLE `resena_medidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_motor`
--
ALTER TABLE `resena_motor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_perfomance`
--
ALTER TABLE `resena_perfomance`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_seguridad`
--
ALTER TABLE `resena_seguridad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo`
--
ALTER TABLE `subforo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_comentario`
--
ALTER TABLE `subforo_comentario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_likes`
--
ALTER TABLE `subforo_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_replicas`
--
ALTER TABLE `subforo_replicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_reply_likes`
--
ALTER TABLE `subforo_reply_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus`
--
ALTER TABLE `versus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus_comentarios`
--
ALTER TABLE `versus_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus_votos`
--
ALTER TABLE `versus_votos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `carrete`
--
ALTER TABLE `carrete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `coches`
--
ALTER TABLE `coches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comunicados`
--
ALTER TABLE `comunicados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `foros`
--
ALTER TABLE `foros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `mensajes_likes`
--
ALTER TABLE `mensajes_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensajes_replica`
--
ALTER TABLE `mensajes_replica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensaje_reply_likes`
--
ALTER TABLE `mensaje_reply_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `quejas`
--
ALTER TABLE `quejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `resena_chasis`
--
ALTER TABLE `resena_chasis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `resena_comentarios`
--
ALTER TABLE `resena_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `resena_confort`
--
ALTER TABLE `resena_confort`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `resena_entretenimiento`
--
ALTER TABLE `resena_entretenimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `resena_medidas`
--
ALTER TABLE `resena_medidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `resena_motor`
--
ALTER TABLE `resena_motor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `resena_perfomance`
--
ALTER TABLE `resena_perfomance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `resena_seguridad`
--
ALTER TABLE `resena_seguridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `subforo`
--
ALTER TABLE `subforo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `subforo_comentario`
--
ALTER TABLE `subforo_comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `subforo_likes`
--
ALTER TABLE `subforo_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `subforo_replicas`
--
ALTER TABLE `subforo_replicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `subforo_reply_likes`
--
ALTER TABLE `subforo_reply_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `versus`
--
ALTER TABLE `versus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `versus_comentarios`
--
ALTER TABLE `versus_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `versus_votos`
--
ALTER TABLE `versus_votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
