-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-10-2023 a las 05:52:54
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `calificacion` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `id_usuario`, `id_resena`, `calificacion`) VALUES
(1, 7, 5, 3),
(2, 7, 6, 5),
(3, 7, 7, 1),
(4, 23, 5, 2),
(5, 23, 6, 5),
(6, 23, 7, 4),
(7, 23, 8, 4),
(8, 23, 9, 5),
(9, 7, 9, 3),
(10, 7, 8, 3),
(11, 24, 7, 3),
(12, 24, 5, 4),
(13, 24, 6, 2),
(14, 24, 8, 5),
(15, 24, 9, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `lista_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id`, `resena_id`, `lista_id`) VALUES
(12, 5, 8),
(13, 8, 8),
(14, 8, 9),
(15, 5, 9);

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

--
-- Volcado de datos para la tabla `comunicados`
--

INSERT INTO `comunicados` (`id`, `id_autor`, `titulo`, `mensaje`, `fecha`) VALUES
(1, 7, 'Cambios en sistema de foros.', 'Se agregara la opcion de enviar imagenes.', '2023-10-16'),
(2, 7, 'Proximos Eventos', 'Se haran eventos por epocas festivos, sorteos de creditos.', '2023-10-16');

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
  `combustible` varchar(50) NOT NULL,
  `puertas` int(11) NOT NULL,
  `transmision` varchar(100) NOT NULL,
  `motor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles`
--

INSERT INTO `detalles` (`id`, `modelo`, `marca`, `ano`, `hp`, `combustible`, `puertas`, `transmision`, `motor`) VALUES
(4, 'G500', 'Mercedez Benz', 2020, 320, 'diesel', 4, 'automatica', '3.5'),
(5, 'Aventador', 'Lamborghini', 2022, 500, 'nafta', 2, 'automatica', '4.0'),
(6, 'Swift Sedan GL', 'Suzuki', 2021, 230, 'Diesel', 4, 'Automatica', '2.6'),
(7, 'Skua', 'Motomel', 2016, 150, 'Diesel', 0, 'Automatica', '2.6'),
(8, 'Skua 150', 'Motomel', 2016, 150, 'Diesel', 0, 'Automatica', '2.6'),
(9, 'TT', 'Audi', 2013, 350, 'Diesel', 2, 'Automatica', '3.4'),
(10, 'Bora', 'Volkswagen', 2016, 270, 'Nafta', 4, 'Automatica', '1.8 T'),
(11, 'XR 150 L', 'Honda', 2015, 150, 'Nafta', 0, '5 Velocidades', '	Monocilíndrico, 4 tiempos, 2 válvulas, OHC, refri'),
(12, 'Series 3', 'BMW', 2022, 480, 'Diesel', 4, 'Automatica', '3.0 ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE `foros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros`
--

INSERT INTO `foros` (`id`, `titulo`, `id_usuario`) VALUES
(2, 'Foro de Santiago', 7);

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

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`id`, `titulo`, `subtitulo`, `imagen`) VALUES
(8, 'Las mejores motos', 'Las motos mas buscadas del mercado y mejores posicionadas del foro.', 'http://localhost:3000/images/1695052232856-istockphoto-1273534607-612x612.jpg'),
(9, 'Mejores motos', 'Del 2023', 'http://localhost:3000/images/1696187980331-1694049569813-motomel_skua_150cc_cross_2021_id2881_29.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `mensaje` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_usuario`, `id_foro`, `mensaje`) VALUES
(1, 7, 1, 'Buenas chat'),
(2, 7, 1, 'Soy santi'),
(3, 24, 1, 'Que tal admin?'),
(4, 7, 2, 'Buenas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quejas`
--

CREATE TABLE `quejas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` varchar(3500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `quejas`
--

INSERT INTO `quejas` (`id`, `usuario_id`, `mensaje`) VALUES
(1, 7, 'ME gustaria verla en el show'),
(2, 7, 'Es un gato siames'),
(5, 7, 'NEecesito ayuda'),
(6, 7, 'Santiago admiin ayudame');

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
  `id_reportante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id`, `id_usuario`, `id_foro`, `id_articulo`, `id_resena`, `id_reportante`) VALUES
(2, 5, 3, 0, 0, 1),
(3, 7, 0, 3, 0, 7),
(4, 7, 0, 3, 0, 7),
(6, 7, 0, 3, 0, 7),
(7, 7, 1, 0, 0, 24);

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
  `titulo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`id`, `id_usuario`, `id_detalles`, `calificaciones`, `imagen`, `descripcion`, `titulo`) VALUES
(5, 7, 8, 9, 'http://localhost:3000/images/1694049569813-motomel_skua_150cc_cross_2021_id2881_29.jpg', 'Una moto versatil economica y ligera, para principiantes y avanzados relacion precio-calidad', 'Skua 150'),
(6, 7, 9, 12, 'http://localhost:3000/images/1694610698796-NAZ_9b63e097ba764683b356e75f121c6bcb.jpg', 'Vehiculo confiable y de años en el mercado, una excelente opcion.', 'Audi TT'),
(7, 7, 10, 8, 'http://localhost:3000/images/1694610813790-283239_ELS-3503_01.jpg', 'El auto mas elegido entre los argentinos que buscan un coche multifuncion', 'Bora T'),
(8, 23, 11, 12, 'http://localhost:3000/images/1695044838158-xr.jpg', 'Moto practica y liviana, la mas recomendada y codiciada', 'XR'),
(9, 23, 12, 11, 'http://localhost:3000/images/1695044944376-bmw-serie-3-2023-28-996x664.jpg', 'Un auto lujoso de gama alta, vehiculo de uso cotidiano y personal.', 'BMW Series 3');

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
(1, 'Admin', 'Cancun', 'admin@alcaldeforo.com', 'superadmin', '$2b$10$b3gSxCZMzsL51gywFRPWTueUSqRlk4hNPwObo9qEFRtmThGLhBLCm', 0, 0);

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

--
-- Volcado de datos para la tabla `versus`
--

INSERT INTO `versus` (`id`, `coche1_id`, `coche2_id`, `imagen`) VALUES
(4, 7, 9, 'http://localhost:3000/images/1695304760532-1695052232856-istockphoto-1273534607-612x612.jpg'),
(5, 5, 9, 'http://localhost:3000/images/1696187861210-1694642469699-istockphoto-1273534607-612x612.jpg');

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
-- Volcado de datos para la tabla `versus_votos`
--

INSERT INTO `versus_votos` (`id`, `id_versus`, `id_usuario`, `id_coche`, `punto`) VALUES
(3, 4, 7, 7, 1),
(4, 4, 24, 9, 1),
(5, 4, 23, 9, 1),
(6, 5, 7, 5, 1);

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
-- Indices de la tabla `quejas`
--
ALTER TABLE `quejas`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `coches`
--
ALTER TABLE `coches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comunicados`
--
ALTER TABLE `comunicados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `foros`
--
ALTER TABLE `foros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `quejas`
--
ALTER TABLE `quejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `versus`
--
ALTER TABLE `versus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `versus_votos`
--
ALTER TABLE `versus_votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
