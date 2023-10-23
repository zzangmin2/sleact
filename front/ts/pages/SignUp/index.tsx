import React, {useState, useCallback, Suspense} from 'react';
import { Success, Form, Label, Input, LinkContainer, Button, Header, Error } from '@pages/SignUp/styles';
import axios from "axios";
import useInput from "@hooks/useInput";
import {Link, Redirect} from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const SignUp = () => {
    const {data,error,mutate} = useSWR('http://localhost:3095/api/users',fetcher);
    const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, ,setPassword] = useInput('');
  const [passwordCheck, ,setPasswordCheck] = useInput('');
  const [missmatchError, setMissmatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //console.log(email, nickname, password, passwordCheck);
      if (!missmatchError) {
        console.log('서버로 회원가입하기');
        //비동기 요청의 단계
        // 로딩
        setSignUpError('');
        setSignUpSuccess(false);
        axios.post('/api/users ',{
            email,
            nickname,
            password,
        })
            //성공
            .then((response)=>{console.log(response); setSignUpSuccess(true)})
            //실패
            .catch((error)=>{console.log(error.response); setSignUpError(error.response.data);})
            .finally(()=>{});
      }
    },
    [email, nickname, password, passwordCheck, missmatchError],
  );

    if(data === undefined){
        return <div>로딩중 ...</div>
    }

  if(data){
      return <Redirect to="/workspace/channel"/>
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {missmatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해 주세요</Error>}
            {signUpError && <Error>{signUpError}</Error>}
            {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요!</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <Link to="/login">이미 회원이신가요?&nbsp;</Link>
    </div>
  );
};

export default SignUp;
