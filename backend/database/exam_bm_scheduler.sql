PGDMP  *    +            	    {            exam_bm_scheduler    16.0    16.0 $               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    exam_bm_scheduler    DATABASE     �   CREATE DATABASE exam_bm_scheduler WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 !   DROP DATABASE exam_bm_scheduler;
                postgres    false            �            1259    16399    Admin    TABLE     �   CREATE TABLE public."Admin" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    refresh_token text,
    "createdAt" time with time zone,
    "updatedAt" time with time zone
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            �            1259    16402    Admin_id_seq    SEQUENCE     �   ALTER TABLE public."Admin" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Admin_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    16431    ConfirmationTemplate    TABLE     ~   CREATE TABLE public."ConfirmationTemplate" (
    id integer NOT NULL,
    message text NOT NULL,
    pembuka text NOT NULL
);
 *   DROP TABLE public."ConfirmationTemplate";
       public         heap    postgres    false            �            1259    16436    ConfirmationMessage_id_seq    SEQUENCE     �   ALTER TABLE public."ConfirmationTemplate" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ConfirmationMessage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    16403    Dosen    TABLE     �   CREATE TABLE public."Dosen" (
    id_dosen integer NOT NULL,
    nip character(19) NOT NULL,
    nidn character(11) NOT NULL,
    nama character varying(100) NOT NULL,
    no_whatsapp character(15) NOT NULL
);
    DROP TABLE public."Dosen";
       public         heap    postgres    false            �            1259    16406    Dosen_id_dosen_seq    SEQUENCE     �   ALTER TABLE public."Dosen" ALTER COLUMN id_dosen ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Dosen_id_dosen_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16440    HistoryReminder    TABLE       CREATE TABLE public."HistoryReminder" (
    id integer NOT NULL,
    nama character varying(100) NOT NULL,
    phone character(15) NOT NULL,
    status character(7) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    jenis_reminder character(6) NOT NULL
);
 %   DROP TABLE public."HistoryReminder";
       public         heap    postgres    false            �            1259    16439    HistoryReminder_id_seq    SEQUENCE     �   ALTER TABLE public."HistoryReminder" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."HistoryReminder_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    16407    JadwalUjian    TABLE     �  CREATE TABLE public."JadwalUjian" (
    id_ujian integer NOT NULL,
    id_dosen integer,
    tanggal_ujian date NOT NULL,
    waktu_mulai time without time zone NOT NULL,
    waktu_selesai time without time zone NOT NULL,
    nama_matakuliah character varying(50) NOT NULL,
    jenis_matakuliah character(2) NOT NULL,
    kelas character varying(20) NOT NULL,
    ruangan character varying(6) NOT NULL,
    id_pengawas integer
);
 !   DROP TABLE public."JadwalUjian";
       public         heap    postgres    false            �            1259    16410    JadwalUjian_id_ujian_seq    SEQUENCE     �   ALTER TABLE public."JadwalUjian" ALTER COLUMN id_ujian ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."JadwalUjian_id_ujian_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16446    ReminderTemplate    TABLE     z   CREATE TABLE public."ReminderTemplate" (
    id integer NOT NULL,
    pembuka text NOT NULL,
    message text NOT NULL
);
 &   DROP TABLE public."ReminderTemplate";
       public         heap    postgres    false            �            1259    16445    ReminderTemplate_id_seq    SEQUENCE     �   ALTER TABLE public."ReminderTemplate" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ReminderTemplate_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226                      0    16399    Admin 
   TABLE DATA           b   COPY public."Admin" (id, username, password, refresh_token, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   V+                 0    16431    ConfirmationTemplate 
   TABLE DATA           F   COPY public."ConfirmationTemplate" (id, message, pembuka) FROM stdin;
    public          postgres    false    221   �+                 0    16403    Dosen 
   TABLE DATA           I   COPY public."Dosen" (id_dosen, nip, nidn, nama, no_whatsapp) FROM stdin;
    public          postgres    false    217   �,                 0    16440    HistoryReminder 
   TABLE DATA           a   COPY public."HistoryReminder" (id, nama, phone, status, "timestamp", jenis_reminder) FROM stdin;
    public          postgres    false    224   �.       
          0    16407    JadwalUjian 
   TABLE DATA           �   COPY public."JadwalUjian" (id_ujian, id_dosen, tanggal_ujian, waktu_mulai, waktu_selesai, nama_matakuliah, jenis_matakuliah, kelas, ruangan, id_pengawas) FROM stdin;
    public          postgres    false    219   G0                 0    16446    ReminderTemplate 
   TABLE DATA           B   COPY public."ReminderTemplate" (id, pembuka, message) FROM stdin;
    public          postgres    false    226   q2                  0    0    Admin_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Admin_id_seq"', 2, true);
          public          postgres    false    216                       0    0    ConfirmationMessage_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ConfirmationMessage_id_seq"', 3, true);
          public          postgres    false    222                       0    0    Dosen_id_dosen_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Dosen_id_dosen_seq"', 14, true);
          public          postgres    false    218                       0    0    HistoryReminder_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."HistoryReminder_id_seq"', 103, true);
          public          postgres    false    223                       0    0    JadwalUjian_id_ujian_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."JadwalUjian_id_ujian_seq"', 163, true);
          public          postgres    false    220                       0    0    ReminderTemplate_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."ReminderTemplate_id_seq"', 2, true);
          public          postgres    false    225            j           2606    16412    Admin Admin_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "Admin_pkey";
       public            postgres    false    215            p           2606    16438 -   ConfirmationTemplate ConfirmationMessage_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."ConfirmationTemplate"
    ADD CONSTRAINT "ConfirmationMessage_pkey" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public."ConfirmationTemplate" DROP CONSTRAINT "ConfirmationMessage_pkey";
       public            postgres    false    221            l           2606    16414    Dosen Dosen_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Dosen"
    ADD CONSTRAINT "Dosen_pkey" PRIMARY KEY (id_dosen);
 >   ALTER TABLE ONLY public."Dosen" DROP CONSTRAINT "Dosen_pkey";
       public            postgres    false    217            r           2606    16444 $   HistoryReminder HistoryReminder_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."HistoryReminder"
    ADD CONSTRAINT "HistoryReminder_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."HistoryReminder" DROP CONSTRAINT "HistoryReminder_pkey";
       public            postgres    false    224            n           2606    16416    JadwalUjian JadwalUjian_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT "JadwalUjian_pkey" PRIMARY KEY (id_ujian);
 J   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT "JadwalUjian_pkey";
       public            postgres    false    219            t           2606    16452 &   ReminderTemplate ReminderTemplate_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."ReminderTemplate"
    ADD CONSTRAINT "ReminderTemplate_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."ReminderTemplate" DROP CONSTRAINT "ReminderTemplate_pkey";
       public            postgres    false    226            u           2606    16417    JadwalUjian fk_id_dosen    FK CONSTRAINT     �   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT fk_id_dosen FOREIGN KEY (id_dosen) REFERENCES public."Dosen"(id_dosen);
 C   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT fk_id_dosen;
       public          postgres    false    219    4716    217            v           2606    16422    JadwalUjian fk_id_pengawas    FK CONSTRAINT     �   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT fk_id_pengawas FOREIGN KEY (id_pengawas) REFERENCES public."Dosen"(id_dosen);
 F   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT fk_id_pengawas;
       public          postgres    false    217    4716    219               V   x�3�LL����T1JR14P��/��HINH2
/��*(�,���N�JKK�33���J��϶/�*�r���u��� �=... 8q�         �   x���1n1E��)� �DII�*�AHi,E��8����#
��(Q�}=ό�{��xd$WkO������<H�H��x���ǃ��)˟(��D�ݢ]I(Ab��7�qDTX�Q�Be�I"|���G��.+�������ۤ啋�
��Z�ĸ��V^޵�y��I�N7
=M@��t��ڠ���I�ޝZF����ڒ���?���6d�1�1ԝ         �  x�u�Oo�@��˧�{�jg���4�ڃ#���U/�B��@$0j����!�����7o@m��!���;k4��7e�Hޗ��_�~��M�à��hmT(3�1J\0(~���()��2�t�ݑ:� h���`X��R��b�==�|��f԰g/�H�d�zg�c;F .AZh{}���M�I����w��a�M�Eg=(F�YN�=��4�j���|(*�_�~�f;.����������qJ�.�m�'��ѩh���?��EU���x��y8j�2�R	�Ai��G��^�����
�e��s�T�9
g���Q�3�`�
Ʃ6$����8�0Z�sl�Gvr��8&<��TдS e�����"��Sj���)�/}:�#x�h�6L��	X���jK��H�Ɂ�BT��z��7�¬��;�kǅ��l]vo5%r8[1�0.k�ύ��N^�� n<��Ca�=q�G�,s~}̲�U~�p         �  x���MO�0��ί�Zd�=��m��z!�!.Bcm�H�Fm���8\A��)�G��y��M�ߏ�WL}[���:�À��k'���>9���a�Ġ �g��.����#���%���c�C��h��$L!f��:�}�Km�籉]<$~9�����u��Ԃ����'��ȯ��>ͱ���t,�1��ߺM��L�!�à7�k��0d�bM=�ߏ�{K!@�?9�A�<����_��?C�s��Q�G���6�e����{#�U�L�{���0[�^S/!��j���ˎ~�{��̫y�M�4��iY�^S�mf�:���R|L�V��`tc��X�"-2	�b�{�3�TrƩ%�]Sə��i��VrbP%�"��Wr�����o\��	F��&K� 8��HF�~�,4U���3�����[Õ      
     x���Mn�0�ףS�8���s���A� �M72�j,ɐ��}(AH!����fތ��� p�i�l�
`�c�d��մ���P��O���{؈�a��X ϐ��H�Dpz�V���o�K��o�rd�%�_>�F>���ݡ�;®�7�܍"%+�@"�5���Q�/�ɿ�Lo�q�A�3�V� H��(���x�����܏��VkPA��򋿸s
���*�P
�-�鱫�z���5���;��QŲ̐XHtn��WDקc�n���t��h���((��!�y��f���kVs�����[�vT�l��n*tG�b5��ƴ�k�}��|��tv��x����'�9\����j�fR�zU�y������C�_�J1��*U�y�ͣ�#�7�J4��!ѫ�#(�{�y�X�N4��!�$��4�(ȣw���#w@^.����Z��-���e*���BDr"����i!"�T:%D��OJG��T�E���N:1D��^"��^"�-`'��wR�(�E�	!��&˲O��nq         �   x�͏M
�0���)� ��K��� �W�4?-&C!w7�
�]����߼Cu���f혒�C��I��W��F��aA�N�ɜ�ᕂ�4�aKi���:�Йv�;H+�J�G6�A%�1l�v%ȔF�u�F5ݤ-�d֑����".���q��Ȁ�&�5�W�{#�x+��     