-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: ares
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `i18n_expressions`
--

DROP TABLE IF EXISTS `i18n_expressions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i18n_expressions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `eng_expression` text DEFAULT NULL,
  `ita_expression` text DEFAULT NULL,
  `spa_expression` text DEFAULT NULL,
  `fra_expression` text DEFAULT NULL,
  `deu_expression` text DEFAULT NULL,
  `por_expression` text DEFAULT NULL,
  `rus_expression` text DEFAULT NULL,
  `zho_expression` text DEFAULT NULL,
  `jpn_expression` text DEFAULT NULL,
  `kor_expression` text DEFAULT NULL,
  `ara_expression` text DEFAULT NULL,
  `hin_expression` text DEFAULT NULL,
  `tur_expression` text DEFAULT NULL,
  `nld_expression` text DEFAULT NULL,
  `pol_expression` text DEFAULT NULL,
  `vie_expression` text DEFAULT NULL,
  `tha_expression` text DEFAULT NULL,
  `ind_expression` text DEFAULT NULL,
  `msa_expression` text DEFAULT NULL,
  `fas_expression` text DEFAULT NULL,
  `ben_expression` text DEFAULT NULL,
  `grammatical_analysis` text DEFAULT NULL,
  `logical_analysis` text DEFAULT NULL,
  `tags` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8279 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 18:02:12
