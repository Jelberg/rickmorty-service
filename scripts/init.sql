--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2024-07-27 21:02:33

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 78332)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 78671)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 78670)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 220
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 217 (class 1259 OID 78653)
-- Name: characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters (
    id integer NOT NULL,
    fk_typestat integer NOT NULL,
    name text NOT NULL,
    type text
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 78652)
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.characters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characters_id_seq OWNER TO postgres;

--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 216
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.characters_id_seq OWNED BY public.characters.id;


--
-- TOC entry 225 (class 1259 OID 78689)
-- Name: epis_char; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.epis_char (
    id integer NOT NULL,
    fk_char integer NOT NULL,
    fk_epis integer NOT NULL,
    fk_time integer NOT NULL
);


ALTER TABLE public.epis_char OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 78688)
-- Name: epis_char_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.epis_char_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.epis_char_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 224
-- Name: epis_char_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.epis_char_id_seq OWNED BY public.epis_char.id;


--
-- TOC entry 219 (class 1259 OID 78662)
-- Name: episodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.episodes (
    id integer NOT NULL,
    fk_typestat integer NOT NULL,
    name text NOT NULL,
    episode text NOT NULL,
    duration integer NOT NULL
);


ALTER TABLE public.episodes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 78661)
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.episodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episodes_id_seq OWNER TO postgres;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 218
-- Name: episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.episodes_id_seq OWNED BY public.episodes.id;


--
-- TOC entry 213 (class 1259 OID 78637)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 78636)
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 212
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 227 (class 1259 OID 78696)
-- Name: subc_char_epis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subc_char_epis (
    id integer NOT NULL,
    fk_char integer,
    fk_subc integer NOT NULL,
    fk_epis integer
);


ALTER TABLE public.subc_char_epis OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 78695)
-- Name: subc_char_epis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subc_char_epis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subc_char_epis_id_seq OWNER TO postgres;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 226
-- Name: subc_char_epis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subc_char_epis_id_seq OWNED BY public.subc_char_epis.id;


--
-- TOC entry 223 (class 1259 OID 78680)
-- Name: subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name text NOT NULL,
    fk_cate integer NOT NULL
);


ALTER TABLE public.subcategories OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 78679)
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategories_id_seq OWNER TO postgres;

--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 222
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- TOC entry 229 (class 1259 OID 78703)
-- Name: times; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.times (
    id integer NOT NULL,
    init text NOT NULL,
    finish text NOT NULL
);


ALTER TABLE public.times OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 78702)
-- Name: times_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.times_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.times_id_seq OWNER TO postgres;

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 228
-- Name: times_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.times_id_seq OWNED BY public.times.id;


--
-- TOC entry 215 (class 1259 OID 78646)
-- Name: type_stat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_stat (
    id integer NOT NULL,
    fk_type integer NOT NULL,
    fk_state integer NOT NULL
);


ALTER TABLE public.type_stat OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 78645)
-- Name: type_stat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_stat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_stat_id_seq OWNER TO postgres;

--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 214
-- Name: type_stat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_stat_id_seq OWNED BY public.type_stat.id;


--
-- TOC entry 211 (class 1259 OID 78628)
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.types OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 78627)
-- Name: types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.types_id_seq OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 210
-- Name: types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.types_id_seq OWNED BY public.types.id;


--
-- TOC entry 3220 (class 2604 OID 78674)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 78656)
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters ALTER COLUMN id SET DEFAULT nextval('public.characters_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 78692)
-- Name: epis_char id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.epis_char ALTER COLUMN id SET DEFAULT nextval('public.epis_char_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 78665)
-- Name: episodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes ALTER COLUMN id SET DEFAULT nextval('public.episodes_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 78640)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 78699)
-- Name: subc_char_epis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subc_char_epis ALTER COLUMN id SET DEFAULT nextval('public.subc_char_epis_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 78683)
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 78706)
-- Name: times id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.times ALTER COLUMN id SET DEFAULT nextval('public.times_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 78649)
-- Name: type_stat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_stat ALTER COLUMN id SET DEFAULT nextval('public.type_stat_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 78631)
-- Name: types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types ALTER COLUMN id SET DEFAULT nextval('public.types_id_seq'::regclass);


--
-- TOC entry 3398 (class 0 OID 78332)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ebac8644-58db-4a05-8ce5-15fd247358db	0d1d4ecb9d7d196750e7ff35044e4e6d4d996cad08aa120becfe9a4a7327fca4	2024-07-27 23:45:40.984715+00	20240725195315_database	\N	\N	2024-07-27 23:45:40.901075+00	1
b8fe11bd-f538-48ea-9521-09d1314954ef	9f8a850f848789cfc94509159588454ea9c22d9e4e6360aba76c3eebddff3078	2024-07-27 23:45:41.113419+00	20240726030217_database	\N	\N	2024-07-27 23:45:40.98566+00	1
ef11f09c-9682-4f6f-bd18-4bd1496ccd76	16d037459b1f27a178b35b134dd552b34dc47a412d0b3cfc4970d90c0e503bc4	2024-07-27 23:45:41.215251+00	20240726033701_database	\N	\N	2024-07-27 23:45:41.114347+00	1
3ca5e774-6e77-45cb-b364-7ade74af1f04	71ae3fe94e0f49b95f7c1c6bb409e1cc75f9616abf34c507179569294300c217	2024-07-27 23:45:41.23365+00	20240726205436_database	\N	\N	2024-07-27 23:45:41.216116+00	1
03b1b59b-d7a5-453a-a87a-9c5d051ed765	7fe5f1635c6579cc876ed798929e9b27e1b988e6f2a484bde2a7f4fde757005f	2024-07-27 23:45:41.236836+00	20240726210534_database	\N	\N	2024-07-27 23:45:41.234284+00	1
1046543c-3a96-4091-8494-0fb15975698a	2816a2ef675e67c50002ad87de30be0c27736376f04095ebf621f031516371dc	2024-07-27 23:45:41.243109+00	20240727015251_make_fk_char_fk_epis_optional	\N	\N	2024-07-27 23:45:41.237738+00	1
cf2d14f3-7d20-4955-ade7-5aaa977340cd	c22aa9b4d4fe99546ead19c2810a859a7dd574e1efdbedcd082cdf9451e84f83	2024-07-27 23:45:41.245903+00	20240727181610_change_attribute_duration	\N	\N	2024-07-27 23:45:41.243808+00	1
daa22884-56c6-4faa-bc1b-f86686b42118	2dcd33075a65f405fa121366081fee3f66a7c729a00eed02dc2115bf33cbd507	2024-07-28 00:02:30.370873+00	20240728000230_change_attribute_duration	\N	\N	2024-07-28 00:02:30.368273+00	1
b040db98-0786-404c-bc9f-02bf2e255d64	c7a68ee08ecab2d139be4fc8c3b4c712bd4e9212a98331edd1e90e036d247303	2024-07-28 00:10:25.001986+00	20240728001024_change_attribute_duration	\N	\N	2024-07-28 00:10:24.999166+00	1
\.


--
-- TOC entry 3410 (class 0 OID 78671)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	specie
2	season
\.


--
-- TOC entry 3406 (class 0 OID 78653)
-- Dependencies: 217
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters (id, fk_typestat, name, type) FROM stdin;
1	3	Rick Sanchez	\N
2	3	Albert Einstein	
3	3	Alan Rails	Superhuman (Ghost trains summoner)
4	3	Morty Smith	
\.


--
-- TOC entry 3414 (class 0 OID 78689)
-- Dependencies: 225
-- Data for Name: epis_char; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.epis_char (id, fk_char, fk_epis, fk_time) FROM stdin;
2	1	2	2
3	1	2	3
4	1	2	4
5	1	2	5
6	2	3	6
7	2	3	7
8	3	5	8
\.


--
-- TOC entry 3408 (class 0 OID 78662)
-- Dependencies: 219
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.episodes (id, fk_typestat, name, episode, duration) FROM stdin;
1	1	Pilot	S01E01	0
2	1	Rixty Minutes	S01E08	50
3	1	Mortynight Run	S02E02	60
4	1	Get Schwift	S02E05	35
5	1	Look Who's Purging Now	S02E09	35
6	1	Rick Potion #9	S01E06	20
\.


--
-- TOC entry 3402 (class 0 OID 78637)
-- Dependencies: 213
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, name) FROM stdin;
1	active
2	suspended
3	cancelled
\.


--
-- TOC entry 3416 (class 0 OID 78696)
-- Dependencies: 227
-- Data for Name: subc_char_epis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subc_char_epis (id, fk_char, fk_subc, fk_epis) FROM stdin;
1	1	1	\N
2	2	1	\N
3	3	1	\N
4	4	1	\N
5	\N	3	1
6	\N	3	2
7	\N	4	3
8	\N	4	4
9	\N	4	5
10	\N	3	6
\.


--
-- TOC entry 3412 (class 0 OID 78680)
-- Dependencies: 223
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategories (id, name, fk_cate) FROM stdin;
1	human	1
2	alien	1
3	S01	2
4	S02	2
5	S03	2
6	S04	2
7	S05	2
8	S06	2
\.


--
-- TOC entry 3418 (class 0 OID 78703)
-- Dependencies: 229
-- Data for Name: times; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.times (id, init, finish) FROM stdin;
1	20:04	22:04
2	01:00	10:00
3	10:00	15:00
4	23:00	32:00
5	16:00	20:00
6	16:00	20:00
7	01:00	02:00
8	01:00	02:00
\.


--
-- TOC entry 3404 (class 0 OID 78646)
-- Dependencies: 215
-- Data for Name: type_stat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_stat (id, fk_type, fk_state) FROM stdin;
1	1	1
2	1	2
3	2	1
4	2	2
\.


--
-- TOC entry 3400 (class 0 OID 78628)
-- Dependencies: 211
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (id, name) FROM stdin;
1	episodes
2	characters
\.


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 220
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 216
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.characters_id_seq', 4, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 224
-- Name: epis_char_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.epis_char_id_seq', 8, true);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 218
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_seq', 6, true);


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 212
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 1, false);


--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 226
-- Name: subc_char_epis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subc_char_epis_id_seq', 10, true);


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 222
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 1, false);


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 228
-- Name: times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.times_id_seq', 8, true);


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 214
-- Name: type_stat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_stat_id_seq', 1, false);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 210
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_seq', 1, false);


--
-- TOC entry 3226 (class 2606 OID 78340)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 78678)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 78660)
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 78694)
-- Name: epis_char epis_char_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.epis_char
    ADD CONSTRAINT epis_char_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 78669)
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 78644)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 78701)
-- Name: subc_char_epis subc_char_epis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subc_char_epis
    ADD CONSTRAINT subc_char_epis_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 78687)
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 78708)
-- Name: times times_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_pkey PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 78651)
-- Name: type_stat type_stat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_stat
    ADD CONSTRAINT type_stat_pkey PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 78635)
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 1259 OID 78709)
-- Name: subc_char_epis_fk_char_fk_subc_fk_epis_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX subc_char_epis_fk_char_fk_subc_fk_epis_key ON public.subc_char_epis USING btree (fk_char, fk_subc, fk_epis);


--
-- TOC entry 3250 (class 2606 OID 78720)
-- Name: characters characters_fk_typestat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_fk_typestat_fkey FOREIGN KEY (fk_typestat) REFERENCES public.type_stat(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3253 (class 2606 OID 78735)
-- Name: epis_char epis_char_fk_char_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.epis_char
    ADD CONSTRAINT epis_char_fk_char_fkey FOREIGN KEY (fk_char) REFERENCES public.characters(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3254 (class 2606 OID 78740)
-- Name: epis_char epis_char_fk_epis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.epis_char
    ADD CONSTRAINT epis_char_fk_epis_fkey FOREIGN KEY (fk_epis) REFERENCES public.episodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3255 (class 2606 OID 78745)
-- Name: epis_char epis_char_fk_time_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.epis_char
    ADD CONSTRAINT epis_char_fk_time_fkey FOREIGN KEY (fk_time) REFERENCES public.times(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3251 (class 2606 OID 78725)
-- Name: episodes episodes_fk_typestat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_fk_typestat_fkey FOREIGN KEY (fk_typestat) REFERENCES public.type_stat(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3257 (class 2606 OID 78773)
-- Name: subc_char_epis subc_char_epis_fk_char_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subc_char_epis
    ADD CONSTRAINT subc_char_epis_fk_char_fkey FOREIGN KEY (fk_char) REFERENCES public.characters(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3258 (class 2606 OID 78778)
-- Name: subc_char_epis subc_char_epis_fk_epis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subc_char_epis
    ADD CONSTRAINT subc_char_epis_fk_epis_fkey FOREIGN KEY (fk_epis) REFERENCES public.episodes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3256 (class 2606 OID 78755)
-- Name: subc_char_epis subc_char_epis_fk_subc_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subc_char_epis
    ADD CONSTRAINT subc_char_epis_fk_subc_fkey FOREIGN KEY (fk_subc) REFERENCES public.subcategories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3252 (class 2606 OID 78730)
-- Name: subcategories subcategories_fk_cate_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_fk_cate_fkey FOREIGN KEY (fk_cate) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3249 (class 2606 OID 78715)
-- Name: type_stat type_stat_fk_state_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_stat
    ADD CONSTRAINT type_stat_fk_state_fkey FOREIGN KEY (fk_state) REFERENCES public.status(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3248 (class 2606 OID 78710)
-- Name: type_stat type_stat_fk_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_stat
    ADD CONSTRAINT type_stat_fk_type_fkey FOREIGN KEY (fk_type) REFERENCES public.types(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-07-27 21:02:33

--
-- PostgreSQL database dump complete
--

