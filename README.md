# Today's movies
>react_movie_app_2022
>
>영화 검색 및 한줄평 웹사이트

2022년도 전공심화과정 1학기에 진행한 개인 프로젝트로 React 라이브러리를 선택하여 영화, 영화인을 검색할 수 있고, 한줄평을 간단하게 작성할 수 있는 웹사이트를 개발했습니다.

API는 영화의 상세 줄거리를 제공하는 TMDB를 사용하였고, 주요 기능은 최근 인기 영화 제공, 영화 상세 정보 검색 및 조회, 한줄평 작성입니다.

아직 미완 상태로, 영화 뿐만 아니라 영화인에 대한 정보도 검색이 가능하나 상세 정보를 조회할 수는 없고, 코드를 다듬어 페이지를 영문으로 띄우는 기능도 구현하고자 합니다.

## 프로젝트 진행 기간

2022 . 03 . 02  - 2022 . 06 . 15

## 개발 환경

```sh
Windows 10
React.js
Node.js
Express middleware
MySQL 8.0.23
```

## 주차별 진행 내역
* 7주차 이전
  * 주제 선정
* 7주차
  * 개발 환경 구축
  * 네이버 검색 API를 사용하려고 계획하고 검색 API 신청 완료
* 8주차
  * 네이버 검색 API가 검색어 쿼리를 요청받지 못하는 오류 발생
* 9~11주차
  * 검색어 쿼리 요청 성공
  * 영화 검색 및 조회 구현
  * 상세 페이지 조회 불가, 파라미터 전송 실패
* 12주차
  * 네이버 검색 API의 상세 정보 부재로 영화 정보 검색 API를 TMDB로 변경
* 13주차
  * StrictMod 제거 후 파라미터 전송 구현
* 14주차
  * 메인 및 상세 정보 페이지 디자인
  * 영화 검색 기능 구현
  * 상세 정보 조회 구현 및 한줄평 기능 50% 구현
* 15주차
  * DB 연동 및 한줄평 기능 완성
* 16주차
  * Github pages를 이용하여 DB를 제외한 정적 페이지 호스팅, API 사용만 가능
  * 최종 프로젝트 완료 보고서 제출 및 완료 발표, 시연
* 16주차 이후
  * 메인 제목 수정, 영화인 검색 기능 구현
  * 영문 검색 기능 구현 중
  * 영화인 상세 정보 조회 미구현

## 스크린샷

메인화면

![메인화면](https://user-images.githubusercontent.com/71215834/200582511-111a8433-00b4-47f0-89e2-662da3d57a8a.png)

검색 기능

![검색 기능](https://user-images.githubusercontent.com/71215834/200582672-d4a1ec87-2fdf-4b0e-8009-fb1833eb9cfe.png)

상세 정보

![상세 정보](https://user-images.githubusercontent.com/71215834/200582721-17d0d648-40e7-4ada-ba59-8a5e6ed38d97.png)

한줄평 작성

![작성 기능](https://user-images.githubusercontent.com/71215834/200583623-3794ae0c-047d-4fcb-8103-480e6a3057e2.png)

한줄평 수정

![수정 기능](https://user-images.githubusercontent.com/71215834/200583693-b9a486b8-71d2-4e3d-b9aa-22b179b1bdfa.png)

수정 내용

![수정 내용](https://user-images.githubusercontent.com/71215834/200583974-525e9e4b-cb7c-4efe-9a4c-f1d5b8b12a25.png)

수정 결과

![수정 결과](https://user-images.githubusercontent.com/71215834/200584076-f94d9493-7c3d-43e0-a3ed-e092a9ffc9bf.png)

한줄평 삭제

![삭제 기능](https://user-images.githubusercontent.com/71215834/200584114-8eaaf969-1639-4bb5-8b46-8bcb8f11e172.png)

삭제 결과

![삭제 결과](https://user-images.githubusercontent.com/71215834/200584172-6fa1d0a1-e4f3-483b-840d-89e8f1cbc07c.png)

## 정보
오상욱 / woqls1972@gmail.com

_해당 프로젝트의 Front 코드입니다. 미완, 수정 중인 프로젝트입니다._
