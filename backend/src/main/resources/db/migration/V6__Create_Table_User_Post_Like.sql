CREATE TABLE `user_post_like` (
  `post_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `FK57fb3maoku0rswbigf15dfe2u` (`user_id`),
  CONSTRAINT `FK57fb3maoku0rswbigf15dfe2u` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK8kkugb4ofjhcvvda7tm1r4928` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
);
