-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2021 a las 21:27:00
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cartalaboral_metrolinea`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anothers`
--

CREATE TABLE `anothers` (
  `id` int(11) NOT NULL,
  `object` varchar(1500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `value` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `execution_time` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `initial_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `contract` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contractor`
--

CREATE TABLE `contractor` (
  `id` int(11) NOT NULL,
  `identification` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `document_type` int(11) DEFAULT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `contractor`
--

INSERT INTO `contractor` (`id`, `identification`, `document_type`, `name`) VALUES
(1, '111288222', 1, 'ROMAN ANDRES VELASQUEZ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `year` smallint(6) DEFAULT NULL,
  `contract_number` smallint(6) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `object` varchar(1500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `execution_time` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `value` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `initial_date` date DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `contractor` int(11) DEFAULT NULL,
  `contractor_type` int(11) DEFAULT NULL,
  `supervisor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `contracts`
--

INSERT INTO `contracts` (`id`, `year`, `contract_number`, `date`, `object`, `execution_time`, `value`, `initial_date`, `finish_date`, `state`, `contractor`, `contractor_type`, `supervisor`) VALUES
(1, 2021, 1, '2021-02-11 14:07:44', 'PRESTAR LOS SERVICIOS PROFESIONALES COMO ABOGADO PARA REPRESENTAR JUDICIAL Y EXTRAJUDICIALMENTE A METROLÍNEA S.A. y BRINDAR ASESORÍA JURÍDICA EN LOS ASUNTOS QUE LE SEAN ENCOMENDADOS', '6 MESES', '71400000', '2021-01-16', '2021-07-15', 0, 1, 1, 1),
(2, 2020, 1, '2020-02-04 14:07:44', 'PRESTAR LOS SERVICIOS PROFESIONALES COMO ABOGADO PARA REPRESENTAR JUDICIAL Y EXTRAJUDICIALMENTE A METROLÍNEA S.A. y BRINDAR ASESORÍA JURÍDICA EN LOS ASUNTOS QUE LE SEAN ENCOMENDADOS', '6 MESES', '71400000', '2020-01-16', '2021-07-15', 0, 1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contract_type`
--

CREATE TABLE `contract_type` (
  `id` int(11) NOT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `contract_type`
--

INSERT INTO `contract_type` (`id`, `name`) VALUES
(1, 'CONTRATO DE PRESTACION DE SERVICIOS PROFESIONALES'),
(3, 'Indefinido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependency`
--

CREATE TABLE `dependency` (
  `id` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `dependency`
--

INSERT INTO `dependency` (`id`, `name`) VALUES
('05', 'OFICINA DE PLANEACION'),
('07', 'DIRECCION DE OPERACIONES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document_type`
--

CREATE TABLE `document_type` (
  `id` int(11) NOT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `document_type`
--

INSERT INTO `document_type` (`id`, `name`) VALUES
(1, 'cédula de ciudadanía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_title`
--

CREATE TABLE `job_title` (
  `id` int(11) NOT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `job_title`
--

INSERT INTO `job_title` (`id`, `name`) VALUES
(1, 'P.E. GESTION DE PLANES, PROGRAMAS Y PROYECTOS'),
(2, 'PROFESIONAL UNIVERSITARIO I MANTENIMIENTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payroll`
--

CREATE TABLE `payroll` (
  `id` int(11) NOT NULL,
  `identification` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `document_type` int(11) NOT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `first_surname` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `second_surname` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `expedition_place` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `state` tinyint(4) NOT NULL,
  `admission_date` date NOT NULL,
  `retirement_date` date NOT NULL,
  `contract_type` int(11) NOT NULL,
  `job_title` int(11) NOT NULL,
  `salary` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `dependency` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `payroll`
--

INSERT INTO `payroll` (`id`, `identification`, `document_type`, `name`, `first_surname`, `second_surname`, `expedition_place`, `state`, `admission_date`, `retirement_date`, `contract_type`, `job_title`, `salary`, `dependency`) VALUES
(2, '13744709', 1, 'JAVIER DARIO', 'VEGA', 'LEON', 'BUCARAMANGA', 1, '2018-01-01', '2021-07-07', 3, 1, '5623612', '05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resolution`
--

CREATE TABLE `resolution` (
  `id` int(11) NOT NULL,
  `object` varchar(1500) COLLATE utf8_spanish_ci NOT NULL,
  `appointment_resolution` datetime NOT NULL,
  `certificate_possession` datetime NOT NULL,
  `payroll_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supervisor`
--

CREATE TABLE `supervisor` (
  `id` int(11) NOT NULL,
  `identification` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `document_type` int(11) DEFAULT NULL,
  `name` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `supervisor`
--

INSERT INTO `supervisor` (`id`, `identification`, `document_type`, `name`) VALUES
(1, '1222222222', 1, 'SANTIAGO MIGUEL ORTIZ ACEVEDO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anothers`
--
ALTER TABLE `anothers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract` (`contract`);

--
-- Indices de la tabla `contractor`
--
ALTER TABLE `contractor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_type` (`document_type`);

--
-- Indices de la tabla `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contractor` (`contractor`),
  ADD KEY `contractor_type` (`contractor_type`),
  ADD KEY `supervisor` (`supervisor`);

--
-- Indices de la tabla `contract_type`
--
ALTER TABLE `contract_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `dependency`
--
ALTER TABLE `dependency`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `document_type`
--
ALTER TABLE `document_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `job_title`
--
ALTER TABLE `job_title`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payroll`
--
ALTER TABLE `payroll`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_type` (`document_type`),
  ADD KEY `contract_type` (`contract_type`),
  ADD KEY `job_title` (`job_title`),
  ADD KEY `dependency` (`dependency`);

--
-- Indices de la tabla `resolution`
--
ALTER TABLE `resolution`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_user` (`payroll_user`);

--
-- Indices de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_type` (`document_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anothers`
--
ALTER TABLE `anothers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contractor`
--
ALTER TABLE `contractor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `contract_type`
--
ALTER TABLE `contract_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `document_type`
--
ALTER TABLE `document_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `job_title`
--
ALTER TABLE `job_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `resolution`
--
ALTER TABLE `resolution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anothers`
--
ALTER TABLE `anothers`
  ADD CONSTRAINT `anothers_ibfk_1` FOREIGN KEY (`contract`) REFERENCES `contracts` (`id`);

--
-- Filtros para la tabla `contractor`
--
ALTER TABLE `contractor`
  ADD CONSTRAINT `contractor_ibfk_1` FOREIGN KEY (`document_type`) REFERENCES `document_type` (`id`);

--
-- Filtros para la tabla `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`contractor`) REFERENCES `contractor` (`id`),
  ADD CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`contractor_type`) REFERENCES `contract_type` (`id`),
  ADD CONSTRAINT `contracts_ibfk_3` FOREIGN KEY (`supervisor`) REFERENCES `supervisor` (`id`);

--
-- Filtros para la tabla `payroll`
--
ALTER TABLE `payroll`
  ADD CONSTRAINT `payroll_ibfk_1` FOREIGN KEY (`document_type`) REFERENCES `document_type` (`id`),
  ADD CONSTRAINT `payroll_ibfk_2` FOREIGN KEY (`contract_type`) REFERENCES `contract_type` (`id`),
  ADD CONSTRAINT `payroll_ibfk_3` FOREIGN KEY (`job_title`) REFERENCES `job_title` (`id`),
  ADD CONSTRAINT `payroll_ibfk_6` FOREIGN KEY (`dependency`) REFERENCES `dependency` (`id`);

--
-- Filtros para la tabla `resolution`
--
ALTER TABLE `resolution`
  ADD CONSTRAINT `resolution_ibfk_1` FOREIGN KEY (`payroll_user`) REFERENCES `payroll` (`id`);

--
-- Filtros para la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`document_type`) REFERENCES `document_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
