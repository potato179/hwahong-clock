# Gumho Clock
**본 프로젝트는 금호고등학교 학생들을 위한 방송 화면 송출용으로 제작되었습니다.**

## DB 설치 가이드
### 일정(calander)
#### 테이블 설명
|칼럼|설명|
|---|---|
|day|요일|
|broadcast|방송 일정|
|events|학사 일정|

테이블 에시
|event|broadcast|events|
|---|---|---|
|월|월요일 학사일정|월요일 방송|
|화|화요일 학사일정|화요일 방송|
|수|수요일 학사일정|수요일 방송|
|목|목요일 학사일정|목요일 방송|
|금|금요일 학사일정|금요일 방송|
|토|토요일 학사일정|토요일 방송|
|일|일요일 학사일정|일요일 방송|

#### 명령어
```sql
CREATE TABLE calander (
    day varchar(16) NOT NULL,
    broadcast longtext NOT NULL,
    events longtext NOT NULL
);

INSERT INTO calander (day, broadcast, events) values("0", "", "");
INSERT INTO calander (day, broadcast, events) values("1", "", "");
INSERT INTO calander (day, broadcast, events) values("2", "", "");
INSERT INTO calander (day, broadcast, events) values("3", "", "");
INSERT INTO calander (day, broadcast, events) values("4", "", "");
INSERT INTO calander (day, broadcast, events) values("5", "", "");
INSERT INTO calander (day, broadcast, events) values("6", "", "");
```
### 참고사항
테이블 열 개수는 고정됩니다.