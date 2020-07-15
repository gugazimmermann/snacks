import { Auth } from 'aws-amplify';

export const currentUserInfo = () => Auth.currentUserInfo();

export const signIn = (e, p) => Auth.signIn(e, p);

export const signUp = (e, p, n) => Auth.signUp({
  username: e, p, attributes: { e, given_name: n },
});

export const confirmSignUp = (e, c) => Auth.confirmSignUp(e, c);

export const resendSignUp = (e) => Auth.resendSignUp(e);

export const forgotPassword = (e) => Auth.forgotPassword(e);

export const forgotPasswordSubmit = (e, c, p) => Auth.forgotPasswordSubmit(e, c, p);
