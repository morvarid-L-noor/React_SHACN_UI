// Sign In Response Types
export type TSignInResponse =
  | {
      success: true;
      response: Response;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

interface Response {
  token: string;
  expiry: number;
  user: User;
  refreshToken: string;
  refreshExpiry: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  verified: boolean;
  verification: string;
}

// Sign Up Response Types
export type TSignUpResponse = {
  success: true;
  response: User;
};

export type TVerifyOTPResponse =
  | {
      success: true;
      response: Message;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

interface Message {
  message: string;
}

export type TForgotPasswordResponse =
  | {
      success: true;
      response: ForgotPassword;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

interface ForgotPassword {
  msg: string;
  email: string;
  verification: string;
}

export type TChangePasswordResponse =
  | {
      success: true;
      response: action;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

export type TResetPasswordResponse =
  | {
      success: true;
      response: action;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

interface action {
  msg: string;
  moreInfo: string;
}

export type TResendOTPResponse =
  | {
      success: true;
      response: ResendOTP;
    }
  | {
      success: false;
      moreInfo: string;
      msg: string;
    };

interface ResendOTP {
  message: string;
}
