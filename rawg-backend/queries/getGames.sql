-- query:
SELECT `game`.`id` AS `game_id`,
  `game`.`name` AS `game_name`,
  `game`.`metacritic` AS `game_metacritic`,
  `game`.`background_image` AS `game_background_image`,
  `game`.`released` AS `game_released`,
  `game`.`rating` AS `game_rating`,
  `game`.`added` AS `game_added`,
  `genres`.`id` AS `genres_id`,
  `genres`.`name` AS `genres_name`,
  `genres`.`image_background` AS `genres_image_background`,
  `stores`.`id` AS `stores_id`,
  `stores`.`name` AS `stores_name`,
  `stores`.`image_background` AS `stores_image_background`,
  `parent_platforms`.`id` AS `parent_platforms_id`,
  `parent_platforms`.`name` AS `parent_platforms_name`,
  `parent_platforms`.`slug` AS `parent_platforms_slug`
FROM `games` `game`
  LEFT JOIN `games_has_genres` `game_genres` ON `game_genres`.`games_id` = `game`.`id`
  LEFT JOIN `genres` `genres` ON `genres`.`id` = `game_genres`.`genres_id`
  LEFT JOIN `games_has_stores` `game_stores` ON `game_stores`.`games_id` = `game`.`id`
  LEFT JOIN `stores` `stores` ON `stores`.`id` = `game_stores`.`stores_id`
  LEFT JOIN `games_has_parent_platforms` `game_parent_platforms` ON `game_parent_platforms`.`games_id` = `game`.`id`
  LEFT JOIN `parent_platforms` `parent_platforms` ON `parent_platforms`.`id` = `game_parent_platforms`.`parent_platforms_id`
WHERE `game`.`id` IN (
    SELECT `game`.`id` AS `game_id`
    FROM `games` `game`
      LEFT JOIN `games_has_genres` `game_genres` ON `game_genres`.`games_id` = `game`.`id`
      LEFT JOIN `genres` `genres` ON `genres`.`id` = `game_genres`.`genres_id`
    WHERE `genres`.`id` = ?
  )
  AND `game`.`id` IN (
    SELECT `game`.`id` AS `game_id`
    FROM `games` `game`
      LEFT JOIN `games_has_stores` `game_stores` ON `game_stores`.`games_id` = `game`.`id`
      LEFT JOIN `stores` `stores` ON `stores`.`id` = `game_stores`.`stores_id`
    WHERE `stores`.`id` = ?
  )
  AND `game`.`id` IN (
    SELECT `game`.`id` AS `game_id`
    FROM `games` `game`
      LEFT JOIN `games_has_parent_platforms` `game_parent_platforms` ON `game_parent_platforms`.`games_id` = `game`.`id`
      LEFT JOIN `parent_platforms` `parent_platforms` ON `parent_platforms`.`id` = `game_parent_platforms`.`parent_platforms_id`
    WHERE `parent_platforms`.`id` = ?
  ) -- PARAMETERS: [4,1,7]