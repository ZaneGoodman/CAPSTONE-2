\echo "Delete and recreate prayer_room db?"
\prompt "Return for yes or control-C to cancel >" foo

DROP DATABASE prayer_room;
CREATE DATABASE prayer_room;
\connect prayer_room

\i prayer_room_schema.sql

\echo 'Delete and reacreate prayer_room_test db?'
\prompt 'Return for yes or control-C to cancel >' foo


DROP DATABASE prayer_room_test;
CREATE DATABASE prayer_room_test;
\connect prayer_room_test;

\i prayer_room_schema.sql
