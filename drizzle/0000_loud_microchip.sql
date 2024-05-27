CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`liked_by_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`liked_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `followers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`follower_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mentions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reply_id` integer,
	`mentioned_user_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`reply_id`) REFERENCES `replies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mentioned_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`type` text NOT NULL,
	`related_user_id` integer,
	`message` text,
	`is_read` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`related_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `replies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`pool_pair` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`crypto_address` text NOT NULL,
	`nickname` text NOT NULL,
	`description` text,
	`avatar_image` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `l_user_id_idx` ON `likes` (`user_id`);--> statement-breakpoint
CREATE INDEX `liked_by_id` ON `likes` (`liked_by_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `f_user_id_idx` ON `followers` (`user_id`);--> statement-breakpoint
CREATE INDEX `follower_id_idx` ON `followers` (`follower_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_crypto_address_unique` ON `users` (`crypto_address`);