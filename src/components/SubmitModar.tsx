import { IonButton, IonInput, IonModal } from "@ionic/react";
import React, { RefObject, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface SubmitModarProps {
  modal: RefObject<HTMLIonModalElement>;
  openId: string;
  handleSubmit: () => void;
  dismiss: () => void;
}

const SubmitModar = ({
  modal,
  openId,
  handleSubmit,
  dismiss,
}: SubmitModarProps) => {
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [shouldShake, setShouldShake] = useState<boolean>(false);

  const initState = () => {
    setEmail("");
    setIsEmail(true);
    setShouldShake(false);
  };

  const checkIsEmail = (props: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(props);
  };

  return (
    <StyledIonModal ref={modal} trigger={openId}>
      <BaseDiv>
        <StyledIonInputBox $shouldShake={shouldShake}>
          <StyledIonInput
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onIonInput={(e) => {
              setEmail(e.detail.value as string);
              if (!isEmail && checkIsEmail(email)) {
                setIsEmail(true);
              }
            }}
          ></StyledIonInput>
        </StyledIonInputBox>
        {isEmail ? (
          <></>
        ) : (
          <StyledAlertText>올바른 이메일 형식이 아닙니다.</StyledAlertText>
        )}

        <BtnBox>
          <StyledIonButton
            onClick={() => {
              if (checkIsEmail(email)) {
                handleSubmit();
                initState();
                dismiss();
              } else {
                setIsEmail(false);
                setShouldShake(true);
                setTimeout(() => setShouldShake(false), 500);
              }
            }}
          >
            제출
          </StyledIonButton>
          <StyledIonButton
            onClick={() => {
              initState();
              dismiss();
            }}
          >
            취소
          </StyledIonButton>
        </BtnBox>
      </BaseDiv>
    </StyledIonModal>
  );
};

export default SubmitModar;

const StyledIonModal = styled(IonModal)`
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --border-radius: 1.5rem;
  --ion-background-color: #ffffff;
`;

const BaseDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 12rem;
  width: 15.5rem;

  border-radius: 16px;
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const StyledAlertText = styled.div`
  width: 10rem;
  text-align: right;
  font-size: 0.5rem;
  color: red;
`;

const StyledIonInputBox = styled.div<{ $shouldShake: boolean }>`
  ${(props) =>
    props?.$shouldShake &&
    css`
      animation: ${shakeAnimation} 0.5s ease;
    `}
`;

const StyledIonInput = styled(IonInput)`
  width: 10rem;
  border-radius: 1rem;
`;

const BtnBox = styled.div`
  margin-top: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10rem;
`;

const StyledIonButton = styled(IonButton)`
  --border-radius: 1rem;
`;