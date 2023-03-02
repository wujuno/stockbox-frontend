const PasswordRegx = (props: string) => {
  //영문 대소문자, 숫자, 특수문자 중 2가지 이상을 사용하여 8자이상
  const regx = /^(?=.*[a-z])(?=.*[A-Z0-9!@#$%^&*()_+,.?]).{8,}$/;
  return regx.test(props);
};

export default PasswordRegx;
