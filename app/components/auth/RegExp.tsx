const PasswordRegx = (props: string) => {
  //8~16자 영문 대 소문자, 숫자, 특수문자를 사용
  const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  return regx.test(props);
};

export default PasswordRegx;
