import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Row } from "../../../components/utility/row.component";
import {
  CloseButton,
  Input,
  SmallTitle,
  Title,
} from "../../community/screens/add-post.screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddModuleButton = ({ onPress, colors }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 10,
        height: 50,
        margin: 10,
        marginHorizontal: 40,
        backgroundColor: colors.bg.secondary,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text
        variant="titleInverse"
        style={{
          fontSize: 26,
        }}
      >
        +{" "}
      </Text>
    </TouchableOpacity>
  );
};

export const AddPlanScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [due, setDue] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  const [planCount, setPlanCount] = useState(0);
  const [modules, setModules] = useState([]);

  const onFinish = () => {
    // addplan in firebase
    //drop this window
    navigation.goBack();
  };

  const onNext = () => {
    if (title && subject) {
      setPage(page + 1);
    }
  };

  const onAddModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        title: "",
        note: "",
        key: modules.length + 1 + title + subject,
      },
    ]);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <>
          {page == 0 ? (
            <View
              style={{
                flex: 1,
              }}
            >
              {/* add plan text */}
              <Row>
                <Title>Add plan </Title>
                <CloseButton onPress={() => navigation.goBack()}>
                  <Title>{"X "}</Title>
                </CloseButton>
              </Row>
              {/* inputs */}
              <View
                style={{
                  backgroundColor: theme.colors.bg.secondary,
                  borderRadius: 20,
                  margin: 10,
                  padding: 12,
                }}
              >
                <Spacer />
                <SmallTitle style={{ margin: 10 }}>Title:</SmallTitle>
                <Input
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  placeholder="Probability"
                />
                <Spacer />
                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "strech",
                  }}
                >
                  <SmallTitle style={{ margin: 10 }}>Test Date: </SmallTitle>
                  <Row
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      marginRight: 10,
                    }}
                  >
                    {show ? (
                      <View
                        style={{
                          flex: 1,
                          paddingRight: 10,
                        }}
                      >
                        <DateTimePicker
                          value={date}
                          mode={"date"}
                          themeVariant="dark"
                          is24Hour={true}
                          style={{ paddingLeft: 10 }}
                          onChange={onChange}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={showDatepicker}
                        style={{
                          borderRadius: 10,
                          backgroundColor: theme.colors.bg.tertiary,
                          padding: 10,
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: theme.colors.text.inverse,
                          }}
                        >
                          select
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        backgroundColor: theme.colors.bg.tertiary,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setDue(false);
                        setShow(false);
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        none
                      </Text>
                    </TouchableOpacity>
                  </Row>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <SmallTitle
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    Subject:{" "}
                  </SmallTitle>
                  <Input
                    onChangeText={(text) => setSubject(text)}
                    value={subject}
                    style={{
                      width: 100,
                    }}
                    placeholder={"Math"}
                  />
                </Row>
              </View>
              {/* next button */}
              <Row
                style={{
                  marginTop: "auto",
                  marginBottom: insets.bottom + 20,
                }}
              >
                <TouchableOpacity
                  onPress={onNext}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                    marginLeft: "auto",
                    backgroundColor:
                      title && subject
                        ? theme.colors.bg.inverse
                        : theme.colors.bg.tertiary,
                  }}
                >
                  <Text
                    variant="labelTitle"
                    style={{
                      color: theme.colors.text.inverse,
                    }}
                  >
                    next{" "}
                  </Text>
                </TouchableOpacity>
              </Row>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            >
              <Row>
                <Title>Add modules </Title>
                <CloseButton onPress={() => navigation.goBack()}>
                  <Title>{"X "}</Title>
                </CloseButton>
              </Row>
              <View>
                <FlatList
                  data={modules}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          backgroundColor: theme.colors.bg.secondary,
                          borderRadius: 20,
                          margin: 10,
                          padding: 12,
                        }}
                      >
                        <Spacer />
                        <SmallTitle style={{ margin: 10 }}>Title:</SmallTitle>
                        <Input
                          onChangeText={(text) => (item.title = text)}
                          value={item.title}
                          placeholder="Probability"
                        />
                        <Spacer />
                        <SmallTitle style={{ margin: 10 }}>Note: </SmallTitle>
                        <Input
                          onChangeText={(text) => (item.note = text)}
                          value={item.note}
                          placeholder="Probability"
                        />
                      </View>
                    );
                  }}
                />
                {/* add button */}
                <AddModuleButton onPress={onAddModule} colors={theme.colors} />
              </View>

              <Row
                style={{
                  marginTop: "auto",
                  marginBottom: insets.bottom + 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPage(0);
                  }}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                    marginLeft: 10,
                    backgroundColor: theme.colors.bg.inverse,
                  }}
                >
                  <Text variant="labelTitle">back </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onFinish}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                    marginLeft: "auto",
                    backgroundColor: theme.colors.bg.inverse,
                  }}
                >
                  <Text variant="labelTitle">finish </Text>
                </TouchableOpacity>
              </Row>
            </View>
          )}
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
