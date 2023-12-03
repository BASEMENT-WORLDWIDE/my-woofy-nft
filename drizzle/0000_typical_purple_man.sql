CREATE TABLE `my_woofys_traits` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `my_woofys_woofys` (
	`token_id` integer PRIMARY KEY NOT NULL,
	`rarity` integer NOT NULL,
	`image_url` text DEFAULT 'https://static.cozyverse.xyz/woofys/images/00000.gif' NOT NULL,
	`status` text,
	`name` text(64),
	`bio` text(1024)
);
--> statement-breakpoint
CREATE TABLE `my_woofys_woofys_traits` (
	`woofy_id` integer NOT NULL,
	`trait_id` integer NOT NULL,
	PRIMARY KEY(`trait_id`, `woofy_id`)
);
--> statement-breakpoint
CREATE INDEX `trait_type_index` ON `my_woofys_traits` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `trait_type_trait_name_unique_index` ON `my_woofys_traits` (`type`,`name`);