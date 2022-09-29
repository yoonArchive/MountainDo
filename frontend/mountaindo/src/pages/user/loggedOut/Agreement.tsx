import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import AgreementModal1 from '../../../components/user/AgreementModal1';
import AgreementModal2 from '../../../components/user/AgreementModal2';
import AgreementModal3 from '../../../components/user/AgreementModal3';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../AppInner';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import {faSquare} from '@fortawesome/free-regular-svg-icons';

type AgreementScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Agreement'
>;

function Agreement({navigation}: AgreementScreenProps) {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelectedAll, setSelectionAll] = useState(false);

  const checkBox = [{id: 0}, {id: 1}, {id: 2}];
  const [checkItems, setCheckItems] = useState<number[]>([]); // 체크된 아이템을 담을 배열
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);

  const canGoNext = isSelected1 && isSelected2 && isSelected3 && isSelectedAll;

  // 체크박스 단일 선택
  const singleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
      if (id === 0) {
        setSelection1(checked);
      } else if (id === 1) {
        setSelection2(checked);
      } else {
        setSelection3(checked);
      }
      if (checkItems.length === 2) {
        setSelectionAll(checked);
      }
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
      if (id === 0) {
        setSelection1(checked);
      } else if (id === 1) {
        setSelection2(checked);
      } else {
        setSelection3(checked);
      }
      if (checkItems.length < 4) {
        setSelectionAll(checked);
      }
    }
  };

  // 체크박스 전체 선택
  const allCheck = (checked: boolean) => {
    if (checked) {
      const idArray: number[] | ((prevState: never[]) => never[]) = [];
      checkBox.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
      setSelection1(checked);
      setSelection2(checked);
      setSelection3(checked);
      setSelectionAll(checked);
    } else {
      setCheckItems([]);
      setSelection1(checked);
      setSelection2(checked);
      setSelection3(checked);
      setSelectionAll(checked);
    }
  };

  useEffect(() => {}, [isSelected1, isSelected2, isSelected3]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>MountainDo</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>마운틴두 이용약관 동의</Text>
          <Text style={styles.subTitleText}>
            서비스의 이용을 위하여 필수 약관 동의가 필요합니다.
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal1(true)}>
            <Text style={styles.agreementText}>(필수) 서비스 이용약관</Text>
            {isSelected1 ? (
              <Pressable onPress={() => singleCheck(false, 0)}>
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  style={styles.iconSquareCheck}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => singleCheck(true, 0)}>
                <FontAwesomeIcon icon={faSquare} style={styles.iconSquare} />
              </Pressable>
            )}
          </Pressable>
          {visibleModal1 && (
            <AgreementModal1
              setVisibleModal1={setVisibleModal1}
              visibleModal1={visibleModal1}
              singleCheck={singleCheck}
              isSelected1={isSelected1}
            />
          )}
        </View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal2(true)}>
            <Text style={styles.agreementText}>
              (필수) 개인정보 수집 및 목적
            </Text>
            {isSelected2 ? (
              <Pressable onPress={() => singleCheck(false, 1)}>
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  style={styles.iconSquareCheck}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => singleCheck(true, 1)}>
                <FontAwesomeIcon icon={faSquare} style={styles.iconSquare} />
              </Pressable>
            )}
          </Pressable>
          {visibleModal2 && (
            <AgreementModal2
              setVisibleModal2={setVisibleModal2}
              visibleModal2={visibleModal2}
              singleCheck={singleCheck}
              isSelected2={isSelected2}
            />
          )}
        </View>
        <View>
          <Pressable
            style={styles.agreeList}
            onPress={() => setVisibleModal3(true)}>
            <Text style={styles.agreementText}>
              (필수) 위치기반 서비스 이용약관
            </Text>
            {isSelected3 ? (
              <Pressable onPress={() => singleCheck(false, 2)}>
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  style={styles.iconSquareCheck}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => singleCheck(true, 2)}>
                <FontAwesomeIcon icon={faSquare} style={styles.iconSquare} />
              </Pressable>
            )}
          </Pressable>
          {visibleModal3 && (
            <AgreementModal3
              setVisibleModal3={setVisibleModal3}
              visibleModal3={visibleModal3}
              singleCheck={singleCheck}
              isSelected3={isSelected3}
            />
          )}
        </View>
        <View style={styles.line}>
          <View style={styles.innerLine} />
        </View>
      </View>
      <View style={styles.agreeAll}>
        {isSelectedAll ? (
          <Pressable onPress={() => allCheck(false)}>
            <FontAwesomeIcon
              icon={faSquareCheck}
              style={styles.iconSquareCheck}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => allCheck(true)}>
            <FontAwesomeIcon icon={faSquare} style={styles.iconSquare} />
          </Pressable>
        )}
        <Text style={styles.agreeAllText}>모두 동의합니다.</Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={canGoNext ? styles.startButtonActive : styles.startButton}
          disabled={!canGoNext}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.startButtonText}>시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 40,
  },
  title: {
    marginTop: 40,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#57d696',
  },
  subTitle: {
    marginBottom: 30,
    color: 'black',
  },
  subTitleText: {
    color: 'black',
    fontSize: 12,
  },
  agreeList: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agreementText: {
    color: 'black',
  },
  line: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#c5c5c5',
  },
  agreeAll: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  agreeAllText: {
    marginTop: 6,
    marginHorizontal: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonZone: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 120,
  },
  startButton: {
    backgroundColor: '#c5c5c5',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 50,
  },
  startButtonText: {
    color: 'white',
  },
  startButtonActive: {
    backgroundColor: '#57d696',
    borderRadius: 30,
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 50,
  },
  iconSquare: {
    color: '#c5c5c5',
    marginTop: 7,
  },
  iconSquareCheck: {
    color: '#57d696',
    marginTop: 7,
  },
});

export default Agreement;
