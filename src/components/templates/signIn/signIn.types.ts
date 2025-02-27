export interface ISignInPresenter {
  onSignInSubmit: (data) => void;
  onSignGoogle: () => void;
  signInLoading: boolean;
}
