import * as React from "react";
import {
  Alert,
  Picker,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  SegmentedControl,
  WhiteSpace,
  SearchBar,
  Modal,
  Button,
  View,
  List,
  Provider,
} from "@ant-design/react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase, { db } from "../Fire";
// import Item from "@ant-design/react-native/lib/list/ListItem";
import Colors from "../constants/Colors";
const segments = {
  PUBLIC_RESOURCES: "Resources",
  MY_SERVICES: "My services",
};
const Item = List.Item;
const Brief = Item.Brief;

let user = null;

export default class ResourceScreen extends React.Component {
  state = {
    value: "",
    resourceType: segments.PUBLIC_RESOURCES,
    resCat: "",
    resName: "",
    resExp: "",
    resLoc: " ",
    resAvailable: "",
    resDes: "",
    isResFormShow: false,
    loading: false,
    resources: [],
    searchText: "",
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
      const resource = {
        category: this.state.resCat,
        name: this.state.resName,
        experience: this.state.resExp,
        location: this.state.resLoc,
        description: this.state.resDes,
        userId: user?.uid,
      };
      db.collection("resources")
        .add(resource)
        .then(() => {
          Alert.alert("Resource sucessfully added");
          this.setState({ ...this.state, loading: false });
          this.onClose(undefined);
          this.fetchData();
        })
        .catch(() => {
          Alert.alert("Error: ", JSON.stringify(this.state));
        });
    } catch (error) {
      Alert.alert("Error Catched:", JSON.stringify(error, undefined));
    }
  };
  updateUser = (user) => {
    this.setState({ user: user });
  };
  // const = (value) => {
  //   value: "";
  // };

  componentDidMount() {
    this.fetchData();
    user = firebase.auth().currentUser;
    console.log("currentUser");
    console.log(user && "defined");
  }

  fetchData = () => {
    db.collection("resources")
      .get()
      .then((snapshot) => {
        const resources = [];
        snapshot.forEach((resource) => {
          resources.push({ ...resource.data(), id: resource?.id });
        });
        this.setState({ resources: resources.reverse() });
      });
  };
  render() {
    const {
      resourceType,
      isResFormShow,
      loading,
      resCat,
      resExp,
      resources,
    } = this.state;

    const resourcesList = resources
      ?.filter((resource) => {
        if (this.state.resourceType === segments.MY_SERVICES) {
          console.log(
            "hi resources: ",
            resource?.userId,
            user?.uid,
            user?.displayName
          );
          if (resource?.userId === user?.uid) {
            return true;
          } else return false;
        } else return true;
      })
      .filter((resource) =>
        resource.name?.includes(this.state.searchText || "")
      )
      .map((res) => {
        return (
          <Item
            key={res?.id}
            extra={res?.category || "--"}
            align="top"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            wrap
          >
            {res?.name || "--"}
            <Brief>{res?.category || "--"}</Brief>
          </Item>
        );
      });

    return (
      <>
        <Provider>
          <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10 }}>
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
              <View>
                <WhiteSpace size="lg" />
                <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="First and last name"
                  onChangeText={(resName) => this.setState({ resName })}
                  value={this.state.resName}
                />
                <WhiteSpace size="lg" />
                <Picker
                  style={styles.textAreaContainer}
                  selectedValue={resCat}
                  onValueChange={(itemValue) =>
                    this.setState({ resCat: itemValue })
                  }
                >
                  <Picker.Item label="select category" value="" />
                  <Picker.Item label="photographer" value="photographer" />
                  <Picker.Item label="Musician" value="Musician" />
                  <Picker.Item label="Developer" value="Developer" />
                  <Picker.Item label="Electrition" value="Electrition" />
                </Picker>
                <Picker
                  style={styles.textAreaContainer}
                  selectedValue={resExp}
                  onValueChange={(itemValue) =>
                    this.setState({ resExp: itemValue })
                  }
                >
                  <Picker.Item label="select your experience" value="" />
                  <Picker.Item label="Beginner" value="Beginner" />
                  <Picker.Item label="Intermediate" value="Intermediate" />
                  <Picker.Item label="Proffessional" value="Proffessional" />
                </Picker>
                {/* <WhiteSpace size="lg" />
                <TextInput
                  // style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="Location"
                  onChangeText={(resLoc) => this.setState({ resLoc })}
                  value={this.state.resLoc}
                /> */}
                <WhiteSpace size="lg" />
                <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="Location"
                  onChangeText={(resLoc) => this.setState({ resLoc })}
                  value={this.state.resLoc}
                />
                <WhiteSpace size="lg" />
                <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  placeholder="Availablity time"
                  onChangeText={(resAvailable) =>
                    this.setState({ resAvailable })
                  }
                  value={this.state.resAvailable}
                />
                <WhiteSpace size="lg" />
              </View>
              <View style={styles.textAreaContainer}>
                {/* textarea */}
                <TextInput
                  placeholder="About....."
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(resDes) => this.setState({ resDes })}
                  value={this.state.resDes}
                />
              </View>

              <WhiteSpace size="lg" />

              {/* <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n"}</Text> */}
              <Button type="primary" onPress={this.onSubmit} disabled={loading}>
                Submit
              </Button>
              <WhiteSpace size="lg" />
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
    paddingTop: 40,
    alignItems: "center",
  },
  textAreaContainer: {
    borderColor: Colors.grey20,
    borderWidth: 1,
    padding: 5,
    height: 70,
    width: 250,
  },
  textArea: {
    height: 50,
    justifyContent: "flex-start",
  },
});
