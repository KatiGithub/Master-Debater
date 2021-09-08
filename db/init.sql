--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.2

-- Started on 2021-09-08 22:57:12

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
-- TOC entry 213 (class 1259 OID 41094)
-- Name: tblchatmembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblchatmembers (
    connectionid text NOT NULL,
    chatroomid integer NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.tblchatmembers OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: tblchatroom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblchatroom (
    chatroomid integer NOT NULL,
    chat_start_time timestamp with time zone NOT NULL
);


ALTER TABLE public.tblchatroom OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32900)
-- Name: tblchatroom_chatroomid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tblchatroom ALTER COLUMN chatroomid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tblchatroom_chatroomid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 16391)
-- Name: tblcourt_speaker_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblcourt_speaker_users (
    courtid integer,
    speakerid bigint,
    userid integer
);


ALTER TABLE public.tblcourt_speaker_users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: tblcourts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblcourts (
    courtid integer NOT NULL,
    current_state integer NOT NULL,
    prep_time integer,
    general_chat integer,
    team1_chat integer,
    team2_chat integer,
    adjudicator_chat integer,
    topicid integer,
    court_token text NOT NULL
);


ALTER TABLE public.tblcourts OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 32898)
-- Name: tblcourts_courtid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tblcourts ALTER COLUMN courtid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tblcourts_courtid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 16400)
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
-- TOC entry 204 (class 1259 OID 16406)
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
-- TOC entry 205 (class 1259 OID 16412)
-- Name: tblparticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblparticipants (
    courtid integer,
    userid integer,
    roleid integer
);


ALTER TABLE public.tblparticipants OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16415)
-- Name: tblroles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tblroles (
    roleid integer NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.tblroles OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16421)
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
-- TOC entry 208 (class 1259 OID 16427)
-- Name: tbltopic_candidate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbltopic_candidate (
    topicid integer NOT NULL,
    vote_count smallint,
    topic text
);


ALTER TABLE public.tbltopic_candidate OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16433)
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
-- TOC entry 210 (class 1259 OID 16514)
-- Name: tblusers_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tblusers ALTER COLUMN userid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tblusers_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2871 (class 2606 OID 16440)
-- Name: tblusers email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- TOC entry 2873 (class 2606 OID 16442)
-- Name: tblusers firebaseuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT firebaseuid_unique UNIQUE (firebaseuid);


--
-- TOC entry 2861 (class 2606 OID 16444)
-- Name: tblmessages messageid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT messageid_pk PRIMARY KEY (messageid);


--
-- TOC entry 2863 (class 2606 OID 16446)
-- Name: tblnotes noteid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT noteid_pk PRIMARY KEY (noteid);


--
-- TOC entry 2857 (class 2606 OID 24707)
-- Name: tblchatroom tblchatroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblchatroom
    ADD CONSTRAINT tblchatroom_pkey PRIMARY KEY (chatroomid);


--
-- TOC entry 2859 (class 2606 OID 16450)
-- Name: tblcourts tblcourts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT tblcourts_pkey PRIMARY KEY (courtid);


--
-- TOC entry 2865 (class 2606 OID 16452)
-- Name: tblroles tblroles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblroles
    ADD CONSTRAINT tblroles_pkey PRIMARY KEY (roleid);


--
-- TOC entry 2867 (class 2606 OID 16454)
-- Name: tblspeakers tblspeakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblspeakers
    ADD CONSTRAINT tblspeakers_pkey PRIMARY KEY (speakerid);


--
-- TOC entry 2875 (class 2606 OID 16456)
-- Name: tblusers tblusers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblusers
    ADD CONSTRAINT tblusers_pkey PRIMARY KEY (userid);


--
-- TOC entry 2869 (class 2606 OID 16458)
-- Name: tbltopic_candidate topic_candidate_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbltopic_candidate
    ADD CONSTRAINT topic_candidate_pk PRIMARY KEY (topicid);


--
-- TOC entry 2885 (class 2606 OID 24708)
-- Name: tblmessages chatroomid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT chatroomid_fk FOREIGN KEY (chatroomid) REFERENCES public.tblchatroom(chatroomid);


--
-- TOC entry 2888 (class 2606 OID 16464)
-- Name: tblparticipants courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2886 (class 2606 OID 16469)
-- Name: tblnotes courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2891 (class 2606 OID 16474)
-- Name: tbltopic_candidate courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbltopic_candidate
    ADD CONSTRAINT courtid_fk FOREIGN KEY (topicid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2876 (class 2606 OID 16479)
-- Name: tblcourt_speaker_users courtid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT courtid_fk FOREIGN KEY (courtid) REFERENCES public.tblcourts(courtid);


--
-- TOC entry 2882 (class 2606 OID 24735)
-- Name: tblcourts fk_adjudicator_chat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT fk_adjudicator_chat FOREIGN KEY (adjudicator_chat) REFERENCES public.tblchatroom(chatroomid) NOT VALID;


--
-- TOC entry 2892 (class 2606 OID 41100)
-- Name: tblchatmembers fk_chatroomid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblchatmembers
    ADD CONSTRAINT fk_chatroomid FOREIGN KEY (chatroomid) REFERENCES public.tblchatroom(chatroomid);


--
-- TOC entry 2879 (class 2606 OID 24720)
-- Name: tblcourts fk_general_chat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT fk_general_chat FOREIGN KEY (general_chat) REFERENCES public.tblchatroom(chatroomid) NOT VALID;


--
-- TOC entry 2880 (class 2606 OID 24725)
-- Name: tblcourts fk_team1_chat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT fk_team1_chat FOREIGN KEY (team1_chat) REFERENCES public.tblchatroom(chatroomid) NOT VALID;


--
-- TOC entry 2881 (class 2606 OID 24730)
-- Name: tblcourts fk_team2_chat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT fk_team2_chat FOREIGN KEY (team2_chat) REFERENCES public.tblchatroom(chatroomid) NOT VALID;


--
-- TOC entry 2883 (class 2606 OID 24740)
-- Name: tblcourts fk_topicid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourts
    ADD CONSTRAINT fk_topicid FOREIGN KEY (topicid) REFERENCES public.tbltopic_candidate(topicid) NOT VALID;


--
-- TOC entry 2893 (class 2606 OID 41105)
-- Name: tblchatmembers fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblchatmembers
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.tblusers(userid);


--
-- TOC entry 2889 (class 2606 OID 16484)
-- Name: tblparticipants roleid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT roleid_fk FOREIGN KEY (roleid) REFERENCES public.tblroles(roleid) NOT VALID;


--
-- TOC entry 2877 (class 2606 OID 16489)
-- Name: tblcourt_speaker_users speakerid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT speakerid_fk FOREIGN KEY (speakerid) REFERENCES public.tblspeakers(speakerid);


--
-- TOC entry 2884 (class 2606 OID 16494)
-- Name: tblmessages userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblmessages
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid) NOT VALID;


--
-- TOC entry 2890 (class 2606 OID 16499)
-- Name: tblparticipants userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblparticipants
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid) NOT VALID;


--
-- TOC entry 2887 (class 2606 OID 16504)
-- Name: tblnotes userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblnotes
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid);


--
-- TOC entry 2878 (class 2606 OID 16509)
-- Name: tblcourt_speaker_users userid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tblcourt_speaker_users
    ADD CONSTRAINT userid_fk FOREIGN KEY (userid) REFERENCES public.tblusers(userid);


-- Completed on 2021-09-08 22:57:13

--
-- PostgreSQL database dump complete
--

