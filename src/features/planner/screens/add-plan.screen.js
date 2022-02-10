import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
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

export const AddPlanScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(new Date());
  const [due, setDue] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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
          <View
            style={{
              flex: 1,
            }}
          >
            <Row>
              <Title>Add plan </Title>
              <CloseButton onPress={() => navigation.goBack()}>
                <Title>{"X "}</Title>
              </CloseButton>
            </Row>
            <View
              style={{
                backgroundColor: theme.colors.bg.secondary,
                borderRadius: 20,
                margin: 10,
                padding: 10,
              }}
            >
              <Spacer />
              <SmallTitle style={{ margin: 10 }}>Title:</SmallTitle>
              <Input onChangeText={(text) => setTitle(text)} value={title} />
              <Spacer />
              <Row style={{ alignItems: "center" }}>
                <SmallTitle style={{ margin: 10 }}>Test Date: </SmallTitle>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#8affff",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setDue(false);
                    setShow(false);
                  }}
                >
                  <Text>none</Text>
                </TouchableOpacity>
                {show ? (
                  <View style={{ flex: 1 }}>
                    <DateTimePicker
                      value={date}
                      style={{}}
                      mode={"date"}
                      themeVariant="dark"
                      is24Hour={true}
                      onChange={onChange}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#8affff",
                      padding: 10,
                      marginLeft: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>select</Text>
                  </TouchableOpacity>
                )}
              </Row>
              <Row style={{ alignItems: "center" }}>
                <SmallTitle style={{ margin: 10 }}>Subject: </SmallTitle>
                <Input
                  onChangeText={(text) => setSubject(text)}
                  value={subject}
                  placeholder={"Subject"}
                />
              </Row>
            </View>
            <View
              style={{
                backgroundColor: theme.colors.bg.secondary,
                borderRadius: 20,
                margin: 10,
                padding: 10,
              }}
            >
              <Spacer />
              <SmallTitle style={{ margin: 10 }}>Modules</SmallTitle>
              <Input
                onChangeText={(text) => setTitle(text)}
                value={title}
                placeholder="Module name"
              />
              <Spacer />
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
