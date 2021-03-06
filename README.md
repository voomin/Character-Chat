# 캐릭터 채팅 사이트
> 접속시 다양한 캐릭터들 중 하나로 지정되어 접속한 사용자들간 채팅, 움직임으로 소통할 수 있는 웹어플리케이션 입니다.


## 시연영상
https://youtu.be/pi_vbCU87cI

## 사용기술 
Node js, express js, pug

## 작동원리
> Node서버에서 실시간 웹소켓통신 기능을 이용해 클라이언트들의 정보를 주고 받을 수 있도록 합니다.
> 부드럽게 작동되는 UI(사용자인터페이스)를 제공하기 위해 '방향정보를 이용한 위치처리기법'을 사용했습니다.
> #### 방향정보를 이용한 위치처리 기법
> * 처리방식은 thread가 n초 단위(*n이 낮을수록 부드럽게 작동된다*)로 작동하면서 키보드 이벤트에 의해 발생되는 방향정보를 수신합니다.
수신된 방향정보에 의해 thread가 캐릭터의 위치정보를 업데이트 합니다. 이 기법(알고리즘)을 이용해 부드러운 컨트롤이 가능한 UI를 제공할 수 있게 됬습니다.

## 파일정보
+ server.js : 서버의 메인파일
+ socket.js : 클라이언트간 소켓통신할때 처리되는 파일
+ things.js : url링크 처리 파일

+ views 폴더 : 클라이언트에서 보여주는 웹view를 담아놓은 폴더
+ public 폴더 : 서버,클라이언트에서 공용으로 사용될 css,js,image,font를 담아놓은 폴더

