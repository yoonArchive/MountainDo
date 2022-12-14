import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import Main from './src/pages/Main';
import Hiking from './src/pages/hiking/Hiking';
import Mountain from './src/pages/mountain/Mountain';
import MountainDetail from './src/pages/mountain/MountainDetail';
import Completed from './src/pages/completed/Completed';
import MyPage from './src/pages/user/loggedIn/MyPage';
import Agreement from './src/pages/user/loggedOut/Agreement';
import Welcome from './src/pages/user/loggedOut/Welcome';
import FindId from './src/pages/user/loggedOut/FindId';
import NicknameChangeForm from './src/pages/user/loggedIn/NicknameChangeForm';
import usePermissions from './src/hooks/usePermissions';
import SignIn from './src/pages/user/loggedOut/SignIn';
import FindPassword from './src/pages/user/loggedOut/FindPassword';
import Survey1 from './src/pages/user/loggedOut/Survey1';
import Survey2 from './src/pages/user/loggedOut/Survey2';
import Survey3 from './src/pages/user/loggedOut/Survey3';
import Survey4 from './src/pages/user/loggedOut/Survey4';
import PasswordChange from './src/pages/user/loggedIn/PasswordChange';
import PhoneNumberChangeForm from './src/pages/user/loggedIn/PhoneNumberChangeForm';
import UserInfoChange from './src/pages/user/loggedIn/UserInfoChange';
import SignUp from './src/pages/user/loggedOut/SignUp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Visited from './src/pages/completed/Visited';
import AddressChangeForm from './src/pages/user/loggedIn/AddressChangeForm';
import CourseDetail from './src/pages/mountain/CourseDetail';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faMountain,
  faPersonHiking,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {faFlag} from '@fortawesome/free-regular-svg-icons';
import FindMountain from './src/pages/hiking/FindMountain';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LoadingAnimationB} from './src/components/completed/LoadingAnimation';

export type LoggedInParamList = {
  Welcome: any;
  Survey1: any;
  Survey2: any;
  Survey3: any;
  Survey4: any;
  ???: any;
  Completed: any;
  ??????: any;
  ???: any;
  UserInfoChange: any;
  PasswordChange: any;
  NicknameChangeForm: any;
  PhoneNumberChangeForm: any;
  ??????: any;
  CourseDetail: any;
  ??????: any;
  AddressChangeForm: any;
  FindMountain: any;
  MountainDetail: any;
};

export type RootStackParamList = {
  SignIn: any;
  Agreement: any;
  SignUp: any;
  FindId: any;
  FindPassword: any;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Top = createMaterialTopTabNavigator();

// ????????? ?????? top tab
function TopTab() {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#D3D3D3',
        tabBarIndicatorStyle: {
          backgroundColor: '#57d696',
        },
      }}>
      <Top.Screen
        name="Completed"
        component={Completed}
        options={{title: '????????? ???'}}
      />
      <Top.Screen
        name="??????"
        component={Visited}
        options={{title: '?????? ??????'}}
      />
    </Top.Navigator>
  );
}

// ?????? ?????? bottom tab??? ???????????? ?????????
function UserTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="??????"
        component={MyPage}
        options={{title: '?????????'}}
      />
      <Stack.Screen
        name="UserInfoChange"
        component={UserInfoChange}
        options={{title: '?????? ?????? ??????'}}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{title: '???????????? ??????'}}
      />
      <Stack.Screen
        name="NicknameChangeForm"
        component={NicknameChangeForm}
        options={{title: '????????? ??????'}}
      />
      <Stack.Screen
        name="PhoneNumberChangeForm"
        component={PhoneNumberChangeForm}
        options={{title: '???????????? ??????'}}
      />
      <Stack.Screen
        name="AddressChangeForm"
        component={AddressChangeForm}
        options={{title: '?????? ??????'}}
      />
    </Stack.Navigator>
  );
}

// ??? bottom tab??? ???????????? ?????????
function MountainTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="???"
        component={Mountain}
        options={{title: '?????? ??? ??????', headerShown: false}}
      />
      <Stack.Screen
        name="MountainDetail"
        component={MountainDetail}
        options={{title: '??? ?????? ??????', headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{title: '?????? ?????? ??????', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// ??? ??? (??????, ??? ??????)
function HomeTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen name="???" component={Main} options={{headerShown: false}} />
      <Stack.Screen
        name="MountainDetail"
        component={MountainDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// ????????? ??? bottom tab??? ???????????? ?????????
function VisitedTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="Complete"
        component={TopTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function HikingTab() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="FindMountain"
        component={FindMountain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="??????"
        component={Hiking}
        options={{
          title: '??????',
          headerTitleStyle: {
            fontFamily: 'NanumBarunGothic',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // ????????? ?????? ??????
  const isSurveyed = useSelector((state: RootState) => state.user.isSurveyed); // ???????????? ?????? ??????

  // ??? ????????? ???????????? splash screen ??????
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // ?????? ????????? ????????? ???????????? ?????? ??????
  usePermissions();

  // isLoggedIn && isSurveyed??? ?????? bottom tab??? ????????? ?????? ?????????
  // isLoggedIn && !isSurveyed??? ???????????? ?????? ?????????
  // ??? ?????? ????????? ?????? ????????? ??? ?????? ????????? ?????????
  const [isTimeOut, setIsTimeOut] = useState(true);
  // ????????? ?????? ??????
  const handleStart = () => {
    setTimeout(() => {
      setIsTimeOut(false);
    }, 1000);
  };

  if (isLoggedIn) {
    handleStart();
  }

  return isLoggedIn && isSurveyed ? (
    isTimeOut ? (
      <View style={styles.loading}>
        <LoadingAnimationB />
      </View>
    ) : (
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            position: 'absolute',
          },
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
        }}
        initialRouteName="???">
        <Tab.Screen
          name="???"
          component={MountainTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faMountain}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="??????"
          component={HikingTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faPersonHiking}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: false,
          }}
        />
        <Tab.Screen
          name="???"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faHome}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="??????"
          component={VisitedTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faFlag}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="??????"
          component={UserTab}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? '#57d696' : 'black'}
              />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    )
  ) : isLoggedIn && !isSurveyed ? (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Survey1"
          component={Survey1}
          options={{title: '????????????1'}}
        />
        <Stack.Screen
          name="Survey2"
          component={Survey2}
          options={{title: '????????????2'}}
        />
        <Stack.Screen
          name="Survey3"
          component={Survey3}
          options={{title: '????????????3'}}
        />
        <Stack.Screen
          name="Survey4"
          component={Survey4}
          options={{title: '????????????4'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NanumBarunGothic',
          fontSize: 15,
        },
        headerShadowVisible: false,
      })}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: '?????????'}}
        />
        <Stack.Screen
          name="Agreement"
          component={Agreement}
          options={{title: '???????????????'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: '????????????'}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{title: '????????????'}}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="FindId"
          component={FindId}
          options={{title: '???????????????'}}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPassword}
          options={{title: '??????????????????'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 150,
    borderRadius: 50,
    overflow: 'hidden',
    left: Dimensions.get('window').width / 2 - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppInner;
