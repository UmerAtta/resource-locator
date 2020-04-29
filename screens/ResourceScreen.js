import * as React from "react";
import { View, Alert } from "react-native";
import {
  SearchBar,
  SegmentedControl,
  Button,
  WhiteSpace,
  Modal,
  Provider,
} from "@ant-design/react-native";
import { TextInput } from "react-native-gesture-handler";
const segments = {
  PUBLIC_RESOURCES: "Resources",
  MY_SERVICES: "My services",
};

export default class ResourceScreen extends React.Component {
  state = {
    value: "",
    resourceType: segments.PUBLIC_RESOURCES,
    Category: "",
    name: "",
    Experience: "",
    isResFormShow: false,
  };

  addService = () => {
    this.setState({ isResFormShow: true });
  };
  onChange = (value, stateVal) => {
    if (stateVal === undefined) return;

    this.setState({ [stateVal]: value });
  };
  clear = () => {
    this.setState({ searchText: "" });
  };
  onClose = (cls) => {
    this.setState({ isResFormShow: false });
  };
  onSubmit = () => {
    Alert.alert("Your information", JSON.stringify(this.state));
  };
  render() {
    const { resourceType, isResFormShow } = this.state;

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
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="ser"
                  onChangeText={(Category) => this.setState({ Category })}
                  value={this.state.Category}
                />

                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="ser"
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                />
                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="ser"
                  onChangeText={(Experience) => this.setState({ Experience })}
                  value={this.state.Experience}
                />
              </View>
              <Button type="primary" onPress={this.onSubmit}>
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
