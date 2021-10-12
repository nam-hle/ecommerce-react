import { FacebookOutlined, GithubFilled, GoogleOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";

import { signInWithFacebook, signInWithGithub, signInWithGoogle } from "../../redux";

export const SocialLogin: React.FC<SocialLoginProps> = ({ isLoading }) => {
  const dispatch = useDispatch();

  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle({}));
  };

  const onSignInWithFacebook = () => {
    dispatch(signInWithFacebook({}));
  };

  const onSignInWithGithub = () => {
    dispatch(signInWithGithub({}));
  };

  return (
    <div className="auth-provider">
      <button
        className="button auth-provider-button provider-facebook"
        disabled={isLoading}
        onClick={onSignInWithFacebook}
        type="button">
        {/* <i className="fab fa-facebook" /> */}
        <FacebookOutlined />
        Continue with Facebook
      </button>
      <button
        className="button auth-provider-button provider-google"
        disabled={isLoading}
        onClick={onSignInWithGoogle}
        type="button">
        <GoogleOutlined />
        Continue with Google
      </button>
      <button
        className="button auth-provider-button provider-github"
        disabled={isLoading}
        onClick={onSignInWithGithub}
        type="button">
        <GithubFilled />
        Continue with GitHub
      </button>
    </div>
  );
};

type SocialLoginProps = {
  isLoading: boolean;
};
