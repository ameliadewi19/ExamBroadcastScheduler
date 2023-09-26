PGDMP      ;                {            exam_bm_scheduler    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    exam_bm_scheduler    DATABASE     �   CREATE DATABASE exam_bm_scheduler WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
 !   DROP DATABASE exam_bm_scheduler;
                postgres    false            �            1259    16400    Admin    TABLE     �   CREATE TABLE public."Admin" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            �            1259    16399    Admin_id_seq    SEQUENCE     �   ALTER TABLE public."Admin" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Admin_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16432    ConfirmationTemplate    TABLE     c   CREATE TABLE public."ConfirmationTemplate" (
    id integer NOT NULL,
    message text NOT NULL
);
 *   DROP TABLE public."ConfirmationTemplate";
       public         heap    postgres    false            �            1259    16431    ConfirmationMessage_id_seq    SEQUENCE     �   ALTER TABLE public."ConfirmationTemplate" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ConfirmationMessage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16406    Dosen    TABLE     �   CREATE TABLE public."Dosen" (
    id_dosen integer NOT NULL,
    nip character(19) NOT NULL,
    nidn character(11) NOT NULL,
    nama character varying(100) NOT NULL,
    no_whatsapp character(15) NOT NULL
);
    DROP TABLE public."Dosen";
       public         heap    postgres    false            �            1259    16405    Dosen_id_dosen_seq    SEQUENCE     �   ALTER TABLE public."Dosen" ALTER COLUMN id_dosen ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Dosen_id_dosen_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16412    JadwalUjian    TABLE     �  CREATE TABLE public."JadwalUjian" (
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
       public         heap    postgres    false            �            1259    16411    JadwalUjian_id_ujian_seq    SEQUENCE     �   ALTER TABLE public."JadwalUjian" ALTER COLUMN id_ujian ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."JadwalUjian_id_ujian_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �          0    16400    Admin 
   TABLE DATA           9   COPY public."Admin" (id, username, password) FROM stdin;
    public          postgres    false    216   f       �          0    16432    ConfirmationTemplate 
   TABLE DATA           =   COPY public."ConfirmationTemplate" (id, message) FROM stdin;
    public          postgres    false    222   �       �          0    16406    Dosen 
   TABLE DATA           I   COPY public."Dosen" (id_dosen, nip, nidn, nama, no_whatsapp) FROM stdin;
    public          postgres    false    218   �       �          0    16412    JadwalUjian 
   TABLE DATA           �   COPY public."JadwalUjian" (id_ujian, id_dosen, tanggal_ujian, waktu_mulai, waktu_selesai, nama_matakuliah, jenis_matakuliah, kelas, ruangan, id_pengawas) FROM stdin;
    public          postgres    false    220                      0    0    Admin_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Admin_id_seq"', 2, true);
          public          postgres    false    215                       0    0    ConfirmationMessage_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ConfirmationMessage_id_seq"', 3, true);
          public          postgres    false    221                       0    0    Dosen_id_dosen_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Dosen_id_dosen_seq"', 2, true);
          public          postgres    false    217            	           0    0    JadwalUjian_id_ujian_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."JadwalUjian_id_ujian_seq"', 2, true);
          public          postgres    false    219            `           2606    16404    Admin Admin_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "Admin_pkey";
       public            postgres    false    216            f           2606    16438 -   ConfirmationTemplate ConfirmationMessage_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."ConfirmationTemplate"
    ADD CONSTRAINT "ConfirmationMessage_pkey" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public."ConfirmationTemplate" DROP CONSTRAINT "ConfirmationMessage_pkey";
       public            postgres    false    222            b           2606    16410    Dosen Dosen_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Dosen"
    ADD CONSTRAINT "Dosen_pkey" PRIMARY KEY (id_dosen);
 >   ALTER TABLE ONLY public."Dosen" DROP CONSTRAINT "Dosen_pkey";
       public            postgres    false    218            d           2606    16416    JadwalUjian JadwalUjian_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT "JadwalUjian_pkey" PRIMARY KEY (id_ujian);
 J   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT "JadwalUjian_pkey";
       public            postgres    false    220            g           2606    16417    JadwalUjian fk_id_dosen    FK CONSTRAINT     �   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT fk_id_dosen FOREIGN KEY (id_dosen) REFERENCES public."Dosen"(id_dosen);
 C   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT fk_id_dosen;
       public          postgres    false    218    220    4706            h           2606    16422    JadwalUjian fk_id_pengawas    FK CONSTRAINT     �   ALTER TABLE ONLY public."JadwalUjian"
    ADD CONSTRAINT fk_id_pengawas FOREIGN KEY (id_pengawas) REFERENCES public."Dosen"(id_dosen);
 F   ALTER TABLE ONLY public."JadwalUjian" DROP CONSTRAINT fk_id_pengawas;
       public          postgres    false    218    220    4706            �   R   x�3�LL����T1�T14P)5�Mt.�4�
�/2O4�q/�*u�*0��r�I����L*)�)��1w�ы,������ E�      �   �   x���1n1Ek|�9�&J�T�P�(�%��Z�c{X�=�@�{<��2���|{�b������F:���ڑ������=H�H��x���ǃ��)+˟(��D�����P��Z-��Qa�D��"ʎ�I"|���G��.+��%����ۤ嵋�
��Z��6I���N��=�����m�Q���(�����F�g�V�t�z04����b��      �   Z   x�e�!�0Pݞb����~�zn�� � �����SR�^[�+�V%��Ұ�˚��8�skY!�Xb����=y8���.Q*O=3_��      �   w   x�E�A
�0F��?��"3��;i�ܸ�B��Az�(��[}��zǝ���3� ��K���J�����a��	���R�h�]ￄl�!^�=*0��mM�)/6c��(��}GD+_N!B     