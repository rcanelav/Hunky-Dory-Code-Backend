-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: bcu8tjtaure2gu5pt2pa-mysql.services.clever-cloud.com    Database: bcu8tjtaure2gu5pt2pa
-- ------------------------------------------------------
-- Server version	8.0.22-13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `posts_id` int NOT NULL,
  `postedBy` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_id` (`posts_id`),
  KEY `postedBy` (`postedBy`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`postedBy`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (3,'Esto es una respuesta3','0000-00-00 00:00:00',2,40),(4,'answers','2022-01-01 00:00:00',2,40),(5,'answerss','2022-01-02 00:00:00',2,40),(6,'answerss','2022-01-02 00:00:00',2,40),(7,'answerss','2022-01-02 00:00:00',2,40),(8,'answerss','2022-01-02 00:00:00',2,40),(9,'answerss','2022-01-02 00:00:00',2,40),(10,'answerss','2022-01-02 00:00:00',2,40),(11,'answerss','2022-01-02 00:00:00',2,40),(12,'hgola como estas','2022-01-06 17:39:29',3,40),(13,'Respuesta al post 3','2022-01-12 08:58:28',3,40);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;

--
-- Table structure for table `answers_likes`
--

DROP TABLE IF EXISTS `answers_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `answer_id` (`answer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `answers_likes_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`),
  CONSTRAINT `answers_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers_likes`
--

/*!40000 ALTER TABLE `answers_likes` DISABLE KEYS */;
INSERT INTO `answers_likes` VALUES (20,3,1,'2021-12-29'),(24,3,40,'2022-01-12');
/*!40000 ALTER TABLE `answers_likes` ENABLE KEYS */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(80) NOT NULL,
  `content` varchar(8000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `technology` int DEFAULT NULL,
  `postedBy` int NOT NULL,
  `postedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `postedBy` (`postedBy`),
  KEY `technology` (`technology`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`postedBy`) REFERENCES `users` (`id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`technology`) REFERENCES `technologies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Variables en javascript','use strict',0,3,1,'0000-00-00 00:00:00'),(2,'Que es una clase?','use strict',0,2,3,'0000-00-00 00:00:00'),(3,'Punteros','asd',0,3,4,'0000-00-00 00:00:00'),(4,'Que me falla en el controlador?','use strict',0,3,40,'0000-00-00 00:00:00'),(5,'Test','use strict',0,3,40,'0000-00-00 00:00:00'),(7,'Post 2','use strict',0,7,40,'2021-12-12 16:47:40'),(9,'Esto es un titulo','Esto es un content',0,1,40,'2022-01-06 14:48:39'),(10,'Esto es un titulo','Esto es un content',0,1,40,'2022-01-06 15:01:16'),(11,'Esto es un titulo','Esto es un content',0,1,40,'2022-01-06 15:01:20'),(12,'Esto es un titulo','Esto es un content',0,1,40,'2022-01-12 09:01:25');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

--
-- Table structure for table `posts_likes`
--

DROP TABLE IF EXISTS `posts_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `posts_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_likes`
--

/*!40000 ALTER TABLE `posts_likes` DISABLE KEYS */;
INSERT INTO `posts_likes` VALUES (4,7,30,'2022-01-06'),(5,7,1,'2022-01-06'),(6,7,5,'2022-01-06'),(24,3,40,'2022-01-12');
/*!40000 ALTER TABLE `posts_likes` ENABLE KEYS */;

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `technologies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
INSERT INTO `technologies` VALUES (1,'Programming'),(2,'Java'),(3,'Javascript'),(4,'C'),(5,'C++'),(6,'C#'),(7,'GOlang'),(8,'Ionic'),(9,'Clean code'),(10,'Clean architecture'),(11,'Domain Driven Design'),(12,'Test Driven Design'),(13,'Events Driven Design'),(14,'Hexagonal Architecture'),(15,'Microservices'),(16,'NodeJS'),(17,'React');
/*!40000 ALTER TABLE `technologies` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(70) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  `google` tinyint(1) DEFAULT '0',
  `technologies` int DEFAULT NULL,
  `verificationCode` varchar(64) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `verifiedAt` date DEFAULT NULL,
  `role` enum('STUDENT','EXPERT','ADMIN') NOT NULL DEFAULT 'STUDENT',
  `lastAuthUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `technologies` (`technologies`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`technologies`) REFERENCES `technologies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Hannes','jhonny@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21','2021-12-21','2021-12-21','STUDENT','2021-12-31 21:09:11'),(2,'Carla','Bolilla','carlabo@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT','2021-12-31 21:16:57'),(3,'Cripto','Nelhams','bolicryp@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT','2021-12-31 21:20:54'),(4,'Bottle','Neck','botneck@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT',NULL),(5,'Charles','Baudelaire','chabau@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT',NULL),(6,'Albert','Camus','albertca@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT',NULL),(7,'Iker','Vyko','vyker@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT',NULL),(8,'Yisus','de Deus','ohlord@test.com','123456',NULL,NULL,0,NULL,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','STUDENT',NULL),(9,'Ramon','Canela','ramon@test.com','123456',NULL,NULL,0,1,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','EXPERT',NULL),(10,'Francisco','Cobelo','fracisco@test.com','123456',NULL,NULL,0,2,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','EXPERT',NULL),(11,'Cristina','Ruiz','cris@test.com','123456',NULL,NULL,0,3,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','EXPERT',NULL),(12,'Paola','A','paola@test.com','123456',NULL,NULL,0,4,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-21',NULL,'2021-12-21','EXPERT',NULL),(30,'Kiko','Cobelo','francisco.cobelo@gmail.com','$2a$12$/r3grIvX4.Nox3ZpwKm41e9VGQ4BHCA5DE8GAsuUWvzNHC0uM8OsW','https://graph.facebook.com/10224614139448241/picture',NULL,1,3,'pW0WrX9u2n60LfsPmJnXDEtLem4031N5X66OW6Y96Axljq9wfUNI4hbVbNEVZu10','2021-12-15',NULL,'2021-12-21','EXPERT','2021-12-15 12:54:19'),(40,'Ramón','Canela','rcanelav@gmail.com','$2a$12$mR.ebNfW8ZG3NwP1P7BON.hw.r96AzZhaSeE0xQTYk6z5N6DAmNRG','https://res.cloudinary.com/rayci/image/upload/v1642177182/uctjnwzu55junuhnphnb.jpg',NULL,0,3,'5zN9jvxe8pKr0PLn7J2xzsEIyousnANZrPB9GhTPvLilAOveINmCr0UodJ7Eeu7O','2021-12-21','2022-01-14','2021-12-21','EXPERT','2022-01-14 17:30:19'),(41,'admin','admin','admin@admin.com','$2a$12$nB/CFPsu9n.f9qPbcZplp.OVVzx9ZeACJ5z3J5Omqaq7NaI6uVL2W',NULL,NULL,0,NULL,'G2C2pIBUNteg4HJGzRy1KdQHfC6cvKEoqN5yhAFiAaZsLQppmZZZdbONCqniJrMd','2021-12-31',NULL,'2021-12-31','ADMIN','2021-12-31 21:20:48'),(42,'Ramón','Canela','asdbbb@gmail.com','$2a$12$T66z1Ul4d07IR2H533Po8.w1xsKsqMIgVvufA31oy3NmT8FG2mDz6',NULL,NULL,0,NULL,'Mpmt2AgRNqEMVlLNPaGFApqkmO4TcidoH6QGvAc7sPLdXf1gPjTy4oMISXjkuBZ5','2022-01-13',NULL,NULL,'EXPERT',NULL),(43,'Ramón','Canela','admin@yopmail.com','$2a$12$3nH7Wu0x3Au/sfy1SPSaUOrQhnptKEpQuFQLJMQcn8ywDnWT/Fe7K',NULL,NULL,0,NULL,'aPiZ8IFIxXE7XZdSZxXxfFHH2jpnCNzq6uirDZAV0dmKnymErZHWMiLsoqGGeIzM','2022-01-14',NULL,NULL,'EXPERT',NULL),(44,'Ramón','Canela','ramon@yopmail.com','$2a$12$A0WZufljaDOEy0xXpzoEyuOTSU9wZ3oO.NBrqXqweuIo7hdGwvP9i',NULL,NULL,0,NULL,'XFofwPVvJ6uh9XRtKaxwOsXz18fNeP8UsQRYqNkHSgkSVkGZJyd3l7MUe5tDnQoL','2022-01-14',NULL,NULL,'EXPERT',NULL),(45,'Ramón','Canela','ramon2@yopmail.com','$2a$12$LzyO5N2NgOJIH6KWICk5MOBvJVQE7e//fkTMQgGTBleR2l8p8JDmm',NULL,NULL,0,NULL,'1DTYG8CMKVcRKnDlHAONvM95a9IG45tS2N6s5m4bxyT5tlwEjPpzl3TjBlnXVeMk','2022-01-14',NULL,'2022-01-14','EXPERT',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-14 19:04:08
