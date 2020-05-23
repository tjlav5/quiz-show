import * as React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useAuth, useUser } from "reactfire";
import * as firebase from "firebase/app";
import styled from "@emotion/styled";

import { Input } from "./components/Input";
import { Button } from "./components/Button";

export const Login: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const user = useUser();

  const { from }: any = location.state || { from: { pathname: "/" } };

  const [confirmationResult, setConfirmationResult] = React.useState<
    firebase.auth.ConfirmationResult
  >();

  if (user) {
    return <Redirect to={from} />;
  }

  if (confirmationResult) {
    return <Step2 confirmationResult={confirmationResult} />;
  }

  return (
    <Step1
      onSuccess={f => setConfirmationResult(f)}
      onError={e => console.log(e)}
    />
  );
};

const Step1: React.FC<{
  onSuccess: (foo: any) => void;
  onError: (error: Error) => void;
}> = ({ onSuccess, onError }) => {
  const auth = useAuth();
  const phoneNumber = React.useRef<HTMLInputElement | null>(null);

  const recaptchaVerifier = React.useRef<firebase.auth.RecaptchaVerifier>();

  React.useEffect(() => {
    recaptchaVerifier.current = new firebase.auth.RecaptchaVerifier(
      "request-verification",
      {
        size: "invisible"
      }
    );
  }, []);

  return (
    <div>
      <Input type="tel" ref={phoneNumber} placeholder="Phone number" />
      <Button
        id="request-verification"
        onClick={() => {
          auth
            .signInWithPhoneNumber(`+1${phoneNumber.current!.value}`, recaptchaVerifier.current!)
            .then(confirmationResult => {
              onSuccess(confirmationResult);
            })
            .catch(e => onError(e));
        }}
      >
        request
      </Button>
    </div>
  );
};

const Step2: React.FC<{confirmationResult: firebase.auth.ConfirmationResult}> = ({confirmationResult}) => {
  const confirmationCode = React.useRef<HTMLInputElement | null>(null);

  return ( 
    <div>
      <Input ref={confirmationCode} type="number" placeholder="Confirmation code"/>
      <Button onClick={() => {
        confirmationResult.confirm(confirmationCode?.current?.value!);
      }}>
        Login
      </Button>
    </div>
  );
};