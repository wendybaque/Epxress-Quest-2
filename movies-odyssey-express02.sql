/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS movies;

CREATE TABLE `movies`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar
(255) NOT NULL,
  `director` varchar
(255) NOT NULL,
  `year` varchar
(255) NOT NULL,
  `color` tinyint
(1) NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES movies WRITE;
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (0, 'Citizen Kane', 'Orson Wells', '1941', 0, 120);
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (1, 'The Godfather', 'Francis Ford Coppola', '1972', 1, 180);
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (2, 'Pulp Fiction', 'Quentin Tarantino', '1994', 1, 180);
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (3, 'Apocalypse Now', 'Francis Ford Coppola', '1979', 1, 150);
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (4, '2001 a space odyssey', 'Stanley Kubrick', '1968', 1, 160);
INSERT INTO movies
  (id, title, director, year, color, duration)
VALUES
  (5, 'The Dark Knight', 'Christopher Nolan', '2008', 1, 150);
UNLOCK TABLES;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

