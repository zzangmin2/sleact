import React, { useState, useCallback } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header, Error } from '@pages/SignUp/styles';
import axios from "axios";
import useInput from "@hooks/useinput";

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, ,setPassword] = useInput('');
  const [passwordCheck, ,setPasswordCheck] = useInput('');
  const [missmatchError, setMissmatchError] = useState(false);

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
      }
    },
    [email, nickname, password, passwordCheck, missmatchError],
  );

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
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>이미 회원이신가요?&nbsp;</LinkContainer>
    </div>
  );
};

export default SignUp;
