import * as React from "react";
import { View, Alert, Text, Picker } from "react-native";

import {
  SearchBar,
  SegmentedControl,
  Button,
  WhiteSpace,
  Modal,
  Provider,
  List,
  TextareaItem,
} from "@ant-design/react-native";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../Fire";
const segments = {
  PUBLIC_RESOURCES: "Resources",
  MY_SERVICES: "My services",
};

export default class ResourceScreen extends React.Component {
  state = {
    value: "",
    resourceType: segments.PUBLIC_RESOURCES,
    Category: "",
    Name: "",
    Experience: "",
    location: " ",
    isResFormShow: false,
    loading: false,
    PickerValue: "",
  };
  // const = () => {
  //   [selectedValue, setSelectedValue] = useState("select the category");
  // };

  addService = () => {
    this.setState({ isResFormShow: true });
  };
  onChange = (value, stateVal) => {
    if (stateVal === undefined) return;

    this.setState({ [stateVal]: value });
    console.log(value);
  };

  clear = () => {
    this.setState({ searchText: "" });
  };
  onClose = (cls) => {
    this.setState({ isResFormShow: false });
  };
  onSubmit = () => {
    try {
      this.setState({ ...this.state, loading: true });
      const resources = {
        category: this.state.Category,
        name: this.state.Name,
        experience: this.state.Experience,
      };
      db.collection("resources")
        .add(this.state)
        .then((data) => {
          Alert.alert("Resource sucessfully added");
          this.setState({ ...this.state, loading: false });
          this.onClose(undefined);
        })
        .catch((err) => {
          Alert.alert("Error: ", JSON.stringify(this.state));
        });
    } catch (error) {
      Alert.alert("Error Catched:", JSON.stringify(this.state));
    }
  };
  updateUser = (user) => {
    this.setState({ user: user });
  };
  // const = (value) => {
  //   value: "";
  // };

  render() {
    const {
      resourceType,
      isResFormShow,
      loading,
      PickerValue,
      setSelectedValue,
      selectedValue,
    } = this.state;
    // const { getFieldProps } = this.props.form;

    return (
      <>
        <Provider>
          <View style={{ padding: 10 }}>
            <SearchBar
              value={this.state.searchText}
              placeholder="type here"
              onSubmit={(value) => Alert.alert(value)}
              onCancel={this.clear}
              onChange={(value) => this.onChange(value, "searchText")}
              showCancelButton
              cancelText="clear"
            />
            {/* starting segments */}
            <SegmentedControl
              values={[segments.PUBLIC_RESOURCES, segments.MY_SERVICES]}
              onChange={this.onChange}
              onValueChange={(value) => this.onChange(value, "resourceType")}
            />
            {resourceType === segments.MY_SERVICES && [
              <WhiteSpace size="lg" />,
              <Button type="primary" onPress={this.addService}>
                Add service
              </Button>,
            ]}
            {/* ending segment */}
            {/* start - events list */}
            {/* <WhiteSpace size="lg" />
            <ScrollView
              style={{
                flex: 1,
                maxHeight: Math.round(
                  Dimensions.get("window").height -
                    (eventType === segments.MY_EVENTS ? 320 : 265)
                ),
              }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <List className="my-list" renderHeader={"Filtered events"}>
                {eventsList}
              </List>
            </ScrollView> */}
            {/* end of scroll */}
            {/* starting Modal */}
            <Modal
              title="Title"
              transparent
              onSubmit={(value) => Alert.alert(value)}
              onClose={this.onClose}
              maskClosable
              visible={isResFormShow}
              closable={true}
              // footer={footerButtons}
            >
              <View style={{ paddingVertical: 20 }}>
                <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="Location"
                  onChangeText={(location) => this.setState({ location })}
                  value={(value) => (this.state, value)}
                />
                <Picker
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  selectedValue={PickerValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ PickerValue: itemValue })
                  }
                >
                  <Picker.Item label="select" value="" />
                  <Picker.Item label="Beginner" value="Beginner" />
                  <Picker.Item label="Intermediate" value="Intermediate" />
                  <Picker.Item label="Proffessional" value="Proffessional" />
                </Picker>
                {/* <List renderHeader={() => "Count"}>
                  <TextareaItem
                    {...getFieldProps("discrption", {
                      initialValue: "",
                    })}
                    rows={5}
                    count={100}
                  />
                </List> */}

                {/* <Picker
                  setSelectedValue={this.state.user}
                  onValueChange={this.updateUser}
                >
                  <Picker.Item label="Steve" value="steve" />
                  <Picker.Item label="Ellen" value="ellen" />
                  <Picker.Item label="Maria" value="maria" />
                </Picker>
                <Text>{this.state.user}</Text> */}

                {/* <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="title"
                  onChangeText={(Title) => this.setState({ Title })}
                  value={this.state.name}
                />
                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="experience"
                  onChangeText={(Experience) => this.setState({ Experience })}
                  value={this.state.Experience}
                /> */}
                {/* <List renderHeader={() => "Count"}>
                  <TextareaItem
                    {...getFieldProps("count", {
                      initialValue: "计数功能,我的意见是...",
                    })}
                    rows={5}
                    count={100}
                  />
                </List> */}
              </View>
              <Button type="primary" onPress={this.onSubmit} disabled={loading}>
                Submitt
              </Button>
              <WhiteSpace />
              <Button type="primary" onPress={this.onClose}>
                Close
              </Button>
            </Modal>
          </View>
        </Provider>
      </>
    );
  }
}
