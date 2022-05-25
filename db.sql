DROP DATABASE IF EXISTS a1;
CREATE DATABASE a1;
USE a1;

DROP TABLE IF EXISTS proverbs;
CREATE TABLE proverbs(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    BODY VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL
);

DESC proverbs;

TRUNCATE proverbs;

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '내 사전에 불가능이란 없다.',
    author = '나폴레옹';
    
INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '삶이 있는 한 희망은 있다.',
    author = '키케로';

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '언제나 현재에 집중할수 있다면 행복할것이다.',
    author = '파울로 코엘료';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '당신이 할수 있다고 믿든 할수 없다고 믿든 믿는 대로 될것이다.',
    author = '헨리 포드';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '최고에 도달하려면 최저에서 시작하라.',
    author = 'P.시루스';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '언제나 현재에 집중할수 있다면 행복할것이다.',
    author = '파울로 코엘료';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '문제는 목적지에 얼마나 빨리 가느내가 아니라 그 목적지가 어디냐는 것이다.',
    author = '메이벨 뉴컴버';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '한 번 실패와 영원한 실패를 혼동하지 마라.',
    author = 'F.스콧 핏제랄드';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '겨울이 오면 봄이 멀지 않으리',
    author = '셸리';   

INSERT INTO proverbs
    SET regDate = '2022-12-12 12:12:12',
    BODY = '당신의 행복은 무엇이 당신의 영혼을 노래하게 하는가에 따라 결정된다.',
    author = '낸시 설리번';   

SELECT * FROM proverbs;     
SELECT * FROM proverbs ORDER BY RAND() LIMIT 1;

ALTER TABLE proverbs ADD COLUMN hit INT UNSIGNED NOT NULL;

DESC proverbs;