--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2024-07-28 10:49:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3386 (class 0 OID 78332)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('ebac8644-58db-4a05-8ce5-15fd247358db', '0d1d4ecb9d7d196750e7ff35044e4e6d4d996cad08aa120becfe9a4a7327fca4', '2024-07-27 23:45:40.984715+00', '20240725195315_database', NULL, NULL, '2024-07-27 23:45:40.901075+00', 1);
INSERT INTO public._prisma_migrations VALUES ('b8fe11bd-f538-48ea-9521-09d1314954ef', '9f8a850f848789cfc94509159588454ea9c22d9e4e6360aba76c3eebddff3078', '2024-07-27 23:45:41.113419+00', '20240726030217_database', NULL, NULL, '2024-07-27 23:45:40.98566+00', 1);
INSERT INTO public._prisma_migrations VALUES ('ef11f09c-9682-4f6f-bd18-4bd1496ccd76', '16d037459b1f27a178b35b134dd552b34dc47a412d0b3cfc4970d90c0e503bc4', '2024-07-27 23:45:41.215251+00', '20240726033701_database', NULL, NULL, '2024-07-27 23:45:41.114347+00', 1);
INSERT INTO public._prisma_migrations VALUES ('3ca5e774-6e77-45cb-b364-7ade74af1f04', '71ae3fe94e0f49b95f7c1c6bb409e1cc75f9616abf34c507179569294300c217', '2024-07-27 23:45:41.23365+00', '20240726205436_database', NULL, NULL, '2024-07-27 23:45:41.216116+00', 1);
INSERT INTO public._prisma_migrations VALUES ('03b1b59b-d7a5-453a-a87a-9c5d051ed765', '7fe5f1635c6579cc876ed798929e9b27e1b988e6f2a484bde2a7f4fde757005f', '2024-07-27 23:45:41.236836+00', '20240726210534_database', NULL, NULL, '2024-07-27 23:45:41.234284+00', 1);
INSERT INTO public._prisma_migrations VALUES ('1046543c-3a96-4091-8494-0fb15975698a', '2816a2ef675e67c50002ad87de30be0c27736376f04095ebf621f031516371dc', '2024-07-27 23:45:41.243109+00', '20240727015251_make_fk_char_fk_epis_optional', NULL, NULL, '2024-07-27 23:45:41.237738+00', 1);
INSERT INTO public._prisma_migrations VALUES ('cf2d14f3-7d20-4955-ade7-5aaa977340cd', 'c22aa9b4d4fe99546ead19c2810a859a7dd574e1efdbedcd082cdf9451e84f83', '2024-07-27 23:45:41.245903+00', '20240727181610_change_attribute_duration', NULL, NULL, '2024-07-27 23:45:41.243808+00', 1);
INSERT INTO public._prisma_migrations VALUES ('daa22884-56c6-4faa-bc1b-f86686b42118', '2dcd33075a65f405fa121366081fee3f66a7c729a00eed02dc2115bf33cbd507', '2024-07-28 00:02:30.370873+00', '20240728000230_change_attribute_duration', NULL, NULL, '2024-07-28 00:02:30.368273+00', 1);
INSERT INTO public._prisma_migrations VALUES ('b040db98-0786-404c-bc9f-02bf2e255d64', 'c7a68ee08ecab2d139be4fc8c3b4c712bd4e9212a98331edd1e90e036d247303', '2024-07-28 00:10:25.001986+00', '20240728001024_change_attribute_duration', NULL, NULL, '2024-07-28 00:10:24.999166+00', 1);


--
-- TOC entry 3398 (class 0 OID 78671)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, 'specie');
INSERT INTO public.categories VALUES (2, 'season');


--
-- TOC entry 3390 (class 0 OID 78637)
-- Dependencies: 213
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status VALUES (1, 'active');
INSERT INTO public.status VALUES (2, 'suspended');
INSERT INTO public.status VALUES (3, 'cancelled');


--
-- TOC entry 3388 (class 0 OID 78628)
-- Dependencies: 211
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.types VALUES (1, 'episodes');
INSERT INTO public.types VALUES (2, 'characters');


--
-- TOC entry 3392 (class 0 OID 78646)
-- Dependencies: 215
-- Data for Name: type_stat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.type_stat VALUES (1, 1, 1);
INSERT INTO public.type_stat VALUES (2, 1, 2);
INSERT INTO public.type_stat VALUES (3, 2, 1);
INSERT INTO public.type_stat VALUES (4, 2, 2);


--
-- TOC entry 3394 (class 0 OID 78653)
-- Dependencies: 217
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.characters VALUES (1, 3, 'Rick Sanchez', NULL);
INSERT INTO public.characters VALUES (2, 3, 'Albert Einstein', '');
INSERT INTO public.characters VALUES (3, 3, 'Alan Rails', 'Superhuman (Ghost trains summoner)');
INSERT INTO public.characters VALUES (4, 3, 'Morty Smith', '');


--
-- TOC entry 3396 (class 0 OID 78662)
-- Dependencies: 219
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.episodes VALUES (1, 1, 'Pilot', 'S01E01', 0);
INSERT INTO public.episodes VALUES (2, 1, 'Rixty Minutes', 'S01E08', 50);
INSERT INTO public.episodes VALUES (3, 1, 'Mortynight Run', 'S02E02', 60);
INSERT INTO public.episodes VALUES (4, 1, 'Get Schwift', 'S02E05', 35);
INSERT INTO public.episodes VALUES (5, 1, 'Look Who''s Purging Now', 'S02E09', 35);
INSERT INTO public.episodes VALUES (6, 1, 'Rick Potion #9', 'S01E06', 20);


--
-- TOC entry 3406 (class 0 OID 78703)
-- Dependencies: 229
-- Data for Name: times; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.times VALUES (1, '20:04', '22:04');
INSERT INTO public.times VALUES (2, '01:00', '10:00');
INSERT INTO public.times VALUES (3, '10:00', '15:00');
INSERT INTO public.times VALUES (4, '23:00', '32:00');
INSERT INTO public.times VALUES (5, '16:00', '20:00');
INSERT INTO public.times VALUES (6, '16:00', '20:00');
INSERT INTO public.times VALUES (7, '01:00', '02:00');
INSERT INTO public.times VALUES (8, '01:00', '02:00');


--
-- TOC entry 3402 (class 0 OID 78689)
-- Dependencies: 225
-- Data for Name: epis_char; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.epis_char VALUES (2, 1, 2, 2);
INSERT INTO public.epis_char VALUES (3, 1, 2, 3);
INSERT INTO public.epis_char VALUES (4, 1, 2, 4);
INSERT INTO public.epis_char VALUES (5, 1, 2, 5);
INSERT INTO public.epis_char VALUES (6, 2, 3, 6);
INSERT INTO public.epis_char VALUES (7, 2, 3, 7);
INSERT INTO public.epis_char VALUES (8, 3, 5, 8);


--
-- TOC entry 3400 (class 0 OID 78680)
-- Dependencies: 223
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subcategories VALUES (1, 'human', 1);
INSERT INTO public.subcategories VALUES (2, 'alien', 1);
INSERT INTO public.subcategories VALUES (3, 'S01', 2);
INSERT INTO public.subcategories VALUES (4, 'S02', 2);
INSERT INTO public.subcategories VALUES (5, 'S03', 2);
INSERT INTO public.subcategories VALUES (6, 'S04', 2);
INSERT INTO public.subcategories VALUES (7, 'S05', 2);
INSERT INTO public.subcategories VALUES (8, 'S06', 2);


--
-- TOC entry 3404 (class 0 OID 78696)
-- Dependencies: 227
-- Data for Name: subc_char_epis; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subc_char_epis VALUES (1, 1, 1, NULL);
INSERT INTO public.subc_char_epis VALUES (2, 2, 1, NULL);
INSERT INTO public.subc_char_epis VALUES (3, 3, 1, NULL);
INSERT INTO public.subc_char_epis VALUES (4, 4, 1, NULL);
INSERT INTO public.subc_char_epis VALUES (5, NULL, 3, 1);
INSERT INTO public.subc_char_epis VALUES (6, NULL, 3, 2);
INSERT INTO public.subc_char_epis VALUES (7, NULL, 4, 3);
INSERT INTO public.subc_char_epis VALUES (8, NULL, 4, 4);
INSERT INTO public.subc_char_epis VALUES (9, NULL, 4, 5);
INSERT INTO public.subc_char_epis VALUES (10, NULL, 3, 6);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 220
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 216
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.characters_id_seq', 4, true);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 224
-- Name: epis_char_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.epis_char_id_seq', 8, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 218
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_seq', 6, true);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 212
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 1, false);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 226
-- Name: subc_char_epis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subc_char_epis_id_seq', 10, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 222
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 228
-- Name: times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.times_id_seq', 8, true);


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 214
-- Name: type_stat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_stat_id_seq', 1, false);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 210
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_seq', 1, false);


-- Completed on 2024-07-28 10:49:57

--
-- PostgreSQL database dump complete
--

