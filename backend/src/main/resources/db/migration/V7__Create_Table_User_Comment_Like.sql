CREATE TABLE `user_comment_like` (
  `comment_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`comment_id`,`user_id`),
  KEY `FKcrvxfmk8amhbcgleob8niyrcj` (`user_id`),
  CONSTRAINT `FKcrvxfmk8amhbcgleob8niyrcj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKd74al4ur6la2cwsfe1wnoc6ln` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
);
