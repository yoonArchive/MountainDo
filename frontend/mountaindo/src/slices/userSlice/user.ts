import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  survey1: 0,
  survey2: 0,
  survey3: 0,
  isSurveyed: false,
  isLoggedIn: false,
};

// 이메일 인증
export const emailRequest = createAsyncThunk(
  'userSlice/emailRequest',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post(`/api/v1/members/email/1`, {
        email: args.email,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 이메일 인증번호 요청
export const emailAuth = createAsyncThunk(
  'userSlice/emailAuth',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/email/2', {
        email: args.email,
        authToken: args.authToken,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

//회원정보 수정
export const userChange = createAsyncThunk(
  'userSlice/userChange',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/update', {
        name: args.user.name,
        phone: args.user.phone,
        address: {
          si: args.user.si,
          gu: args.user.gu,
          dong: args.user.dong,
          fullAddress: args.user.fullAddress,
        },
        nickname: args.user.nickname,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 프로필 이미지 변경
export const profileImageChange = createAsyncThunk(
  'userSlice/profileImageChange',
  async (args: any, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('file', args.file);
      const response = await axiosService.post(
        '/api/v1/members/update/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 회원정보 API
export const userInfo = createAsyncThunk(
  'userSlice/userInfo',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('/api/v1/members');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 로그인 API
export const login = createAsyncThunk(
  'userSlice/login',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/login', {
        email: args.email,
        password: args.password,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 이메일 중복확인하기
export const checkCertification = createAsyncThunk(
  'userSlice/checkCertification',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get('api/v1/members/email?', {
        params: {
          email: args.email,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 회원가입하기
export const signUp = createAsyncThunk(
  'userSlice/signUp',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('api/v1/members', {
        email: args.email,
        password: args.password,
        name: args.name,
        birth: args.birth,
        phone: args.phoneNumber,
        address: {
          si: args.selectedCity,
          gu: args.selectedCity2,
          dong: null,
          fullAddress: `${args.selectedCity} ${args.selectedCity2}`,
        },
        nickname: args.nickName,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 설문조사 결과 저장하기
export const survey = createAsyncThunk(
  'userSlice/survey',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/survey', {
        level: args.survey1,
        preferredMountainLocation: args.survey2,
        preferredHikingStyle: args.survey3,
        preferredHikingTime: args.survey4,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 아아디 찾기 (이메일)
export const findEmail = createAsyncThunk(
  'userSlice/findEmail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/members/email', {
        name: args.name,
        birth: args.birth,
        phone: args.phone,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 비밀번호 찾기
export const findPassword = createAsyncThunk(
  'userSlice/findPassword',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.patch('/api/v1/members/password', {
        name: args.name,
        email: args.email,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 회원탈퇴
export const signOut = createAsyncThunk(
  'userSlice/signOut',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.delete('/api/v1/members');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 비밀번호 수정(마이페이지)
export const passwordChange = createAsyncThunk(
  'userSlice/passwordChange',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.patch(
        '/api/v1/members/mypage/password',
        {
          password: args.password,
          newPassword: args.newPassword,
        },
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 닉네임 중복 확인
export const checkNickname = createAsyncThunk(
  'userSlice/checkNickname',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `api/v1/members/nickname?nickname=${args.nickname}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout(state, action) {
      state.isLoggedIn = false;
    },
    setIsSurveyed(state, action) {
      state.isSurveyed = true;
    },
    setSurvey(state, action) {
      if (action.payload.number === 1) {
        state.survey1 = action.payload.level;
      } else if (action.payload.number === 2) {
        state.survey2 = action.payload.preferredMountainLocation;
      } else if (action.payload.number === 3) {
        state.survey3 = action.payload.preferredHikingStyle;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, {payload}) => {
        console.log('Login Pending ==>', payload);
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        console.log('LoginFulfilled ==> ', payload);
        if (payload.completedSurvey === true) {
          state.isSurveyed = true;
        }
        if (payload.token) {
          state.isLoggedIn = true;
        }
      })
      .addCase(login.rejected, (state, {payload}) => {
        console.log('LoginRejected ==>', payload);
        state.isLoggedIn = false;
      })
      .addCase(userInfo.fulfilled, (state, {payload}) => {
        console.log('userInfoFulfilled ==> ', payload);
      })
      .addCase(userInfo.rejected, (state, {payload}) => {
        console.log('userInfoRejected ==>', payload);
      })
      .addCase(checkCertification.fulfilled, (state, {payload}) => {
        console.log('CheckCertification Fullfilled ==>', payload);
      })
      .addCase(checkCertification.rejected, (state, {payload}) => {
        console.log('CheckCertification Rejected ==>', payload);
      })
      .addCase(signUp.pending, (state, {payload}) => {
        console.log('SignUp Pending ==>', payload);
      })
      .addCase(signUp.fulfilled, (state, {payload}) => {
        console.log('SignUp Fulfilled ==>', payload);
        if (payload.token) {
          state.isLoggedIn = true;
        }
      })
      .addCase(signUp.rejected, (state, {payload}) => {
        console.log('SignUp Rejected ==>', payload);
      })
      .addCase(survey.fulfilled, (state, {payload}) => {
        console.log('Survey Fulfilled ==>', payload);
      })
      .addCase(survey.rejected, (state, {payload}) => {
        console.log('Survey Rejected ==>', payload);
      })
      .addCase(findEmail.fulfilled, (state, {payload}) => {
        console.log('findEmail Fulfilled ==> ', payload);
      })
      .addCase(findEmail.rejected, (state, {payload}) => {
        console.log('findEmail Rejected ==>', payload);
      })
      .addCase(findPassword.fulfilled, (state, {payload}) => {
        console.log('findPassword Fulfilled ==> ', payload);
      })
      .addCase(findPassword.rejected, (state, {payload}) => {
        console.log('findPassword Rejected ==>', payload);
      })
      .addCase(signOut.fulfilled, (state, {payload}) => {
        console.log('signOut Fulfilled ==> ', payload);
      })
      .addCase(signOut.rejected, (state, {payload}) => {
        console.log('signOut Rejected ==>', payload);
      })
      .addCase(passwordChange.fulfilled, (state, {payload}) => {
        console.log('passwordChange Fulfilled ==> ', payload);
      })
      .addCase(passwordChange.rejected, (state, {payload}) => {
        console.log('passwordChange Rejected ==>', payload);
      })
      .addCase(userChange.fulfilled, (state, {payload}) => {
        console.log('userChange Fulfilled ==> ', payload);
      })
      .addCase(userChange.rejected, (state, {payload}) => {
        console.log('userChange Rejected ==>', payload);
      })
      .addCase(emailRequest.fulfilled, (state, {payload}) => {
        console.log('emailRequest Fulfilled ==> ', payload);
      })
      .addCase(emailRequest.rejected, (state, {payload}) => {
        console.log('emailRequest Rejected ==>', payload);
      })
      .addCase(emailAuth.fulfilled, (state, {payload}) => {
        console.log('emailAuth Fulfilled ==> ', payload);
      })
      .addCase(emailAuth.rejected, (state, {payload}) => {
        console.log('emailAuth Rejected ==>', payload);
      })
      .addCase(checkNickname.fulfilled, (state, {payload}) => {
        console.log('checkNickname Fulfilled ==> ', payload);
      })
      .addCase(checkNickname.rejected, (state, {payload}) => {
        console.log('checkNickname Rejected ==>', payload);
      })
      .addCase(profileImageChange.fulfilled, (state, {payload}) => {
        console.log('profileImageChange Fulfilled ==> ', payload);
      })
      .addCase(profileImageChange.rejected, (state, {payload}) => {
        console.log('profileImageChange Rejected ==>', payload);
      });
  },
});

export default userSlice;
