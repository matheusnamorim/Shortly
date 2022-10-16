--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "sessionId" integer NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "linksCount" integer DEFAULT 0
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'e24e242c-cd46-4cf9-8fef-f4c25c4bfc0d', 1, '2022-10-14 23:08:36.20562');
INSERT INTO public.sessions VALUES (2, 'd75d36db-770b-491f-aef1-ee68b2da8958', 1, '2022-10-14 23:08:36.20562');
INSERT INTO public.sessions VALUES (3, '42d0c399-b41f-4bf7-8e1c-26fc6b7880d6', 2, '2022-10-14 23:08:36.20562');
INSERT INTO public.sessions VALUES (4, '6884d71c-f664-4606-a11c-e7062b37679d', 3, '2022-10-15 20:48:09.548679');
INSERT INTO public.sessions VALUES (5, 'd188df37-23d8-4298-a36b-b406c0d57fb1', 3, '2022-10-15 20:49:16.72592');
INSERT INTO public.sessions VALUES (6, 'd7f22200-697e-4234-9d78-802bf7903bd3', 3, '2022-10-15 21:54:51.994299');
INSERT INTO public.sessions VALUES (7, 'e2126883-9a17-4f03-9c5e-705e44bc18f3', 12, '2022-10-15 23:41:16.86489');
INSERT INTO public.sessions VALUES (8, 'b7d7024d-9831-44da-a36c-d829da9361cf', 12, '2022-10-15 23:52:29.752749');
INSERT INTO public.sessions VALUES (9, '143f9b1d-926d-4b4d-a4c8-cd2e03d358c9', 11, '2022-10-15 23:53:13.323714');
INSERT INTO public.sessions VALUES (10, '4c1006ec-8076-4528-8f20-d434fdea43af', 10, '2022-10-15 23:54:19.395577');
INSERT INTO public.sessions VALUES (11, '0eed53bd-e4e5-49a2-9116-fc3f309c0609', 8, '2022-10-15 23:57:18.629662');
INSERT INTO public.sessions VALUES (12, '677e9594-8960-4c20-afa3-9401a6f93a10', 9, '2022-10-15 23:59:38.151823');
INSERT INTO public.sessions VALUES (13, 'd94869b9-6b06-4a5c-9920-b6bbd22f600c', 7, '2022-10-16 00:00:12.732965');
INSERT INTO public.sessions VALUES (14, '0ff52173-d75f-4828-a380-c1947277bec2', 5, '2022-10-16 00:01:01.937904');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://www.youtube.com/', 's_84XPAQ', 6, 4, '2022-10-15 22:43:39.524703', 3);
INSERT INTO public.urls VALUES (3, 'https://www.youtube.com/', 'OhK0Gh4H', 2, 1, '2022-10-15 23:16:28.38808', 1);
INSERT INTO public.urls VALUES (4, 'https://www.youtube.com/', 'XbMA2bjd', 7, 1, '2022-10-15 23:41:36.798662', 12);
INSERT INTO public.urls VALUES (5, 'https://www.google.com.br/', 'ahcwD6x6', 7, 1, '2022-10-15 23:42:37.178472', 12);
INSERT INTO public.urls VALUES (6, 'https://www.google.com.br/', 'ObCtfThZ', 9, 1, '2022-10-15 23:53:27.55441', 11);
INSERT INTO public.urls VALUES (7, 'https://www.google.com.br/', 'hQxE5fxK', 10, 1, '2022-10-15 23:54:38.787604', 10);
INSERT INTO public.urls VALUES (8, 'https://www.youtube.com/', 'qruDxorg', 10, 1, '2022-10-15 23:55:24.604826', 10);
INSERT INTO public.urls VALUES (9, 'https://www.youtube.com/', 'T9jWGdSc', 11, 1, '2022-10-15 23:57:28.892048', 8);
INSERT INTO public.urls VALUES (2, 'https://www.youtube.com/', 'j9OhNaWo', 3, 1, '2022-10-15 22:44:06.004682', 2);
INSERT INTO public.urls VALUES (10, 'https://www.youtube.com/', 'LKtbv9wH', 12, 1, '2022-10-15 23:59:46.789938', 9);
INSERT INTO public.urls VALUES (13, 'https://www.yotube.com/', 'xS07O_iG', 7, 3, '2022-10-16 00:02:22.830588', 12);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (3, 'Teste', 'drive@driven.com.br', '$2b$10$.ujIkNyZMCO6FUs.HrirgePPFbz1I3WKlX/Prx96POBWbPw0on2WK', '2022-10-15 20:47:13.882877', 1);
INSERT INTO public.users VALUES (2, 'João', 'teste@driven.com.br', '$2b$10$i/XIlERLnovl32Rc0fS3cuwgWKLiYJg2a4yhKL2q3F0HzQ9VbhMvy', '2022-10-14 23:08:08.233449', 1);
INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$5oi2Kr6zSM0sM7TmnppK.uMb77XGektWO1l019ATwLNCaoyWd7OUq', '2022-10-14 23:08:08.233449', 1);
INSERT INTO public.users VALUES (4, 'Teste', 'driven@driven.com.br', '$2b$10$XJHXq4Kc2AB5.YRnwzhzReT2yD4Y9GHN8r243Cid0ui/6UVlgPr/K', '2022-10-15 23:24:20.920185', 0);
INSERT INTO public.users VALUES (6, 'Teste3', 'driven23@driven.com.br', '$2b$10$ru52UZK0VwxXs3L3qJdKdeLcnDZFvWu84y0PjyDXcRiVbhyOd1EBa', '2022-10-15 23:24:34.192452', 0);
INSERT INTO public.users VALUES (11, 'Testef556a', 'driven2a42211@driven.com.br', '$2b$10$onvyrOK72Y8Rp.vhmkFl4Oo3DFSaQUpD97N3JOcPnBu5lDTjzf/26', '2022-10-15 23:25:14.085462', 1);
INSERT INTO public.users VALUES (10, 'Teste556a', 'driven2a4221@driven.com.br', '$2b$10$vsbDbacmtY8xAE0Bj6qbRefKDDCEGb00ZK/ZBjX0WXM8ixDEyot/6', '2022-10-15 23:25:10.523344', 2);
INSERT INTO public.users VALUES (8, 'Teste55', 'driven241@driven.com.br', '$2b$10$G7H/jAXVrzt84J8u1jji/OfOZvkyoCBF0QIXHrQpxQoouejbLYIrO', '2022-10-15 23:24:45.822745', 1);
INSERT INTO public.users VALUES (9, 'Teste5566', 'driven24221@driven.com.br', '$2b$10$mU0wZGtKnfE6StHtnjxN5.8XI3cI.GWS7OTnuYJquhnbcC.6e37Cy', '2022-10-15 23:24:50.134363', 1);
INSERT INTO public.users VALUES (12, 'Tea stef556a', 'draiven2a42211@driven.com.br', '$2b$10$0SExca5IN7UkxDjeb4NdzOjc.KqyPVwwe57YYkn3n/qzy8XXRjxJO', '2022-10-15 23:25:18.977885', 3);
INSERT INTO public.users VALUES (5, 'Teste2', 'driven2@driven.com.br', '$2b$10$W5EiCSHlheuoqYK4cj6qsu7kd/W8BQM9cAx5X5bZ1n1tehE1GAcsS', '2022-10-15 23:24:29.013687', 0);
INSERT INTO public.users VALUES (7, 'Teste5', 'driven243@driven.com.br', '$2b$10$Kb/uW3zOABK2aXsZTbguD.hKHpJshcx7Gr1e51eqJhbNDm1DpEidW', '2022-10-15 23:24:41.304915', 0);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 14, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public.sessions(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

