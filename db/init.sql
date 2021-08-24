--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-08-25 00:38:33

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
-- TOC entry 202 (class 1259 OID 16428)
-- Name: tblchatroom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblchatroom (
    chatroomid bigint NOT NULL,
    chat_start_time timestamp with time zone[] NOT NULL
);


ALTER TABLE public.tblchatroom OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16524)
-- Name: tblcourt_speaker_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblcourt_speaker_users (
    courtid integer,
    speakerid bigint,
    userid integer
);


ALTER TABLE public.tblcourt_speaker_users OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16420)
-- Name: tblcourts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblcourts (
    courtid integer NOT NULL,
    topic text,
    current_state smallint NOT NULL,
    prep_time integer,
    general_chat integer,
    team1_chat integer,
    team2_chat integer,
    adjudicator_chat integer
);


ALTER TABLE public.tblcourts OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16441)
-- Name: tblmessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblmessages (
    messageid bigint NOT NULL,
    chatroomid integer NOT NULL,
    userid integer NOT NULL,
    message text NOT NULL,
    time_sent timestamp with time zone NOT NULL
);


ALTER TABLE public.tblmessages OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16485)
-- Name: tblnotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblnotes (
    noteid integer NOT NULL,
    notecontent text,
    userid integer,
    courtid integer
);


ALTER TABLE public.tblnotes OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16467)
-- Name: tblparticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblparticipants (
    courtid integer,
    userid integer,
    roleid integer
);


ALTER TABLE public.tblparticipants OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16459)
-- Name: tblroles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblroles (
    roleid integer NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.tblroles OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16516)
-- Name: tblspeakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblspeakers (
    speakerid bigint NOT NULL,
    speaking_time integer,
    position_name text,
    position_order smallint,
    start_speaking_time timestamp with time zone,
    end_speaking_time timestamp with time zone,
    score smallint
);


ALTER TABLE public.tblspeakers OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16503)
-- Name: tbltopic_candidate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbltopic_candidate (
    topic_candidateid integer NOT NULL,
    vote_count smallint,
    topic text
);


ALTER TABLE public.tbltopic_candidate OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16408)
-- Name: tblusers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblusers (
    userid integer NOT NULL,
    peerid text,
    firebaseuid text NOT NULL,
    email text NOT NULL,
    firstname text,
    lastname text
);


ALTER TABLE public.tblusers OWNER TO postgres;

--
-- TOC entry 2893 (class 2606 OID 16417)
-- Name: tblusers email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- TOC entry 2895 (class 2606 OID 16419)
-- Name: tblusers firebaseuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT firebaseuid_unique UNIQUE (firebaseuid);


--
-- TOC entry 2903 (class 2606 OID 16448)
-- Name: tblmessages messageid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT messageid_pk PRIMARY KEY (messageid);


--
-- TOC entry 2907 (class 2606 OID 16492)
-- Name: tblnotes noteid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT noteid_pk PRIMARY KEY (noteid);


--
-- TOC entry 2901 (class 2606 OID 16435)
-- Name: tblchatroom tblchatroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblchatroom
    ADD CONSTRAINT tblchatroom_pkey PRIMARY KEY (chatroomid);


--
-- TOC entry 2899 (class 2606 OID 16427)
-- Name: tblcourts tblcourts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT tblcourts_pkey PRIMARY KEY (courtid);


--
-- TOC entry 2905 (class 2606 OID 16466)
-- Name: tblroles tblroles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblroles
    ADD CONSTRAINT tblroles_pkey PRIMARY KEY (roleid);


--
-- TOC entry 2911 (class 2606 OID 16523)
-- Name: tblspeakers tblspeakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblspeakers
    ADD CONSTRAINT tblspeakers_pkey PRIMARY KEY (speakerid);


--
-- TOC entry 2897 (class 2606 OID 16415)
-- Name: tblusers tblusers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT tblusers_pkey PRIMARY KEY (userid);


--
-- TOC entry 2909 (class 2606 OID 16510)
-- Name: tbltopic_candidate topic_candidate_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbltopic_candidate
    ADD CONSTRAINT topic_candidate_pk PRIMARY KEY (topic_candidateid);


--
-- TOC entry 2912 (class 2606 OID 16449)
-- Name: tblmessages chatroomid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT chatroomid_fk FOREIGN KEY (chatroomid) REFERENCES public.tblchatroom(chatroomid);


--
-- TOC entry 2914 (class 2606 OID 16470)
-- Name: tblparticipants courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2918 (class 2606 OID 16498)
-- Name: tblnotes courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2919 (class 2606 OID 16511)
-- Name: tbltopic_candidate courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbltopic_candidate
    ADD CONSTRAINT courtid_fk FOREIGN KEY (topic_candidateid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2920 (class 2606 OID 16527)
-- Name: tblcourt_speaker_users courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2916 (class 2606 OID 16480)
-- Name: tblparticipants roleid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT roleid_fk FOREIGN KEY (roleid) REFERENCES public.tblroles(roleid) NOT VALID;


--
-- TOC entry 2921 (class 2606 OID 16532)
-- Name: tblcourt_speaker_users speakerid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT speakerid_fk FOREIGN KEY (speakerid) REFERENCES public.tblspeakers(speakerid);


--
-- TOC entry 2913 (class 2606 OID 16454)
-- Name: tblmessages userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid) NOT VALID;


--
-- TOC entry 2915 (class 2606 OID 16475)
-- Name: tblparticipants userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid) NOT VALID;


--
-- TOC entry 2917 (class 2606 OID 16493)
-- Name: tblnotes userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid);


--
-- TOC entry 2922 (class 2606 OID 16537)
-- Name: tblcourt_speaker_users userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid);


-- Completed on 2021-08-25 00:38:33

--
-- PostgreSQL database dump complete
--

