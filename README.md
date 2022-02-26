# React Form

아... 그동안 너무 공부가 소홀하지 않았나..

## Controlled vs Uncontrolled

- Controlled Form : 입력한 값을 상태값(state)으로 관리하는 방식. 입력과 함께 state값이 바뀌면서 재랜더링을 유발해 성능이 좋지 않다.
- Uncontrolled Form : 입력한 값을 상태값이 아니고 element의 값으로 관리하는 방식. 필요할때 value에 접근하여 값을 가져온다.
  - imperativeHandle등을 사용해서 필요한 시점에 ref의 value로 접근할 수 있다.
  - 만약에 onChange에서, 값이 변경될때마다 실행해야하는 로직이나 밸리데이션이 있다면? : uncontrolled만으로는 하기 어려운 지점이 있음

## 입력과 관계된 주요 인풋 태그와 속성들

### input

이게 type에 맞게 필요한 요소들이 있어서 되게 복잡해진다  
약간 나눠지면 좋을듯...

- type : 생각보다 엄청 다양하다..
  - button : value를 레이블로 사용하는 푸시 버튼
  - checkBox : 단일 값을 선택하거나 선택 해제할 수 있는 체크박스
  - color : 컬러픽커(html5)
  - date : 데이트피커(html5)
  - file: 파일 컨트롤
  - email : 유효성 매개변수 존재하는 email 인풋
  - text : 기본 텍스트인풋
  - radio : 같은 name값을 가진 여러개의 선택지중에 하나의 값을 선택
- disabled: 비활성화
- checked : 커맨드나 컨트롤이 체크되었는지 여부
- form : 컨트롤을 양식 요소와 연결
- max : 뉴머릭일때 최대값
- min : 뉴머릭일때 최소값
- maxLength, minLength : 텍스트일때 길이의 최대값, 최소값
- name : input양식 컨트롤의 이름. 이름/값 짝의 일부로서 양식과 함께 전송
  - 유형이 같은 폼이면 name을 통일시키는게 맞겠구만
- value : 양식 컨트롤의 현재 값.
- required : 필요한 값. 이 입력란을 작성하세요 이런거 뜸
- title : label을 제공할 수 없을 때 사용가능. 스크린리더가 읽는 정보이기도 함

### label

- label을 input과 연결시키면 웹 접근성 측면에서 좋고, label을 클릭해 input 자체에 초점을 맞추거나 활성화시킬 수 잇음 -> 약간 한 요소처럼 움직이는 경향이 생김
- input의 id속성과 label의 for 속성을 연결함

### select

### form

정보를 제출하기 위한 대화형 컨트롤을 포함하는 문서 구획

- autocomplete: 브라우저의 자동완성 기능을 끄거나 킬 수 있는 속성
- submit이벤트 : form내부의 type=submit 버튼 등을 누를때 발생

### fieldSet

웹 양식의 여러 컨트롤과 레이블을 묶을 때 사용

- legend요소로 그룹의 설명을 제공할 수 있음
- form내부의 인풋 구획들 나눌때 사용
- form : form의 id를 받아서 form의 부분임을 나타낸다

## uncontrolled form 만들며 느낀점

- 너무 복잡한 로직을 `useInput`과 같은 큰 로직으로 분리해 붙이는 것 보다는 기능단위를 좀더 잘게 나눌 필요가 있는 듯 하다. 그동안 너무 큰 로직으로만 훅 분리하려고 했던 것 같다..
- ref를 UI에 다는 것 자체는 거의 피할 수 없는 것 같다.(특히 defaultValue, defaultCheck처럼 처음부터 UI를 만들어놓고 가야하는 경우는 더욱더) 인풋 태그가 여러개 존재하는 그런 상황도 있으니 피해보려고 발악해봤는데 잘 안되었다,, 그래도 상태값을 UI에 유지시키는 방법으로, 나중에 imperativeHandle같은걸로 적절히 가공해서 올려보내면 된다.
- ref를 여러개 붙이고 싶을때는(input checkbox가 여러개 있다거나) 배열로 ref를 만든다음에 함수로 붙여주면 된다(`ref={el => ref[0] = el}`)
- onChangeValidation의 경우 필요한 부분만 적용하면 되는거 같다.
- 그리고 훅을 좀더 잘게 유지할 필요가 있는 것 같음. 왠만한 부분은 자식 컴포넌트에서 구현 가능하게 만들고싶다
- form을 잘게 나누는게 항상 힘들어서 고민이었는데, imperativeHandle이 꽤 유용하다. 단방향 데이터 바인딩을 violate하는..? 느낌이긴 하지만 잘 활용하면 컴포넌트의 복잡성을 꽤 많이 줄일 수 있을듯 하다.

### 인사이트

### useRef와 current

어 이거 진짜 생각해보면 별거 아닌데, 회사 다닐때 가끔 useRef를 이렇게 사용한 적이 있었다. current에 접근하기 귀찮은게 이유였는데

```js
const someRef = useRef('').current;
console.log(someRef);
```

값 넣고 참조할때만 이렇게 사용하면 별 문제가 안 될 수 있다. 그런데 이렇게해버리면 만약에 current안에 있는 값이 불변형일 경우, current를 뽑아서 변수를 만들었기 때문에 자연히 깊은복사가 된다. 그래서...

```js
let someRef = useRef('').current;
someRef = 'ddd'; // ref.current는 안바뀜
```

나중에 값을 바꾸려고 하거나, 바뀐 값에 접근하려고 할때 안 된다.

문득 ref는 왜 객체 안의 current로 값을 제공할까 싶은 생각이 들었는데, 옛날에 정리한거 보니까 `useRef는 current프로퍼티에 변경 가능한 값을 갖고 있는 상자와 같다`라는 식의 설명을 봤다.

ref는 일반적인 자바스크립트 객체라서 메모리 heap영역에 저장된다. 그래서 앱의 전 생애주기에서 살아있다. 어플리케이션이 종료되거나 GC될때까지 참조할때마다 메모리의 주소는 같다. 같은 메모리 주소를 가지므로 ===가 항상 true고 값이 바뀌어도 리렌더링 되지 않는다. 리렌더링때 상태값은 레퍼런스 비교를 하기 때문에!

### useImperativeHandle

forwardRef를 사용해 ref를 사용하는 부모 측에서 커스터마이징된 메서드를 사용할 수 있게 해주는... 메모리를 매개로 React의 단방향 데이터 흐름을 역행하게 해주는 기본 훅이다.

첫번째 인자로는 프로퍼티를 부여할 ref, 두번째 인자는 객체를 리턴하는 함수로, 이 객체에 추가하고 싶은 프로퍼티를 정의하면 된다. 마지막 인자로는 의존성 배열을 받는다. 의존성 배열이 바뀔대마다 ref의 값이 달라지는 그런 느낌일테다.

그런데 당연하게도 ref 값 자체를 ref로 올려보낼때는, ref 특성상 의존성 배열에 넣은들 watching이 안 된다.

```jsx
useImperativeHandle(
  ref,
  () => ({
    values: {
      password: passwordRef.current?.value as string,
      passwordConfirm: passwordConfirmRef.current?.value as string,
    },
    errors: {
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    }
  }),
  [passwordRef, passwordError, passwordConfirmRef, passwordConfirmError], // 어짜피 이것들 레퍼런스는 똑같으므로 의존성배열에 넣어봤자 달라졌다는 판단을 못함
);
```

이런 경우에는 getter을 활용하여 ref에 접근하려고 할 때에 getter함수를 호출해 그때의 값을 캡처링하는 방식으로 진행할 수 있다.

```jsx
useImperativeHandle(
  ref,
  () => ({
    get values() {
      return {
        password: passwordRef.current?.value as string,
        passwordConfirm: passwordConfirmRef.current?.value as string,
      };
    },
    get errors() {
      return {
        password: passwordError,
        passwordConfirm: passwordConfirmError,
      };
    },
  }),
  [],
);
```

### 참고) 객체 접근자

동적으로 계산한 값을 반환하는 속성이 필요하거나, 명시적인 함수 호출 없이도 객체의 내부 변수 상태를 반영하는 값을 나타내고 싶은 경우가 있음. 그때 쓰는게 getter이고, getter자체는 함수라서 값을 반환할때 특정 연산이나 특정 값을 캡쳐해서 리턴하는 방식으로 값을 내놓음

접근자는 값이 실제로 필요한 상황이 오기 전까지 계산 비용을 미루는 것이다. 사용하지 않으면 비용을 지불할 일도 없다. 속성 값의 계산을 느긋하게 만들거나 미루고, 추가 접근에 사용할 수 있도록 캐시에 저장하는 추가 최적화 기법을 메모이제이션 접근자라고 한다.

## react-hook-form

### Text input

### Radio, Checkbox input

### Select Input

### validation, error, errorMessage

### watch, 값이 입력됨과 동시에 validation

### submit과 특정 동작

## reference

- https://so-so.dev/react/form-handling/
