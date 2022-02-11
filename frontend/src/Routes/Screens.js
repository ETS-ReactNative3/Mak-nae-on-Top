import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  TextInput,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input';
import axios from 'axios';

import bar from '../images/Bar.png';
import logo from '../images/Logo.png';
import Beacon from '../Components/Beacon/Beacons.ios.js';
import UploadBtn from '../Components/Blueprint/UploadBtn';
import UploadResponse from '../Components/Blueprint/UploadResponse';
import {AuthContext} from '../Components/SideBar';
import url from '../ServerURL/url';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  PanelBtn: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#E6E6E6',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    minWidth: '16%',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonLabel: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: '700',
    color: '#282828',
    textAlign: 'center',
  },
  padding: {
    padding: 10,
    paddingTop: 20,
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
  },
  PanelContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputView: {
    backgroundColor: '#D4D4D4',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  loginBtn: {
    minWidth: '38.5%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    marginHorizontal: '1.5%',
    height: 37,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  registerBtn: {
    backgroundColor: 'green',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AccList: {
    marginTop: 50,
    borderTopWidth: 1,
  },
  uploadBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  ResponseImage: {
    marginVertical: 24,
    alignItems: 'center',
  },
  UploadSuccessContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInfoView: {
    backgroundColor: '#D4D4D4',
    borderRadius: 30,
    height: 35,
    marginBottom: 10,
  },
});

const HomeScreen = ({locationEnabled}) => {
  // panel contents
  const windowHeight = Dimensions.get('window').height;
  const defaultProps = {
    draggableRange: {top: windowHeight - 100, bottom: 0},
  };
  const {top, bottom} = defaultProps.draggableRange;
  const [draggedValue] = React.useState(() => new Animated.Value(0));

  const closePanel = () => {
    draggedValue.setValue(0);
  };

  const handleExitBtn = () => {
    closePanel();
  };

  const handleToiletBtn = () => {
    closePanel();
  };
  const handleFireExtingiuisherBtn = () => {
    closePanel();
  };
  const handleDefibrillatorBtn = () => {
    closePanel();
  };

  const clickOnSearchBar = () => {
    draggedValue.setValue(top);
  };

  const PanelContent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (
      <>
        <View>
          <Image
            source={bar}
            style={{
              borderRadius: 10,
              tintColor: '#707070',
              marginTop: 6,
              height: 5,
              width: 50,
            }}
          />
        </View>
        <View style={styles.padding}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.PanelBtn} onPress={handleExitBtn}>
              <MaterialCommunityIcons name="exit-run" size={60} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.PanelBtn} onPress={handleToiletBtn}>
              <MaterialCommunityIcons name="human-male-female" size={60} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.PanelBtn}
              onPress={handleFireExtingiuisherBtn}>
              <FontAwesome
                name="fire-extinguisher"
                size={60}
                style={{marginLeft: 5, marginRight: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.PanelBtn}
              onPress={handleDefibrillatorBtn}>
              <FontAwesome name="heartbeat" size={60} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Type your destination"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onFocus={clickOnSearchBar}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        {locationEnabled ? (
          <Beacon />
        ) : (
          <>
            <Text style={{fontSize: 25, color: 'black'}}>
              If you want to use BFF service,
            </Text>
            <Text style={{fontSize: 25, color: 'black'}}>please agree to</Text>
            <Text style={{fontSize: 25, color: 'black', fontWeight: 'bold'}}>
              Share my location info
            </Text>
          </>
        )}
      </View>
      <Button
        color="black"
        title="🔍 Click to search"
        onPress={() => this._panel.show(220)}
      />
      <SlidingUpPanel
        snappingPoints={[220, top]}
        animatedValue={draggedValue}
        draggableRange={{top: top, bottom: bottom}}
        onBackButtonPress="true"
        containerStyle={styles.PanelContainer}
        height={windowHeight - 100}
        friction={5}
        ref={c => (this._panel = c)}>
        <PanelContent />
      </SlidingUpPanel>
    </SafeAreaView>
  );
};

const LoginScreen = ({navigation}) => {
  const {authContext, state} = React.useContext(AuthContext);

  const [account, setAccount] = React.useState({
    id: '',
    password: '',
  });

  const handleAccount = (key, value) => {
    setAccount({
      ...account,
      [key]: value,
    });
  };

  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        <View>
          <Image
            source={logo}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your ID"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={id => handleAccount('id', id)}
            placeholderTextColor="#282828"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="
            Enter your Password"
            secureTextEntry={true}
            textContentType="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={password => handleAccount('password', password)}
            placeholderTextColor="#282828"
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => authContext.login(account)}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const BlueprintScreen = () => {
  const {authContext, state} = React.useContext(AuthContext);

  const [info, setInfo] = React.useState({
    floor: '',
    uuid: '',
  });

  const handleInfo = (key, value) => {
    console.log(key, ':', value.toString());
    setInfo({
      ...info,
      [key]: value.toString(),
    });
  };

  const [response, setResponse] = React.useState(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState();

  const includeExtra = true;

  const accordionList = [
    {
      title: 'Upload Blueprint',
      iconName: 'map',
    },
    {
      title: 'Uploaded Bluprint List',
      iconName: 'list',
    },
    {
      title: 'Needs to be fixed',
      iconName: 'warning',
    },
  ];

  const actions = [
    {
      title: 'Take Blueprint',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra,
        quality: 0.1,
      },
    },
    {
      title: 'Select Blueprint',
      type: 'library',
      options: {
        // maxHeight: 200,
        // maxWidth: 300,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra,
        quality: 0.1,
      },
    },
  ];

  const actions2 = [
    {
      title: 'Upload Blueprint',
      type: 'upload',
    },
    {
      title: 'Delete Blueprint',
      type: 'delete',
    },
  ];

  const uploadBlueprint = async () => {
    await axios
      .post(
        url + 'app/manager/saveMap',
        {
          uuid: info.uuid,
          floor: info.floor,
          base64: response.assets[0].base64,
        },
        {
          headers: {
            Authorization: `Bearer ${state.userToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then(response => {
        alert(response.data.message);
        if (response.data.status === 'success') {
          setUploadSuccess(true);
          setResponse(null);
          setInfo({
            floor: null,
            uuid: '',
          });
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };

  const handleGetBlueprintBtn = React.useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, setResponse);
    }
    setUploadSuccess(false);
  }, []);

  const handleChosenBlueprintBtn = React.useCallback(type => {
    if (type === 'upload') {
      uploadBlueprint();
    } else {
      setUploadSuccess(false);
      setResponse(null);
      setInfo({
        floor: null,
        uuid: '',
      });
    }
  }, []);

  const handleAccordionClick = index => {
    activeIndex === index ? setActiveIndex(null) : setActiveIndex(index);
  };

  return (
    <SafeAreaView flex={1}>
      <View style={styles.AccList}>
        {accordionList.map((item, index) => {
          return (
            <ListItem.Accordion
              bottomDivider
              content={
                <>
                  <Icon
                    name={item.iconName}
                    size={30}
                    style={{marginRight: 20}}
                  />
                  <ListItem.Content key={item.title}>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={activeIndex === index}
              onPress={() => {
                handleAccordionClick(index);
              }}>
              {/* Upload Blueprint */}
              {index === 0 && (
                <>
                  <View style={styles.uploadBtnContainer}>
                    {actions.map(({title, type, options}) => {
                      return (
                        <UploadBtn
                          key={title}
                          onPress={() => handleGetBlueprintBtn(type, options)}>
                          {title}
                        </UploadBtn>
                      );
                    })}
                  </View>

                  {/* Json response */}
                  {/* <UploadResponse>{response}</UploadResponse> */}
                  {console.log(response)}

                  {/* Images that user choose */}
                  {response?.assets &&
                    response?.assets.map(({uri}) => (
                      // console.log(response),
                      <View key={uri} style={styles.ResponseImage}>
                        <Image
                          resizeMode="contain"
                          style={{width: 300, height: 300}}
                          source={{uri: uri}}
                        />
                      </View>
                    ))}

                  {uploadSuccess ? (
                    <View style={styles.UploadSuccessContainer}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          marginTop: 10,
                          marginBottom: 20,
                        }}>
                        Successfully Uploaded
                      </Text>
                    </View>
                  ) : (
                    []
                  )}

                  {/* Upload Btn & Delete Btn */}
                  {response && !response.didCancel && (
                    <>
                      <View style={[styles.row, {justifyContent: 'center'}]}>
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                          Select your blueprint's floor and type beacon uuid
                        </Text>
                        <NumericInput
                          value={parseInt(info.floor, 10)}
                          onChange={value => handleInfo('floor', value)}
                          totalWidth={120}
                          totalHeight={35}
                          rounded
                          iconStyle={{color: 'white'}}
                          rightButtonBackgroundColor="#4f4f4f"
                          leftButtonBackgroundColor="#a3a3a3"
                        />
                        <View style={[styles.inputInfoView, {marginLeft: 10}]}>
                          <TextInput
                            name="uuid"
                            key="uuid"
                            style={[styles.TextInput, {width: 200}]}
                            placeholder="Type beacon's uuid"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={value => handleInfo('uuid', value)}
                            placeholderTextColor="#282828"
                          />
                        </View>
                      </View>
                      <View style={styles.uploadBtnContainer}>
                        {actions2.map(({title, type}) => {
                          return (
                            <UploadBtn
                              key={title}
                              onPress={() => handleChosenBlueprintBtn(type)}>
                              {title}
                            </UploadBtn>
                          );
                        })}
                      </View>
                    </>
                  )}
                </>
              )}

              {/* Uploaded Blueprint List */}
              {index === 1 && (
                <>{/* todo : Get user's blueprint list from database */}</>
              )}

              {/* List that needs to be fixed */}
              {index === 2 && (
                <>
                  {/* todo : Get user's blueprint list that needs to be fixed from database */}
                </>
              )}
            </ListItem.Accordion>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const SignupScreen = ({navigation}) => {
  const {authContext, state} = React.useContext(AuthContext);
  const [account, setAccount] = React.useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });

  const handleAccount = (key, value) => {
    setAccount({
      ...account,
      [key]: value,
    });
  };

  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        <View>
          <Image
            source={logo}
            style={{
              height: 150,
              width: 150,
            }}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            name="name"
            style={styles.TextInput}
            placeholder="Enter your Name"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={name => handleAccount('name', name)}
            placeholderTextColor="#282828"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            name="id"
            style={styles.TextInput}
            placeholder="Enter your ID"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={id => handleAccount('id', id)}
            placeholderTextColor="#282828"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            name="password"
            style={styles.TextInput}
            placeholder="
            Enter your Password"
            secureTextEntry={true}
            textContentType="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={password => handleAccount('password', password)}
            placeholderTextColor="#282828"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            name="confirmPassword"
            style={styles.TextInput}
            placeholder="
            Confirm your Password"
            secureTextEntry={true}
            textContentType="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={confirmPassword =>
              handleAccount('confirmPassword', confirmPassword)
            }
            placeholderTextColor="#282828"
          />
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() =>
            authContext.signup(account)
              ? navigation.navigate('LoginScreen')
              : {}
          }>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export {HomeScreen, LoginScreen, BlueprintScreen, SignupScreen};
