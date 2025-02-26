-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 29-01-2025 a las 17:32:32
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Artes_Marciales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Aprendiz`
--

CREATE TABLE `Aprendiz` (
  `idAprendiz` int NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `cuota` decimal(8,2) NOT NULL,
  `pagado` tinyint(1) NOT NULL,
  `idSensei` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Aprendiz`
--

INSERT INTO `Aprendiz` (`idAprendiz`, `nombre`, `fecha_nacimiento`, `cuota`, `pagado`, `idSensei`) VALUES
(1, 'Mario', '2016-09-23', 30.50, 1, 2),
(2, 'Alvaro', '2016-05-17', 35.10, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Sensei`
--

CREATE TABLE `Sensei` (
  `idSensei` int NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Sensei`
--

INSERT INTO `Sensei` (`idSensei`, `nombre`, `fecha_nacimiento`, `tipo`, `peso`, `activo`) VALUES
(1, 'Juan', '2015-01-14', 'Taekwondo', 80.30, 1),
(2, 'Alicia', '2015-09-21', 'Karate', 78.20, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Aprendiz`
--
ALTER TABLE `Aprendiz`
  ADD PRIMARY KEY (`idAprendiz`),
  ADD KEY `fk_idSensei` (`idSensei`);

--
-- Indices de la tabla `Sensei`
--
ALTER TABLE `Sensei`
  ADD PRIMARY KEY (`idSensei`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Aprendiz`
--
ALTER TABLE `Aprendiz`
  MODIFY `idAprendiz` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Sensei`
--
ALTER TABLE `Sensei`
  MODIFY `idSensei` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Aprendiz`
--
ALTER TABLE `Aprendiz`
  ADD CONSTRAINT `fk_idSensei` FOREIGN KEY (`idSensei`) REFERENCES `Sensei` (`idSensei`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
