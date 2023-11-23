CREATE TABLE `comment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `post_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
);
