import * as React from "react";
import { View, Alert, StyleSheet, Dimensions } from "react-native";
import {
  SearchBar,
  SegmentedControl,
  Button,
  WhiteSpace,
  Modal,
  Provider,
  List,
} from "@ant-design/react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { db, user } from "../Fire";
import Colors from "../constants/Colors";
const Item = List.Item;
const Brief = Item.Brief;

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
    availablity: "",
    isResFormShow: false,
    loading: false,
    // PickerValue: "",
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
  onClose = () => {
    this.setState({ isResFormShow: false });
  };
  onSubmit = () => {
    try {
      this.setState({ ...this.state, loading: true });
      db.collection("resources")
        .add(this.state)
        .then(() => {
          Alert.alert("Resource sucessfully added");
          this.setState({ ...this.state, loading: false });
          this.onClose(undefined);
        })
        .catch(() => {
          Alert.alert("Error: ", JSON.stringify(this.state));
        });
    } catch (error) {
      Alert.alert("Error Catched:", JSON.stringify(this.state));
    }
  };
  updateUser = (user) => {
    this.setState({ user: user });
  };
  componentDidMount() {
    db.collection("resources")
      .get()
      .then((snapshot) => {
        const resources = [];
        snapshot.forEach((event) => {
          resources.push({ ...event.data(), id: event.id });
        });
        this.setState({ resources: resources.reverse() });
      });
    console.log("currentUser");
    console.log(user);
  }

  render() {
    const {
      resourceType,
      isResFormShow,
      loading,
      resources,
      Dropdown,
    } = this.state;

    const resourcesList = resources
      ?.filter((resource) =>
        resource.name?.includes(this.state.searchText || "")
      )
      .map((res) => {
        return (
          <Item
            key={res.id}
            extra={res.category || "--"}
            align="top"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            wrap
          >
            {res.name || "--"}
            <Brief>{res.category || "--"}</Brief>
          </Item>
        );
      });
    // dropdown
    let data = [
      {
        value: "Banana",
      },
      {
        value: "Mango",
      },
      {
        value: "Pear",
      },
    ];
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
            {/* start - eresource list */}
            <WhiteSpace size="lg" />
            <ScrollView
              style={{
                flex: 1,
                maxHeight: Math.round(
                  Dimensions.get("window").height -
                    (resourceType === segments.MY_SERVICES ? 320 : 265)
                ),
              }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <List className="my-list" renderHeader={"Filtered resources"}>
                {resourcesList}
              </List>
            </ScrollView>
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
                <Dropdown label="Favorite Fruit" data={data} />

                {/* <View style={styles.container}>
                  <Picker
                    style={{ height: 50, width: 150 }}
                    selectedValue={Category}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ Category: itemValue })
                    }
                  >
                    <Picker.Item label="select category" value="" />
                    <Picker.Item label="photographer" value="photographer" />
                    <Picker.Item label="Musician" value="Musician" />
                    <Picker.Item label="Developer" value="Developer" />
                    <Picker.Item label="Electrition" value="Electrition" />
                  </Picker>
                  <WhiteSpace />
                  <Picker
                    style={{ height: 50, width: 150 }}
                    selectedValue={Experience}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ Experience: itemValue })
                    }
                  >
                    <Picker.Item label="select your experience" value="" />
                    <Picker.Item label="Beginner" value="Beginner" />
                    <Picker.Item label="Intermediate" value="Intermediate" />
                    <Picker.Item label="Proffessional" value="Proffessional" />
                  </Picker>
                </View> */}
                <WhiteSpace />

                <TextInput
                  // style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="Location"
                  onChangeText={(location) => this.setState({ location })}
                  value={(value) => (this.state, value)}
                />
              </View>
              <WhiteSpace />
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="About..."
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
              <WhiteSpace />
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
// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  textAreaContainer: {
    borderColor: Colors.grey20,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 50,
    justifyContent: "flex-start",
  },
});
