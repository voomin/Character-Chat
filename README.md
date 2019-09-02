# Character-Chat
캐릭터 채팅 사이트

시연영상 링크
https://youtu.be/pi_vbCU87cI

사용기술
Node js, express js, pug

작동원리 
Node서버에서 실시간 웹소켓통신 기능을 이용해 
클라이언트들의 정보를 주고 받을 수 있도록 한다.
부드럽게 작동되는 UX를 제공하기 위해 클라이언트에서 캐릭터들의 움직임들을 처리한다.

처리방식은 thread가 0.01초 단위로 작동하면서 키보드 이벤트로 인해 발생되는 자신의 캐릭터 방향정보를 수신대기 한다.
각 클라인트별 사용자들은 키보드 조작하면 방향이 입력되고 그 방향으로 캐릭터들이 움직이게 된다.
이 처리방식(알고리즘)이 제일 부드럽게 보여주는 형태를 띄었고 이 방식을 토대로 소켓통신과 결합하여 온라인으로 연출할 수 있게 되었다.

파일정보
server.js : 서버의 메인파일
socket.js : 클라이언트간 소켓통신할때 처리되는 파일
things.js : url링크 처리 파일

views 폴더 : 클라이언트에서 보여주는 웹view를 담아놓은 폴더
public 폴더 : 서버,클라이언트에서 공용으로 사용될 css,js,image,font를 담아놓은 폴더

