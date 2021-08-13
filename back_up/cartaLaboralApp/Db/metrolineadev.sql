-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2021 a las 21:27:19
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
-- Base de datos: `metrolineadev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `stamp_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `checked` tinyint(1) NOT NULL,
  `admin_id` int(32) DEFAULT 0,
  `request_type` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `forms`
--

INSERT INTO `forms` (`id`, `stamp_id`, `content`, `created_at`, `user_id`, `state`, `checked`, `admin_id`, `request_type`) VALUES
(1, 1, 'data asdasdasd asdasdasd asdasdasd asdasdasdasdasdasd asdasdasd', '2021-07-15 19:41:01', 1, 1, 1, 3, 0),
(2, 7, 'ss', '2021-07-15 19:41:01', 16, 1, 1, 3, 0),
(3, 8, 'me gustaria volar a las estrellas', '2021-07-15 19:41:01', 17, 0, 1, 3, 0),
(4, 9, 'Quiero algo', '2021-07-15 19:41:01', 18, 0, 1, 3, 0),
(5, 10, 'asdasda', '2021-07-15 19:41:01', 19, 1, 1, 3, 0),
(6, 11, 'Es un test con la segunda semana de desarrollo', '2021-07-15 19:41:01', 20, 1, 1, 3, 0),
(7, 12, 'sss', '2021-07-15 19:41:01', 21, 1, 1, 3, 0),
(8, 13, 'ss', '2021-07-15 19:41:01', 22, 0, 1, 3, 0),
(9, 14, 'asdasda', '2021-07-15 19:41:01', 23, 1, 1, 3, 0),
(83, 88, 'Es un test con la segunda semana de desarrollo', '2021-08-05 17:34:07', 97, 0, 1, 3, 0),
(84, 89, 'Es un test con la segunda semana de desarrollo', '2021-07-15 19:48:00', 98, NULL, 0, 0, 0),
(85, 90, 'sadsd', '2021-07-15 19:52:19', 99, 0, 1, 3, 0),
(86, 91, 'asdasda', '2021-07-19 14:10:52', 100, 1, 1, 3, 0),
(87, 92, 'Prueba Nomina', '2021-08-05 22:47:18', 101, 0, 1, 3, 1),
(88, 93, 'Prueba Contratista', '2021-08-05 17:34:16', 102, 0, 1, 3, 0),
(89, 94, 'Prueba Contratista', '2021-07-22 22:18:31', 103, NULL, 0, 0, 0),
(90, 95, 'Prueba Contratista', '2021-07-22 22:18:31', 104, NULL, 0, 0, 0),
(91, 96, 'Prueba con data Real no Fake', '2021-07-23 19:16:17', 105, NULL, 0, 0, 0),
(92, 97, 'Es un test con la segunda semana de desarrollo', '2021-08-05 22:50:27', 106, 0, 1, 3, 1),
(99, 104, 'ssss', '2021-08-05 17:33:29', 113, NULL, 0, 0, 0),
(100, 105, 'ssss', '2021-08-05 17:33:42', 114, NULL, 0, 0, 0),
(101, 106, 'ssss', '2021-08-05 17:33:42', 115, NULL, 0, 0, 0),
(102, 107, 'sssss', '2021-08-05 18:24:19', 116, NULL, 0, 0, 1),
(103, 108, 'sssss', '2021-08-05 18:24:27', 117, NULL, 0, 0, 0),
(104, 109, 'sssss', '2021-08-05 18:26:16', 118, NULL, 0, 0, 0),
(105, 110, 'sssss', '2021-08-05 18:27:05', 119, NULL, 0, 0, 0),
(106, 111, 'sssss', '2021-08-05 18:27:11', 120, NULL, 0, 0, 0),
(107, 112, 'sssss', '2021-08-05 18:27:13', 121, NULL, 0, 0, 0),
(108, 113, 'sss', '2021-08-05 18:33:48', 122, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id` int(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `pass` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id`, `name`, `pass`) VALUES
(0, 'server', 'sdjanjNJUWJdkaskdmjadsa'),
(3, 'Nelson', '$2a$08$O3W5gGDxzCmkCe/r50KQweoa3dYovA8J3LKGQRS82tfXOG12h3taq');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stamps`
--

CREATE TABLE `stamps` (
  `id` int(11) NOT NULL,
  `stamp_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `stamps`
--

INSERT INTO `stamps` (`id`, `stamp_url`) VALUES
(1, 'W2HIImbH-D4OY04F_bxhEZKK.pdf'),
(2, 'Myz3hBsBcGj3PrkP-rgrj-nH.pdf'),
(3, 'h9a84GiP_olrrOD-Y0LfBEOA.pdf'),
(4, 'mzaGTUqv3Fa1b0Nhq5YHn3Y1.pdf'),
(5, 'jtoCwy2q7oYDf_Z_q6ADpbIf.pdf'),
(6, 'th-uvWaFqHID9M7l-bVNbl4e.pdf'),
(7, 'dQTsVVdw5rnOH5vFmclu1PNd.pdf'),
(8, 'rAyrVOs7SvCQidYYW-Ug3k9n.pdf'),
(9, 'r1kvl8JzEiR20lcZp2j_U9J-.pdf'),
(10, 'dJCAT6Xt66mVYxH84hEpqftg.pdf'),
(11, 'vrgNE9LK1lo2_MgcAMVQfqma.pdf'),
(12, 'gazdwoM5K5XkoCNMCf3CA9OW.pdf'),
(13, 'ckeBqIe_AqBf1wFXRpLjfgX6.pdf'),
(14, '6buaiWDA8zSnnPkF3gNMm-tm.pdf'),
(15, 'aPNuxRUIdFsWvUMgen70gH88.pdf'),
(16, 'wRISHNMx5o83jg1_BRPRk9Zf.pdf'),
(17, '2P-1U8kP_0TUhRDGwJ38t3Wz.pdf'),
(18, 'QyPHsKsv9VQVzySHXyT7ecTe.pdf'),
(19, '3s4-V_WNyvspBqeIVck-msnM.pdf'),
(20, 'LJ7tc5_l5gH0o1Zp2Bo11O0N.pdf'),
(21, 'gr4Uxr-7wZYfdHUpXtNz5gNR.pdf'),
(22, 'o2mY5NVxtfFV44LdZ3p60uPF.pdf'),
(23, '7hQg2a6tm67R8q3YEkzRsjtW.pdf'),
(24, 'VUo6SM1UZDYhBvE_J2tIBuzH.pdf'),
(25, 'AXOml6etrarPgHYthm_kDRwg.pdf'),
(26, 'iJuj65erGBvRFI_yoeSzv_-P.pdf'),
(27, 'brZUZJ8Ke5gEtFOZ6v3GkvpX.pdf'),
(28, 'tAiBTLGUdZ06mIumJ2HyqHvk.pdf'),
(29, 'XV3XPxkK9QTio0L5frsLxouM.pdf'),
(30, 'iwuigs5GJ2kDj_w3rYREgjBc.pdf'),
(31, 'HukgxFvnAfGJrG3GEc8Fqrs4.pdf'),
(32, 'iBYt_7uYUncxozHKvHKo86j7.pdf'),
(33, 'Hxaw-UFxzIThJ6T-yIHGtXGd.pdf'),
(34, 'CDydkXJ0_7TjKWNaYxIizie0.pdf'),
(35, 'DpJpLFcg3ePCVVZQbEF6E-P2.pdf'),
(36, 'rE9hfz-p-M-7TfwEdbHKVyo8.pdf'),
(37, 'xbUCn58DZId_wP04zlDFqgPi.pdf'),
(38, 'RAChQQhaPKHXgHevwpWGFky2.pdf'),
(39, 'QxVTcUSRWIiMNr6umVI6WTuS.pdf'),
(40, 'll7eW6RwWNgCiRCEzRTZSJtR.pdf'),
(41, 'cB23z9QYoG47imunEnJsAUY5.pdf'),
(42, 'QeBN6KZeIP9b8trf4RGsSs46.pdf'),
(43, 'Q3TY_oC8iyx61fhQRs60hQgm.pdf'),
(44, 'b83-4m_VVZgozftf-DkHBj_4.pdf'),
(45, 'hyZl3ImxT-bdVFMLIco8Qevq.pdf'),
(46, 'Wiim6V53sZpDON_XYgvJHZ8A.pdf'),
(47, '_AsgEv0N5hBmy3XELcUKITrJ.pdf'),
(48, 'Fr4xGyYF8fAXtAjTdChUT2O7.pdf'),
(49, '7TGO7T9iMQVaglBqSnp35dXK.pdf'),
(50, 'RRay03QCQ1yJkdYwtBhyLCZ5.pdf'),
(51, 'fo3-q1EjwDbr-Yk_jmHjJ1OU.pdf'),
(52, 'LAi7sUXtMl2IiyQE_p90JVVs.pdf'),
(53, 'iiEKdN5JMRzeS8NP-EuWijUB.pdf'),
(54, 'GWacSnqYMHI94oGOYJf0ww2E.pdf'),
(55, '6GEVBtqSFmqlmWdQNLx0hX0j.pdf'),
(56, '8AGQAbkZmjCXhNeLr05M4DBG.pdf'),
(57, 'tUS3gz-KbO_Cx53tmhSUSbOj.pdf'),
(58, '6yZqn67EXA5Md8sJOooJYjdG.pdf'),
(59, 'wGnewTeQALVcIMg6q0_elS1K.pdf'),
(60, '5k97qH8MKxLTHbx4dnIVzVQq.pdf'),
(61, 'OP1nwBfK19Bs9LZPAuINeNWZ.pdf'),
(62, 'DnSI5SMJSB3zz61jAh_0WqDK.pdf'),
(63, 'qsmOIgPRAR8qckSxQuF_VmCM.pdf'),
(64, 'fff_WRiL2uY9ldNI2ZCGimG2.pdf'),
(65, 'OjsyZ_cWPzY0KaKVoPKDKSHC.pdf'),
(66, 'bDLJi3SfslrlV9AUDZZM5TsN.pdf'),
(67, 'N003wuSp53wwWyvpNaGHOV5F.pdf'),
(68, 'fS5ngEauZlpt7HTzI3bHT3Ds.pdf'),
(69, 'i2mq86sZr6iiDLDfEtK0gny3.pdf'),
(70, 'cs0GTph-WgOi3YrI-2tVTRTw.pdf'),
(71, 'bKozk_ZpxngGZESFEzMRb69F.pdf'),
(72, '7gqTJx-jNtC0wY-UXUuZNChg.pdf'),
(73, 'NPa8yX9slmAdVUJAjy79VGL6.pdf'),
(74, 'mJkkEZdUGM2MsowMWEd3XTZu.pdf'),
(75, 'biK9XN4vWKjSpRy-n2GhQx_7.pdf'),
(76, 'MmZMUBOPM5lRopN8h3nqnRRt.pdf'),
(77, 'Th5Np2JLByfozC9sPuJjy_Kg.pdf'),
(78, 'HWtyEkH3wolVg8ko-tTdo1KF.pdf'),
(79, 'DWg_OaZ9Nn1gNSA4dP3WxtUp.pdf'),
(80, 'rpUN-m7tCukWupIvcQmH9lcz.pdf'),
(81, 'tpOmeake1KgD3aKykf8xJYdd.pdf'),
(82, 'r3poqKqcyX85L1SQ2CH1b8ac.pdf'),
(83, 'NRKZoc1fJ_X5wvliYAS1bsA3.pdf'),
(84, '93o1srbbIpmEIUIdASBR6-HU.pdf'),
(85, 'zPOstOP7fXMpIR-FuVLJTsHu.pdf'),
(86, 'vVW_NGqSFaIsAen4LHUoK8z1.pdf'),
(87, 'LUCBEllleO_9iQ4AQwYqdsZU.pdf'),
(88, '37jZC8fN-M-iJz0B7zsS7aTn.pdf'),
(89, 'Pa4n1I0-LeYxDbk13Zi725zy.pdf'),
(90, 'aNkt1RDN5j209KsFh9DxFO-Q.pdf'),
(91, 'jc5Dg2PFwvNV4Efk3aMd0EUg.pdf'),
(92, 'NvDLbmC2Pn4JbnLR7G8V47ZP.pdf'),
(93, 'KS1kquZJ5zBX11ruo0WT9Z6S.pdf'),
(94, 't8vIVq2P6kdVNhdFMMD2vC-z.pdf'),
(95, 'A50LNobHOat3tFihCz-NFw-T.pdf'),
(96, 'HHNMc19Ywr5cX9vf6m5qvmNn.pdf'),
(97, '-OuTSM3CW1NOUERds2Q_KOyf.pdf'),
(98, 'lPsyh3dNW9mtWIqFRq_q1bhf.pdf'),
(99, 'S8ydtYAxt6QxCP98DVQG_VOB.pdf'),
(100, 'cFS2wJ44KLLcGf6e8mf-wbXh.pdf'),
(101, 'sdNGW0h_gYH04ktdpovqUxy7.pdf'),
(102, 'Fo0Inc36kES-2G0paYef4qXq.pdf'),
(103, 'X35RPaf3TTxwjeD5-CF7kQYC.pdf'),
(104, '1viqcojDQZSweXfKILibikG1.pdf'),
(105, 'B3QBEq-EpGykLm_HZHPot__d.pdf'),
(106, '1Y-_UiViExHl8Q3a5kO1nGSe.pdf'),
(107, 'gUA7pAyc4W7NvJTEbjyZqF_i.pdf'),
(108, 'sxcTLso3SRhG44kkV9Bf5p7-.pdf'),
(109, 'bh56jGROiCI_ppq7YueGPkNJ.pdf'),
(110, 'in5sfhUgTYErTM5s6dXcuq7S.pdf'),
(111, 'WYfFGa-S94J_bIoDMjYOAD14.pdf'),
(112, 'TQaMMmW50kfDy0-NxL5KqME0.pdf'),
(113, 'h14UHrLGod-SvOddqohpGSei.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `identification`, `telephone`, `email`) VALUES
(1, 'shinra17', 'data', 'data', 'nelsonaraujoparedes93@hotmail.com'),
(2, 'Nelson', 'ss', 'C:\\fakepath\\ESTATUTOS FINALES.pdf', 'Araujo'),
(3, 'Nelson', 'ss', 'C:\\fakepath\\ESTATUTOS FINALES.pdf', 'Araujo'),
(4, 'Nelson', 'ss', 'C:\\fakepath\\ESTATUTOS FINALES.pdf', 'Araujo'),
(5, 'Nelson', 'ss', 'C:\\fakepath\\ESTATUTOS FINALES.pdf', 'Araujo'),
(6, 'Nelson', 'ss', 'C:\\fakepath\\ESTATUTOS FINALES.pdf', 'Araujo'),
(7, 'Nelson', 'ss', 'ss', 'Araujo'),
(8, 'Nelson', 'ss', 'ss', 'Araujo'),
(9, 'Nelson', 'ss', 'ss', 'Araujo'),
(10, 'Nelson', 'ss', 'ss', 'Araujo'),
(11, 'Nelson', 'ss', 'ss', 'Araujo'),
(12, 'asda', 'asdas', 'asdasd', 'asda'),
(13, 'asda', 'asdas', 'asdasd', 'asda'),
(14, 'asda', 'asdas', 'asdasd', 'asda'),
(15, 'asda', 'asdas', 'asdasd', 'asda'),
(16, 'Nelson', 'ss', 'ss', 'ss'),
(17, 'Criss', 'parfa', 'vor', 'criss@gmail.crack'),
(18, 'Camilo', '13744079', '3166789009', 'juancamilo95@hotmail.es'),
(19, 'Nelson', '13744079', '3166961009', 'Araujo'),
(20, 'Nelson ', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(21, 'Nelson', '1133456712', 'sss', 'Araujo'),
(22, 'torunaDos', '1133456712', '3166961009', 'asda'),
(23, 'torunaDos', '1133456712', '3166961009', 'Araujo'),
(24, 'torunaDos', '1133456712', '3166961009', 'Araujo'),
(25, 'torunaDos', '1133456712', '3166961009', 'Araujo'),
(26, 'torunaDos', '1133456712', '3166961009', 'Araujo'),
(27, 'torunaDos', '1133456712', '3166961009', 'Araujo'),
(28, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(29, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(30, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(31, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(32, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(33, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(34, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(35, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(36, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(37, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(38, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(39, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(40, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(41, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(42, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(43, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(44, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(45, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(46, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(47, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(48, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(49, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(50, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(51, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(52, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(53, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(54, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(55, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(56, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(57, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(58, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(59, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(60, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(61, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(62, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(63, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(64, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(65, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(66, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(67, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(68, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(69, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(70, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(71, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(72, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(73, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(74, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(75, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(76, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(77, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(78, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(79, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(80, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(81, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(82, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(83, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(84, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(85, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(86, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(87, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(88, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(89, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(90, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(91, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(92, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(93, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(94, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(95, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(96, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(97, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(98, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(99, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(100, 'Nelson', '13744709', '3166961009', 'Araujo'),
(101, 'Nelson', '13744709', '3166961009', 'Araujo'),
(102, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(103, 'Nelson', '1133456712', '3166961009', 'Araujo'),
(104, 'Nelson', '111288222', '3166961009', 'Araujo'),
(105, 'Nelson', '111288222', '3166961009', 'criss@gmail.crack'),
(106, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(113, 'ssss', 'sss', 'sss', 'sss'),
(114, 'ssss', 'sss', 'sss', 'sss'),
(115, 'ssss', 'sss', 'sss', 'sss'),
(116, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(117, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(118, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(119, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(120, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(121, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com'),
(122, 'Nelson', '1144063612', '3166961009', 'nelsonaraujoparedes93@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stamp_id` (`stamp_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_admin_id` (`admin_id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `stamps`
--
ALTER TABLE `stamps`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `stamps`
--
ALTER TABLE `stamps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `fk_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `login` (`id`),
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`stamp_id`) REFERENCES `stamps` (`id`),
  ADD CONSTRAINT `forms_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
