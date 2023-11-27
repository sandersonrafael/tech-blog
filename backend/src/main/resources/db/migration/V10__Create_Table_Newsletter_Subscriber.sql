CREATE TABLE `tech_blog`.`newsletter_subscriber` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `newsletter_subscribercol_UNIQUE` (`email` ASC) VISIBLE
);
