CREATE TABLE `post` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `miniature` text,
  `post_url` varchar(255) NOT NULL,
  `thumb` text NOT NULL,
  `thumb_alt` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `views` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5l5g3nwehqs3aa76b38sphhr` (`post_url`)
);
