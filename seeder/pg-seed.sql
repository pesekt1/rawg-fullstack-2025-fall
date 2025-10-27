create table genres (
  id serial constraint "PK_80ecd718f0f00dde5d77a9be842" primary key,
  name varchar(255) not null,
  image_background varchar(255)
);
create table parent_platforms (
  id serial constraint "PK_b24c1aa1965c40a0ca1bd1591fb" primary key,
  name varchar(255) not null,
  slug varchar(255) not null
);
create table stores (
  id serial constraint "PK_7aa6e7d71fa7acdd7ca43d7c9cb" primary key,
  name varchar(255) not null,
  image_background varchar(255)
);
create table games (
  id serial constraint "PK_c9b16b62917b5595af982d66337" primary key,
  name varchar(255) not null,
  metacritic integer,
  background_image varchar(255),
  rating double precision,
  released varchar,
  added integer
);
create table games_has_genres (
  games_id integer not null constraint "FK_e589d69c9a5bc24feabcdbf1ce1" references games on update cascade on delete cascade,
  genres_id integer not null constraint "FK_a814abbb104148e13af6280731a" references genres,
  constraint "PK_9e0bd7068f70c186e10e4416978" primary key (games_id, genres_id)
);
create index "IDX_e589d69c9a5bc24feabcdbf1ce" on games_has_genres (games_id);
create index "IDX_a814abbb104148e13af6280731" on games_has_genres (genres_id);
create table games_has_parent_platforms (
  games_id integer not null constraint "FK_9b2a4d6be8c875b64f351533be1" references games on update cascade on delete cascade,
  parent_platforms_id integer not null constraint "FK_c3e0714add3e23a3acf7442433e" references parent_platforms,
  constraint "PK_5feb6e60bd6cb39b940a55235a1" primary key (games_id, parent_platforms_id)
);
create index "IDX_9b2a4d6be8c875b64f351533be" on games_has_parent_platforms (games_id);
create index "IDX_c3e0714add3e23a3acf7442433" on games_has_parent_platforms (parent_platforms_id);
create table games_has_stores (
  games_id integer not null constraint "FK_db3bbcaa46ff7be616b2472351c" references games on update cascade on delete cascade,
  stores_id integer not null constraint "FK_69876ae5a2b745da19c2c073c3c" references stores,
  constraint "PK_0981a7502b3871e9727878f0589" primary key (games_id, stores_id)
);
create index "IDX_db3bbcaa46ff7be616b2472351" on games_has_stores (games_id);
create index "IDX_69876ae5a2b745da19c2c073c3" on games_has_stores (stores_id);
--
-- PostgreSQL database dump
--
\ restrict ZaOv0DbfTQEJUeKsjfHLbjkNWtG2nDTTAHRv9KXlpfDGTnIlU1w2fidZ3CP8r3a -- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.games
VALUES (
    1,
    'Grand Theft Auto V',
    92,
    'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    4.47,
    '2013-09-17',
    22244
  );
INSERT INTO public.games
VALUES (
    2,
    'The Witcher 3: Wild Hunt',
    92,
    'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    4.64,
    '2015-05-18',
    21915
  );
INSERT INTO public.games
VALUES (
    3,
    'Portal 2',
    95,
    'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
    4.58,
    '2011-04-18',
    20699
  );
INSERT INTO public.games
VALUES (
    4,
    'Counter-Strike: Global Offensive',
    81,
    'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg',
    3.57,
    '2012-08-21',
    18314
  );
INSERT INTO public.games
VALUES (
    5,
    'Tomb Raider (2013)',
    86,
    'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg',
    4.06,
    '2013-03-05',
    17685
  );
INSERT INTO public.games
VALUES (
    6,
    'Portal',
    90,
    'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
    4.49,
    '2007-10-09',
    17649
  );
INSERT INTO public.games
VALUES (
    7,
    'Left 4 Dead 2',
    89,
    'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
    4.09,
    '2009-11-17',
    17431
  );
INSERT INTO public.games
VALUES (
    8,
    'The Elder Scrolls V: Skyrim',
    94,
    'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg',
    4.42,
    '2011-11-11',
    16663
  );
INSERT INTO public.games
VALUES (
    9,
    'Red Dead Redemption 2',
    96,
    'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',
    4.59,
    '2018-10-26',
    16569
  );
INSERT INTO public.games
VALUES (
    10,
    'BioShock Infinite',
    94,
    'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg',
    4.38,
    '2013-03-26',
    16001
  );
INSERT INTO public.games
VALUES (
    11,
    'Half-Life 2',
    96,
    'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg',
    4.48,
    '2004-11-16',
    15956
  );
INSERT INTO public.games
VALUES (
    12,
    'Borderlands 2',
    89,
    'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',
    4.01,
    '2012-09-18',
    15910
  );
INSERT INTO public.games
VALUES (
    13,
    'Life is Strange',
    83,
    'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg',
    4.12,
    '2015-01-29',
    15830
  );
INSERT INTO public.games
VALUES (
    14,
    'BioShock',
    96,
    'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg',
    4.36,
    '2007-08-21',
    14671
  );
INSERT INTO public.games
VALUES (
    15,
    'Destiny 2',
    82,
    'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
    3.52,
    '2017-09-06',
    14546
  );
INSERT INTO public.games
VALUES (
    16,
    'God of War (2018)',
    94,
    'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
    4.55,
    '2018-04-20',
    14325
  );
INSERT INTO public.games
VALUES (
    17,
    'Fallout 4',
    84,
    'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg',
    3.81,
    '2015-11-09',
    14173
  );
INSERT INTO public.games
VALUES (
    18,
    'PAYDAY 2',
    79,
    'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg',
    3.52,
    '2013-08-13',
    14109
  );
INSERT INTO public.games
VALUES (
    19,
    'Limbo',
    88,
    'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',
    4.14,
    '2010-07-21',
    14059
  );
INSERT INTO public.games
VALUES (
    20,
    'Team Fortress 2',
    92,
    'https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg',
    3.68,
    '2007-10-10',
    13996
  );
INSERT INTO public.games
VALUES (
    21,
    'DOOM (2016)',
    85,
    'https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg',
    4.38,
    '2016-05-12',
    13934
  );
INSERT INTO public.games
VALUES (
    22,
    'Cyberpunk 2077',
    73,
    'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg',
    4.22,
    '2020-12-10',
    13725
  );
INSERT INTO public.games
VALUES (
    23,
    'Terraria',
    81,
    'https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg',
    4.07,
    '2011-05-16',
    13444
  );
INSERT INTO public.games
VALUES (
    24,
    'Dota 2',
    90,
    'https://media.rawg.io/media/games/6fc/6fcf4cd3b17c288821388e6085bb0fc9.jpg',
    3.07,
    '2013-07-09',
    13118
  );
INSERT INTO public.games
VALUES (
    25,
    'Warframe',
    73,
    'https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg',
    3.41,
    '2013-03-25',
    13103
  );
INSERT INTO public.games
VALUES (
    26,
    'Grand Theft Auto IV',
    95,
    'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg',
    4.26,
    '2008-04-29',
    13077
  );
INSERT INTO public.games
VALUES (
    27,
    'Rocket League',
    86,
    'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg',
    3.93,
    '2015-07-07',
    12804
  );
INSERT INTO public.games
VALUES (
    28,
    'Horizon Zero Dawn',
    89,
    'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg',
    4.28,
    '2017-02-28',
    12744
  );
INSERT INTO public.games
VALUES (
    29,
    'Metro 2033',
    79,
    'https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg',
    3.94,
    '2010-03-16',
    12667
  );
INSERT INTO public.games
VALUES (
    30,
    'Rise of the Tomb Raider',
    86,
    'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg',
    4.04,
    '2015-11-10',
    12306
  );
INSERT INTO public.games
VALUES (
    31,
    'Batman: Arkham Knight',
    81,
    'https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg',
    4.24,
    '2015-06-23',
    12175
  );
INSERT INTO public.games
VALUES (
    32,
    'Metal Gear Solid V: The Phantom Pain',
    91,
    'https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg',
    4.16,
    '2015-09-01',
    12130
  );
INSERT INTO public.games
VALUES (
    33,
    'The Witcher 2: Assassins of Kings Enhanced Edition',
    88,
    'https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg',
    4.16,
    '2012-04-16',
    11993
  );
INSERT INTO public.games
VALUES (
    34,
    'Apex Legends',
    80,
    'https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg',
    3.64,
    '2019-02-04',
    11987
  );
INSERT INTO public.games
VALUES (
    35,
    'Grand Theft Auto: San Andreas',
    93,
    'https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg',
    4.5,
    '2004-10-26',
    11935
  );
INSERT INTO public.games
VALUES (
    36,
    'The Witcher: Enhanced Edition Director''s Cut',
    86,
    'https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg',
    4.06,
    '2008-09-16',
    11881
  );
INSERT INTO public.games
VALUES (
    37,
    'Hollow Knight',
    88,
    'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',
    4.41,
    '2017-02-23',
    11693
  );
INSERT INTO public.games
VALUES (
    38,
    'Middle-earth: Shadow of Mordor',
    85,
    'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg',
    3.91,
    '2014-09-30',
    11690
  );
INSERT INTO public.games
VALUES (
    39,
    'Half-Life 2: Lost Coast',
    NULL,
    'https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg',
    3.45,
    '2005-10-27',
    11685
  );
INSERT INTO public.games
VALUES (
    40,
    'The Walking Dead: Season 1',
    92,
    'https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg',
    4.36,
    '2012-04-23',
    11628
  );
--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.genres
VALUES (
    2,
    'Shooter',
    'https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg'
  );
INSERT INTO public.genres
VALUES (
    3,
    'Adventure',
    'https://media.rawg.io/media/games/48c/48cb04ca483be865e3a83119c94e6097.jpg'
  );
INSERT INTO public.genres
VALUES (
    6,
    'Puzzle',
    'https://media.rawg.io/media/games/cfe/cfe114c081281960bd79ace5209c0a4a.jpg'
  );
INSERT INTO public.genres
VALUES (
    7,
    'Platformer',
    'https://media.rawg.io/media/games/e0f/e0f05a97ff926acf4c8f43e0849b6832.jpg'
  );
INSERT INTO public.genres
VALUES (
    8,
    'Massively Multiplayer',
    'https://media.rawg.io/media/games/98c/98cd77a9f61b31a6ddab1670b079c841.jpg'
  );
INSERT INTO public.genres
VALUES (
    9,
    'Sports',
    'https://media.rawg.io/media/screenshots/1be/1be2141edae05d4ba9858182b081e604.jpg'
  );
INSERT INTO public.genres
VALUES (
    1,
    'Racing',
    'https://media.rawg.io/media/games/82e/82eeea65ebb047cc7f366faf2fb062b6.jpg'
  );
INSERT INTO public.genres
VALUES (
    4,
    'Action',
    'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg'
  );
INSERT INTO public.genres
VALUES (
    5,
    'RPG',
    'https://media.rawg.io/media/games/095/0953bf01cd4e4dd204aba85489ac9868.jpg'
  );
INSERT INTO public.genres
VALUES (
    10,
    'Indie',
    'https://media.rawg.io/media/games/63f/63f0e68688cad279ed38cde931dbfcdb.jpg'
  );
--
-- Data for Name: games_has_genres; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.games_has_genres
VALUES (1, 1);
INSERT INTO public.games_has_genres
VALUES (2, 1);
INSERT INTO public.games_has_genres
VALUES (2, 2);
INSERT INTO public.games_has_genres
VALUES (3, 2);
INSERT INTO public.games_has_genres
VALUES (3, 3);
INSERT INTO public.games_has_genres
VALUES (4, 2);
INSERT INTO public.games_has_genres
VALUES (5, 1);
INSERT INTO public.games_has_genres
VALUES (6, 1);
INSERT INTO public.games_has_genres
VALUES (6, 3);
INSERT INTO public.games_has_genres
VALUES (7, 1);
INSERT INTO public.games_has_genres
VALUES (7, 2);
INSERT INTO public.games_has_genres
VALUES (8, 1);
INSERT INTO public.games_has_genres
VALUES (8, 4);
INSERT INTO public.games_has_genres
VALUES (9, 1);
INSERT INTO public.games_has_genres
VALUES (10, 1);
INSERT INTO public.games_has_genres
VALUES (10, 2);
INSERT INTO public.games_has_genres
VALUES (11, 1);
INSERT INTO public.games_has_genres
VALUES (11, 2);
INSERT INTO public.games_has_genres
VALUES (12, 1);
INSERT INTO public.games_has_genres
VALUES (12, 2);
INSERT INTO public.games_has_genres
VALUES (12, 4);
INSERT INTO public.games_has_genres
VALUES (13, 3);
INSERT INTO public.games_has_genres
VALUES (14, 1);
INSERT INTO public.games_has_genres
VALUES (14, 2);
INSERT INTO public.games_has_genres
VALUES (15, 1);
INSERT INTO public.games_has_genres
VALUES (15, 2);
INSERT INTO public.games_has_genres
VALUES (16, 1);
INSERT INTO public.games_has_genres
VALUES (17, 1);
INSERT INTO public.games_has_genres
VALUES (17, 4);
INSERT INTO public.games_has_genres
VALUES (18, 1);
INSERT INTO public.games_has_genres
VALUES (18, 2);
INSERT INTO public.games_has_genres
VALUES (19, 1);
INSERT INTO public.games_has_genres
VALUES (19, 3);
INSERT INTO public.games_has_genres
VALUES (19, 5);
INSERT INTO public.games_has_genres
VALUES (19, 6);
INSERT INTO public.games_has_genres
VALUES (19, 7);
INSERT INTO public.games_has_genres
VALUES (20, 1);
INSERT INTO public.games_has_genres
VALUES (20, 2);
INSERT INTO public.games_has_genres
VALUES (21, 1);
INSERT INTO public.games_has_genres
VALUES (21, 2);
INSERT INTO public.games_has_genres
VALUES (22, 1);
INSERT INTO public.games_has_genres
VALUES (22, 2);
INSERT INTO public.games_has_genres
VALUES (22, 4);
INSERT INTO public.games_has_genres
VALUES (23, 1);
INSERT INTO public.games_has_genres
VALUES (23, 5);
INSERT INTO public.games_has_genres
VALUES (23, 7);
INSERT INTO public.games_has_genres
VALUES (24, 1);
INSERT INTO public.games_has_genres
VALUES (24, 8);
INSERT INTO public.games_has_genres
VALUES (25, 1);
INSERT INTO public.games_has_genres
VALUES (25, 2);
INSERT INTO public.games_has_genres
VALUES (25, 4);
INSERT INTO public.games_has_genres
VALUES (25, 8);
INSERT INTO public.games_has_genres
VALUES (26, 1);
INSERT INTO public.games_has_genres
VALUES (27, 9);
INSERT INTO public.games_has_genres
VALUES (27, 1);
INSERT INTO public.games_has_genres
VALUES (27, 5);
INSERT INTO public.games_has_genres
VALUES (28, 4);
INSERT INTO public.games_has_genres
VALUES (29, 4);
INSERT INTO public.games_has_genres
VALUES (29, 2);
INSERT INTO public.games_has_genres
VALUES (30, 4);
INSERT INTO public.games_has_genres
VALUES (31, 4);
INSERT INTO public.games_has_genres
VALUES (32, 4);
INSERT INTO public.games_has_genres
VALUES (32, 2);
INSERT INTO public.games_has_genres
VALUES (33, 5);
INSERT INTO public.games_has_genres
VALUES (34, 4);
INSERT INTO public.games_has_genres
VALUES (34, 2);
INSERT INTO public.games_has_genres
VALUES (35, 4);
INSERT INTO public.games_has_genres
VALUES (36, 4);
INSERT INTO public.games_has_genres
VALUES (36, 5);
INSERT INTO public.games_has_genres
VALUES (37, 4);
INSERT INTO public.games_has_genres
VALUES (37, 10);
INSERT INTO public.games_has_genres
VALUES (37, 7);
INSERT INTO public.games_has_genres
VALUES (38, 4);
INSERT INTO public.games_has_genres
VALUES (38, 5);
INSERT INTO public.games_has_genres
VALUES (39, 4);
INSERT INTO public.games_has_genres
VALUES (40, 4);
INSERT INTO public.games_has_genres
VALUES (40, 3);
--
-- Data for Name: parent_platforms; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.parent_platforms
VALUES (1, 'PC', 'pc');
INSERT INTO public.parent_platforms
VALUES (2, 'PlayStation', 'playstation');
INSERT INTO public.parent_platforms
VALUES (3, 'Xbox', 'xbox');
INSERT INTO public.parent_platforms
VALUES (6, 'Linux', 'linux');
INSERT INTO public.parent_platforms
VALUES (4, 'iOS', 'ios');
INSERT INTO public.parent_platforms
VALUES (5, 'Apple Macintosh', 'mac');
INSERT INTO public.parent_platforms
VALUES (7, 'Nintendo', 'nintendo');
INSERT INTO public.parent_platforms
VALUES (8, 'Android', 'android');
--
-- Data for Name: games_has_parent_platforms; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.games_has_parent_platforms
VALUES (1, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (1, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (1, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (2, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (2, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (2, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (2, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (2, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (3, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (3, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (3, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (3, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (3, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (4, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (4, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (4, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (4, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (5, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (5, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (5, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (5, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (6, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (7, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (7, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (7, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (7, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (8, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (8, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (8, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (8, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (9, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (9, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (9, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (10, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (10, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (10, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (10, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (10, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (11, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (11, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (11, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (11, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (11, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (12, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (13, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (14, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (14, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (14, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (14, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (15, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (15, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (15, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (15, 8);
INSERT INTO public.games_has_parent_platforms
VALUES (16, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (16, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (17, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (17, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (17, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (18, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (18, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (18, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (19, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (20, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (20, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (20, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (21, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (21, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (21, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (21, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (22, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (22, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (22, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (22, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 8);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (23, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (24, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (24, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (24, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (25, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (25, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (25, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (25, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (25, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (26, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (26, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (26, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (27, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (28, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (28, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (29, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (29, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (30, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (30, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (30, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (30, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (31, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (31, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (31, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (31, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (32, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (32, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (32, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (33, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (33, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (33, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (34, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (34, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (34, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (34, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (34, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 8);
INSERT INTO public.games_has_parent_platforms
VALUES (35, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (36, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (36, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (37, 7);
INSERT INTO public.games_has_parent_platforms
VALUES (38, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (38, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (38, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (38, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (38, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (39, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (39, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (39, 6);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 1);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 2);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 3);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 4);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 8);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 5);
INSERT INTO public.games_has_parent_platforms
VALUES (40, 7);
--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.stores
VALUES (
    1,
    'Steam',
    'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg'
  );
INSERT INTO public.stores
VALUES (
    3,
    'PlayStation Store',
    'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg'
  );
INSERT INTO public.stores
VALUES (
    2,
    'Xbox Store',
    'https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg'
  );
INSERT INTO public.stores
VALUES (
    5,
    'GOG',
    'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg'
  );
INSERT INTO public.stores
VALUES (
    6,
    'Nintendo Store',
    'https://media.rawg.io/media/games/7c4/7c448374df84b607f67ce9182a3a3ca7.jpg'
  );
INSERT INTO public.stores
VALUES (
    4,
    'App Store',
    'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
  );
INSERT INTO public.stores
VALUES (
    7,
    'Xbox 360 Store',
    'https://media.rawg.io/media/games/995/9951d9d55323d08967640f7b9ab3e342.jpg'
  );
INSERT INTO public.stores
VALUES (
    8,
    'Google Play',
    'https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg'
  );
INSERT INTO public.stores
VALUES (
    9,
    'Epic Games',
    'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg'
  );
--
-- Data for Name: games_has_stores; Type: TABLE DATA; Schema: public; Owner: root
--
INSERT INTO public.games_has_stores
VALUES (1, 1);
INSERT INTO public.games_has_stores
VALUES (1, 3);
INSERT INTO public.games_has_stores
VALUES (1, 2);
INSERT INTO public.games_has_stores
VALUES (1, 4);
INSERT INTO public.games_has_stores
VALUES (2, 5);
INSERT INTO public.games_has_stores
VALUES (2, 3);
INSERT INTO public.games_has_stores
VALUES (2, 1);
INSERT INTO public.games_has_stores
VALUES (2, 2);
INSERT INTO public.games_has_stores
VALUES (2, 6);
INSERT INTO public.games_has_stores
VALUES (3, 2);
INSERT INTO public.games_has_stores
VALUES (3, 1);
INSERT INTO public.games_has_stores
VALUES (3, 3);
INSERT INTO public.games_has_stores
VALUES (3, 4);
INSERT INTO public.games_has_stores
VALUES (4, 3);
INSERT INTO public.games_has_stores
VALUES (4, 1);
INSERT INTO public.games_has_stores
VALUES (4, 4);
INSERT INTO public.games_has_stores
VALUES (5, 4);
INSERT INTO public.games_has_stores
VALUES (5, 1);
INSERT INTO public.games_has_stores
VALUES (5, 3);
INSERT INTO public.games_has_stores
VALUES (5, 7);
INSERT INTO public.games_has_stores
VALUES (5, 8);
INSERT INTO public.games_has_stores
VALUES (6, 1);
INSERT INTO public.games_has_stores
VALUES (6, 7);
INSERT INTO public.games_has_stores
VALUES (7, 1);
INSERT INTO public.games_has_stores
VALUES (7, 7);
INSERT INTO public.games_has_stores
VALUES (8, 3);
INSERT INTO public.games_has_stores
VALUES (8, 1);
INSERT INTO public.games_has_stores
VALUES (8, 6);
INSERT INTO public.games_has_stores
VALUES (8, 7);
INSERT INTO public.games_has_stores
VALUES (9, 3);
INSERT INTO public.games_has_stores
VALUES (9, 8);
INSERT INTO public.games_has_stores
VALUES (9, 1);
INSERT INTO public.games_has_stores
VALUES (9, 2);
INSERT INTO public.games_has_stores
VALUES (10, 8);
INSERT INTO public.games_has_stores
VALUES (10, 4);
INSERT INTO public.games_has_stores
VALUES (10, 2);
INSERT INTO public.games_has_stores
VALUES (10, 6);
INSERT INTO public.games_has_stores
VALUES (10, 3);
INSERT INTO public.games_has_stores
VALUES (10, 1);
INSERT INTO public.games_has_stores
VALUES (10, 7);
INSERT INTO public.games_has_stores
VALUES (11, 1);
INSERT INTO public.games_has_stores
VALUES (11, 8);
INSERT INTO public.games_has_stores
VALUES (12, 3);
INSERT INTO public.games_has_stores
VALUES (12, 8);
INSERT INTO public.games_has_stores
VALUES (12, 1);
INSERT INTO public.games_has_stores
VALUES (12, 7);
INSERT INTO public.games_has_stores
VALUES (12, 4);
INSERT INTO public.games_has_stores
VALUES (12, 2);
INSERT INTO public.games_has_stores
VALUES (13, 5);
INSERT INTO public.games_has_stores
VALUES (13, 3);
INSERT INTO public.games_has_stores
VALUES (13, 1);
INSERT INTO public.games_has_stores
VALUES (13, 2);
INSERT INTO public.games_has_stores
VALUES (13, 8);
INSERT INTO public.games_has_stores
VALUES (13, 7);
INSERT INTO public.games_has_stores
VALUES (13, 4);
INSERT INTO public.games_has_stores
VALUES (14, 3);
INSERT INTO public.games_has_stores
VALUES (14, 4);
INSERT INTO public.games_has_stores
VALUES (14, 2);
INSERT INTO public.games_has_stores
VALUES (14, 1);
INSERT INTO public.games_has_stores
VALUES (14, 7);
INSERT INTO public.games_has_stores
VALUES (15, 9);
INSERT INTO public.games_has_stores
VALUES (15, 3);
INSERT INTO public.games_has_stores
VALUES (15, 2);
INSERT INTO public.games_has_stores
VALUES (15, 1);
INSERT INTO public.games_has_stores
VALUES (16, 5);
INSERT INTO public.games_has_stores
VALUES (16, 3);
INSERT INTO public.games_has_stores
VALUES (16, 1);
INSERT INTO public.games_has_stores
VALUES (16, 9);
INSERT INTO public.games_has_stores
VALUES (17, 3);
INSERT INTO public.games_has_stores
VALUES (17, 2);
INSERT INTO public.games_has_stores
VALUES (17, 1);
INSERT INTO public.games_has_stores
VALUES (18, 9);
INSERT INTO public.games_has_stores
VALUES (18, 3);
INSERT INTO public.games_has_stores
VALUES (18, 1);
INSERT INTO public.games_has_stores
VALUES (18, 6);
INSERT INTO public.games_has_stores
VALUES (18, 7);
INSERT INTO public.games_has_stores
VALUES (19, 4);
INSERT INTO public.games_has_stores
VALUES (19, 3);
INSERT INTO public.games_has_stores
VALUES (19, 2);
INSERT INTO public.games_has_stores
VALUES (19, 1);
INSERT INTO public.games_has_stores
VALUES (19, 5);
INSERT INTO public.games_has_stores
VALUES (19, 7);
INSERT INTO public.games_has_stores
VALUES (19, 6);
INSERT INTO public.games_has_stores
VALUES (19, 8);
INSERT INTO public.games_has_stores
VALUES (19, 9);
INSERT INTO public.games_has_stores
VALUES (20, 1);
INSERT INTO public.games_has_stores
VALUES (21, 5);
INSERT INTO public.games_has_stores
VALUES (21, 1);
INSERT INTO public.games_has_stores
VALUES (21, 3);
INSERT INTO public.games_has_stores
VALUES (21, 6);
INSERT INTO public.games_has_stores
VALUES (21, 2);
INSERT INTO public.games_has_stores
VALUES (22, 3);
INSERT INTO public.games_has_stores
VALUES (22, 2);
INSERT INTO public.games_has_stores
VALUES (22, 1);
INSERT INTO public.games_has_stores
VALUES (22, 9);
INSERT INTO public.games_has_stores
VALUES (22, 5);
INSERT INTO public.games_has_stores
VALUES (23, 2);
INSERT INTO public.games_has_stores
VALUES (23, 1);
INSERT INTO public.games_has_stores
VALUES (23, 5);
INSERT INTO public.games_has_stores
VALUES (23, 6);
INSERT INTO public.games_has_stores
VALUES (23, 4);
INSERT INTO public.games_has_stores
VALUES (23, 8);
INSERT INTO public.games_has_stores
VALUES (23, 3);
INSERT INTO public.games_has_stores
VALUES (24, 1);
INSERT INTO public.games_has_stores
VALUES (25, 4);
INSERT INTO public.games_has_stores
VALUES (25, 9);
INSERT INTO public.games_has_stores
VALUES (25, 3);
INSERT INTO public.games_has_stores
VALUES (25, 1);
INSERT INTO public.games_has_stores
VALUES (25, 2);
INSERT INTO public.games_has_stores
VALUES (25, 6);
INSERT INTO public.games_has_stores
VALUES (26, 3);
INSERT INTO public.games_has_stores
VALUES (26, 2);
INSERT INTO public.games_has_stores
VALUES (26, 1);
INSERT INTO public.games_has_stores
VALUES (26, 7);
INSERT INTO public.games_has_stores
VALUES (27, 2);
INSERT INTO public.games_has_stores
VALUES (27, 1);
INSERT INTO public.games_has_stores
VALUES (27, 3);
INSERT INTO public.games_has_stores
VALUES (27, 6);
INSERT INTO public.games_has_stores
VALUES (27, 9);
INSERT INTO public.games_has_stores
VALUES (28, 3);
INSERT INTO public.games_has_stores
VALUES (28, 1);
INSERT INTO public.games_has_stores
VALUES (28, 9);
INSERT INTO public.games_has_stores
VALUES (29, 1);
INSERT INTO public.games_has_stores
VALUES (29, 7);
INSERT INTO public.games_has_stores
VALUES (30, 2);
INSERT INTO public.games_has_stores
VALUES (30, 1);
INSERT INTO public.games_has_stores
VALUES (30, 7);
INSERT INTO public.games_has_stores
VALUES (30, 4);
INSERT INTO public.games_has_stores
VALUES (30, 9);
INSERT INTO public.games_has_stores
VALUES (31, 6);
INSERT INTO public.games_has_stores
VALUES (31, 3);
INSERT INTO public.games_has_stores
VALUES (31, 9);
INSERT INTO public.games_has_stores
VALUES (31, 5);
INSERT INTO public.games_has_stores
VALUES (31, 2);
INSERT INTO public.games_has_stores
VALUES (31, 1);
INSERT INTO public.games_has_stores
VALUES (32, 3);
INSERT INTO public.games_has_stores
VALUES (32, 1);
INSERT INTO public.games_has_stores
VALUES (32, 7);
INSERT INTO public.games_has_stores
VALUES (32, 2);
INSERT INTO public.games_has_stores
VALUES (33, 1);
INSERT INTO public.games_has_stores
VALUES (33, 5);
INSERT INTO public.games_has_stores
VALUES (33, 2);
INSERT INTO public.games_has_stores
VALUES (33, 4);
INSERT INTO public.games_has_stores
VALUES (34, 3);
INSERT INTO public.games_has_stores
VALUES (34, 1);
INSERT INTO public.games_has_stores
VALUES (34, 6);
INSERT INTO public.games_has_stores
VALUES (34, 2);
INSERT INTO public.games_has_stores
VALUES (35, 9);
INSERT INTO public.games_has_stores
VALUES (35, 3);
INSERT INTO public.games_has_stores
VALUES (35, 2);
INSERT INTO public.games_has_stores
VALUES (35, 1);
INSERT INTO public.games_has_stores
VALUES (35, 7);
INSERT INTO public.games_has_stores
VALUES (35, 4);
INSERT INTO public.games_has_stores
VALUES (35, 8);
INSERT INTO public.games_has_stores
VALUES (36, 5);
INSERT INTO public.games_has_stores
VALUES (36, 1);
INSERT INTO public.games_has_stores
VALUES (37, 1);
INSERT INTO public.games_has_stores
VALUES (37, 5);
INSERT INTO public.games_has_stores
VALUES (37, 6);
INSERT INTO public.games_has_stores
VALUES (37, 2);
INSERT INTO public.games_has_stores
VALUES (37, 3);
INSERT INTO public.games_has_stores
VALUES (38, 5);
INSERT INTO public.games_has_stores
VALUES (38, 1);
INSERT INTO public.games_has_stores
VALUES (38, 3);
INSERT INTO public.games_has_stores
VALUES (38, 2);
INSERT INTO public.games_has_stores
VALUES (38, 7);
INSERT INTO public.games_has_stores
VALUES (38, 4);
INSERT INTO public.games_has_stores
VALUES (39, 1);
INSERT INTO public.games_has_stores
VALUES (40, 1);
INSERT INTO public.games_has_stores
VALUES (40, 7);
INSERT INTO public.games_has_stores
VALUES (40, 2);
INSERT INTO public.games_has_stores
VALUES (40, 6);
INSERT INTO public.games_has_stores
VALUES (40, 5);
INSERT INTO public.games_has_stores
VALUES (40, 3);
INSERT INTO public.games_has_stores
VALUES (40, 8);
INSERT INTO public.games_has_stores
VALUES (40, 9);
INSERT INTO public.games_has_stores
VALUES (40, 4);
--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--
SELECT pg_catalog.setval('public.games_id_seq', 40, true);
--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--
SELECT pg_catalog.setval('public.genres_id_seq', 10, true);
--
-- Name: parent_platforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--
SELECT pg_catalog.setval('public.parent_platforms_id_seq', 8, true);
--
-- Name: stores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--
SELECT pg_catalog.setval('public.stores_id_seq', 9, true);
--
-- PostgreSQL database dump complete
--
\ unrestrict ZaOv0DbfTQEJUeKsjfHLbjkNWtG2nDTTAHRv9KXlpfDGTnIlU1w2fidZ3CP8r3a