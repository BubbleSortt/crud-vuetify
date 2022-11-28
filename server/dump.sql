-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:8889
-- Время создания: Ноя 22 2022 г., 19:44
-- Версия сервера: 5.7.34
-- Версия PHP: 8.0.8

SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET
    time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: mydb
--

DELIMITER
$$
--
-- Процедуры
--
CREATE
    DEFINER = root@localhost PROCEDURE get_teacher_id(OUT param INT, OUT hours INT)
begin
    SELECT id_Преподавателя, свободное_время
    FROM (SELECT *,
                 (Общее_кол - во_часов - (SELECT sum(кол - во_часов)
                                          FROM Нагрузка
                                          WHERE Нагрузка.id_преподавателя = Преподаватели.id_Преподавателя)) as свободное_время
          FROM Преподаватели
          ORDER BY свободное_время desc
          LIMIT 1) as t
    INTO param, hours;
end$$

CREATE
    DEFINER = root@localhost PROCEDURE set_capacity(lesson_id INT, group_id INT, hours INT)
begin
    DECLARE
        teacher_id , teacher_hours INT;
    CALL get_teacher_id(teacher_id, teacher_hours);
    IF
        teacher_id > 0 AND teacher_hours >= hours THEN
        INSERT INTO Нагрузка
        SET кол -во_часов = hours,
            id_предмета      = lesson_id,
            id_преподавателя = teacher_id,
            id_группы        = group_id;
        SELECT 'Все окей' as msg;
    ELSE
        SELECT 'У преподавателя нет столько часов' as msg;
    END IF;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы Groups
--

CREATE TABLE Groups
(
    id         integer      NOT NULL,
    speciality varchar(255) NOT NULL,
    name       varchar(45)  NOT NULL,
    leader     varchar(45)  NOT NULL,
    year       integer      NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Дамп данных таблицы Groups
--

INSERT INTO Groups (id, speciality, name, leader, year)
VALUES (9, 'Математическое обеспечение и администрирование информационных систем', 'МОСб-191', 'Владимиров', 2019),
       (10, 'Программная инженерия', 'ПИб-191', 'Асланян', 2019),
       (11, 'Математическое обеспечение и администрирование информационных систем', 'МОСб-192', 'Петров', 2019),
       (12, 'Информационная вычислительная техника', 'ИВТ-2019', 'Широбоков', 2019),
       (13, 'Прикладная математика и информатика', 'ПМИб-2019', 'Зенин', 2019),
       (14, 'Информационные системы и технологии', 'ИСТ-2019', 'Свиридов', 2019),
       (15, 'Математика и компьютерные науки', 'МКН-2019', 'Айвазян', 2019),
       (16, 'Прикладная информатика', 'ПРИ-2019', 'Охотников', 2019),
       (17, 'Программная инженерия', 'ПИ-2020', 'Кузьменко', 2020),
       (18, 'Информационная вычислительная техника', 'ИВТ-2020', 'Чижикова', 2020),
       (28, 'dfhd', 'fhfdh', 'dfhd', 46),
       (32, 'dgg', 'sdg', 'sdgg', 355),
       (33, 'sdg35l', 'sdgkp', 'sdgl', 835),
       (36, 'Какая-то новая группа', 'Название нвовой группы', 'j', 11);

-- --------------------------------------------------------

--
-- Структура таблицы Должности
--

CREATE TABLE Должности
(
    id_должности integer     NOT NULL,
    Должность    varchar(45) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Дамп данных таблицы Должности
--

INSERT INTO Должности (id_должности, Должность)
VALUES (1, 'Старший преподаватель'),
       (2, 'Преподаватель'),
       (3, 'Заведующий кафедрой'),
       (4, 'Ассистент'),
       (5, 'Лаборант'),
       (7, 'sdgddd');

-- --------------------------------------------------------

--
-- Структура таблицы Нагрузка
--

CREATE TABLE Нагрузка
(
    id               integer NOT NULL,
    кол-во_часов integer NOT NULL,
    id_предмета      integer NOT NULL,
    id_преподавателя integer NOT NULL,
    id_группы        integer NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Дамп данных таблицы Нагрузка
--

INSERT INTO Нагрузка (id, кол-во_часов, id_предмета, id_преподавателя, id_группы)
VALUES (1, 35, 1, 1, 12),
       (2, 140, 2, 9, 9),
       (3, 140, 3, 2, 10),
       (4, 170, 4, 3, 11),
       (5, 130, 5, 4, 12),
       (6, 70, 6, 5, 13),
       (7, 140, 7, 6, 14),
       (8, 20, 8, 7, 14),
       (9, 100, 8, 7, 16),
       (10, 40, 9, 8, 17),
       (11, 60, 10, 10, 15),
       (12, 24, 2, 8, 11),
       (14, 2, 8, 7, 14),
       (15, 3, 8, 7, 14),
       (19, 1, 1, 8, 9),
       (22, 1, 1, 8, 9),
       (25, 2, 1, 1, 9),
       (30, 1, 1, 8, 9),
       (31, 1, 2, 8, 9),
       (32, 1, 2, 8, 9),
       (33, 1, 2, 8, 9),
       (34, 1, 2, 8, 9),
       (35, 1, 2, 8, 9),
       (36, 1, 2, 8, 9),
       (37, 1, 3, 8, 10),
       (38, 1, 1, 8, 9),
       (39, 1, 2, 8, 9),
       (40, 1, 2, 8, 9);

--
-- Триггеры Нагрузка
--
DELIMITER
$$
CREATE TRIGGER before_insert_trigger
    BEFORE INSERT
    ON Нагрузка
    FOR EACH ROW IF (SELECT Общее_кол - во_часов
                     from Преподаватели
                     where id_Преподавателя = NEW.id_преподавателя) - (SELECT sum(кол - во_часов)
                                                                       FROM Нагрузка
                                                                       WHERE id_преподавателя = NEW.id_преподавателя) -
                    NEW.кол - во_часов < 0 THEN
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'У преподавателя нет столько часов';
END IF
$$
DELIMITER ;
DELIMITER
$$
CREATE TRIGGER before_update_trigger
    BEFORE UPDATE
    ON Нагрузка
    FOR EACH ROW IF (SELECT Общее_кол - во_часов
                     from Преподаватели
                     where id_Преподавателя = NEW.id_преподавателя) - (SELECT sum(кол - во_часов)
                                                                       FROM Нагрузка
                                                                       WHERE id_преподавателя = NEW.id_преподавателя) -
                    NEW.кол - во_часов < 0 THEN
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'У преподавателя нет столько часов';
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы Предметы
--

CREATE TABLE Предметы
(
    id                int(11)     NOT NULL,
    Название_предмета varchar(45) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Дамп данных таблицы Предметы
--

INSERT INTO Предметы (id, Название_предмета)
VALUES (1, 'Геометрия'),
       (2, 'Базы данных'),
       (3, 'Компьютерная графика'),
       (4, 'Алгоритмы'),
       (5, 'Численные методы'),
       (6, 'Дифференциальные уравнения'),
       (7, 'Веб-разработка'),
       (8, 'Физкультура'),
       (9, 'Test'),
       (10, 'Программирование'),
       (11, 'nTC'),
       (12, 'test'),
       (13, 'test'),
       (14, 'DGGDG'),
       (15, 'DGGDG'),
       (16, 'DGGDG'),
       (17, 'DGGDG'),
       (18, 'dg'),
       (19, 'dg'),
       (20, 'dg'),
       (21, 'dg'),
       (22, 'dg'),
       (23, 'dg'),
       (24, 'djjg'),
       (25, 'djjg'),
       (26, 'djjg'),
       (27, 'djjg'),
       (28, 'new'),
       (29, 'new'),
       (30, 'new'),
       (31, 'вп'),
       (32, 'dsgd'),
       (33, 'dg'),
       (34, 'sdg'),
       (36, 'Test'),
       (38, 'Test');

-- --------------------------------------------------------

--
-- Структура таблицы Преподаватели
--

CREATE TABLE Преподаватели
(
    id_Преподавателя int(11)       NOT NULL,
    Фамилия          varchar(45)   NOT NULL,
    Имя              varchar(45)   NOT NULL,
    Отчество         varchar(45)   NOT NULL,
    Ставка           decimal(3, 2) NOT NULL,
    Общее_кол-во_часов int (11) NOT NULL,
    id_должности     int(11)       NOT NULL,
    id_ученой степени int (11) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Дамп данных таблицы Преподаватели
--

INSERT INTO Преподаватели (id_Преподавателя, Фамилия, Имя, Отчество, Ставка, Общее_кол-во_часов, id_должности,
                           id_ученой степени)
VALUES (1, 'Полубоярова', 'Наталья', 'Михайловна', '1.00', 120, 2, 6),
       (2, 'Штельмах', 'Татьяна', 'Владимировна', '1.00', 180, 1, 7),
       (3, 'Светлов', 'Андрей', 'Владимирович', '1.00', 135, 2, 6),
       (4, 'Помельников', 'Юрий', 'Вячеславович', '0.50', 75, 2, 2),
       (5, 'Овчинников', 'Степан', 'Александрович', '0.75', 40, 2, 6),
       (6, 'Кондрашов', 'Александр', 'Николаевич', '1.00', 155, 2, 1),
       (7, 'Клячин', 'Владимир', 'Александрович', '1.00', 125, 3, 1),
       (8, 'Григорьева', 'Елена', 'Григорьевна', '1.00', 160, 1, 3),
       (9, 'Чебаненко', 'Никита', 'Алексеевич', '1.00', 170, 1, 5),
       (10, 'Гордеева', 'Алексей', 'Юрьевич', '1.25', 60, 5, 4),
       (11, '1', '12', '1', '1.00', 1, 1, 1),
       (12, 'Бычкин', 'Александр', 'Вастльевич', '1.00', 190, 2, 3);

--
-- Триггеры Преподаватели
--
DELIMITER
$$
CREATE TRIGGER test_trigger
    BEFORE UPDATE
    ON Преподаватели
    FOR EACH ROW IF NEW.Общее_кол - во_часов > 50 THEN
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sale has exceeded the allowed amount of 10000.';
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы Проведенные пары
--

CREATE TABLE Проведенные пары
(
    id int
    (
    11
    ) NOT NULL,
    Аудитория varchar
    (
    45
    ) NOT NULL,
    Время datetime NOT NULL,
    Нагрузка_id int
    (
    11
    ) NOT NULL
)
ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы Проведенные пары
--

INSERT INTO Проведенные пары (id, Аудитория, Время, Нагрузка_id)
VALUES
    (1, '4-07А', '2022-04-13 13:40:00', 1),
    (2, '3-02А', '2022-03-14 10:10:00', 2),
    (3, '4-06А', '2022-03-16 08:30:00', 3),
    (4, '3-06А', '2022-03-02 15:10:00', 4),
    (5, '3-07А', '2022-04-06 12:00:00', 5),
    (6, '3-12А', '2022-04-01 10:10:00', 6),
    (7, '3-02Б', '2022-04-09 15:20:00', 8),
    (8, '3-08А', '2022-04-12 12:10:00', 8),
    (9, '3-08А', '2022-04-12 17:00:00', 9),
    (10, '3-08Б', '2022-04-11 13:40:00', 10);

-- --------------------------------------------------------

--
-- Структура таблицы Ученые степени
--

CREATE TABLE Ученые степени
(
    id int
    (
    11
    ) NOT NULL,
    Наименование_степени varchar
    (
    45
    ) NOT NULL
)
ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы Ученые степени
--

INSERT INTO Ученые степени (id, Наименование_степени)
VALUES
    (1, 'Доктор наук'),
    (2, 'Магистр'),
    (3, 'Аспирант'),
    (4, 'Бакалавр'),
    (5, 'Кандидат доктора наук'),
    (6, 'Доцент'),
    (7, 'Отсутствует');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы Groups
--
ALTER TABLE Groups
    ADD PRIMARY KEY (id);

--
-- Индексы таблицы Должности
--
ALTER TABLE Должности
    ADD PRIMARY KEY (id_должности);

--
-- Индексы таблицы Нагрузка
--
ALTER TABLE Нагрузка
    ADD PRIMARY KEY (id, id_предмета, id_преподавателя, id_группы),
    ADD KEY fk_Нагрузка_Предметы_idx (id_предмета),
    ADD KEY fk_Нагрузка_Преподаватели1_idx (id_преподавателя),
    ADD KEY fk_Нагрузка_Groups1_idx (id_группы);

--
-- Индексы таблицы Предметы
--
ALTER TABLE Предметы
    ADD PRIMARY KEY (id);

--
-- Индексы таблицы Преподаватели
--
ALTER TABLE Преподаватели
    ADD PRIMARY KEY (id_Преподавателя, id_должности, id_ученой степени),
    ADD KEY fk_Преподаватели_Ученые степени1_idx (id_ученой степени),
    ADD KEY fk_Преподаватели_Должности1_idx (id_должности);

--
-- Индексы таблицы Проведенные пары
--
ALTER TABLE Проведенные пары
    ADD PRIMARY KEY (id,Нагрузка_id),
    ADD KEY fk_Проведенные пары_Нагрузка1_idx (Нагрузка_id);

--
-- Индексы таблицы Ученые степени
--
ALTER TABLE Ученые степени
    ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы Groups
--
ALTER TABLE Groups
    MODIFY id integer NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 37;

--
-- AUTO_INCREMENT для таблицы Должности
--
ALTER TABLE Должности
    MODIFY id_должности int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 8;

--
-- AUTO_INCREMENT для таблицы Нагрузка
--
ALTER TABLE Нагрузка
    MODIFY id int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 41;

--
-- AUTO_INCREMENT для таблицы Предметы
--
ALTER TABLE Предметы
    MODIFY id int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 39;

--
-- AUTO_INCREMENT для таблицы Преподаватели
--
ALTER TABLE Преподаватели
    MODIFY id_Преподавателя int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 13;

--
-- AUTO_INCREMENT для таблицы Проведенные пары
--
ALTER TABLE Проведенные пары
    MODIFY id int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =11;

--
-- AUTO_INCREMENT для таблицы Ученые степени
--
ALTER TABLE Ученые степени
    MODIFY id int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы Нагрузка
--
ALTER TABLE Нагрузка
    ADD CONSTRAINT fk_Нагрузка_Groups1 FOREIGN KEY (id_группы) REFERENCES Groups (id) ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Нагрузка_Предметы FOREIGN KEY (id_предмета) REFERENCES Предметы (id) ON
        UPDATE CASCADE,
    ADD CONSTRAINT fk_Нагрузка_Преподаватели1 FOREIGN KEY (id_преподавателя) REFERENCES Преподаватели (id_Преподавателя)
        ON
            UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы Преподаватели
--
ALTER TABLE Преподаватели
    ADD CONSTRAINT fk_Преподаватели_Должности1 FOREIGN KEY (id_должности) REFERENCES Должности (id_должности) ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Преподаватели_Ученые степени1 FOREIGN KEY (id_ученой степени) REFERENCES Ученые степени (id) ON
UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы Проведенные пары
--
ALTER TABLE Проведенные пары
    ADD CONSTRAINT fk_Проведенные пары_Нагрузка1 FOREIGN KEY (Нагрузка_id) REFERENCES Нагрузка (id) ON
UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
