export interface ISignUpPresenter {
  onSignUpSubmit: (data) => void;
  signUpLoading: boolean;
  onSignGoogle: () => void;
}
