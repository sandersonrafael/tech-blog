CREATE TABLE `user_comment_dislike` (
  `comment_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `FKsg0mu5075cdk1lxjgjstknv2y` (`user_id`),
  CONSTRAINT `FKd1d6l0tlglwbh386fyf2phfvd` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `FKsg0mu5075cdk1lxjgjstknv2y` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
