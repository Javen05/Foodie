-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: foodiedb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `idAccount` int NOT NULL,
  `idRestaurant` int NOT NULL,
  `type` enum('F','B') COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`idAccount`,`idRestaurant`,`type`),
  KEY `onRestaurant_idx` (`idRestaurant`),
  CONSTRAINT `byAccount` FOREIGN KEY (`idAccount`) REFERENCES `accounts` (`idAccount`) ON DELETE CASCADE,
  CONSTRAINT `byRestaurant` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurants` (`idRestaurant`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,1,'F','2023-01-02 15:15:21'),(1,3,'F','2022-12-27 15:29:55'),(1,7,'B','2023-01-07 00:12:03'),(2,1,'F','2022-12-27 22:29:02'),(2,1,'B','2023-01-07 17:24:46'),(2,2,'B','2023-01-07 17:25:02'),(2,3,'B','2022-12-27 22:29:05'),(2,4,'B','2023-01-07 17:20:36'),(2,6,'F','2022-12-27 14:58:08'),(2,8,'B','2022-12-27 22:29:07'),(2,10,'B','2022-12-27 15:39:41'),(2,15,'B','2023-01-07 17:06:43'),(3,11,'F','2022-12-26 13:09:54'),(3,11,'B','2022-12-26 13:09:55'),(3,12,'F','2022-12-26 13:09:53'),(3,12,'B','2022-12-26 13:09:56'),(3,15,'F','2022-12-26 13:09:52'),(3,15,'B','2022-12-26 13:09:58'),(6,6,'F','2023-01-02 13:50:26'),(6,7,'F','2023-01-02 13:53:08'),(6,8,'F','2022-12-26 16:33:48'),(6,12,'B','2023-01-02 13:53:54'),(6,15,'F','2022-12-26 16:37:38'),(10,1,'B','2022-12-26 11:24:06'),(10,2,'B','2022-12-26 11:11:36'),(10,4,'F','2022-12-26 11:24:39'),(10,4,'B','2022-12-26 11:24:37'),(10,5,'B','2022-12-26 10:47:09'),(10,12,'F','2022-12-26 12:38:20'),(11,3,'F','2022-12-27 21:06:34'),(13,1,'F','2022-12-28 17:40:42'),(13,1,'B','2022-12-28 17:42:17'),(13,2,'F','2022-12-28 17:33:36'),(13,3,'F','2022-12-28 17:40:07'),(13,4,'F','2022-12-28 17:30:23'),(13,5,'B','2022-12-28 17:40:41'),(13,7,'F','2022-12-28 17:40:12'),(13,8,'F','2022-12-28 17:40:16'),(13,11,'F','2022-12-28 17:29:22'),(13,15,'B','2022-12-28 17:40:14');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-07 18:38:16
