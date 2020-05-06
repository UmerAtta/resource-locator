import * as React from "react";
import { Alert, ScrollView, Text, Dimensions } from "react-native";
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

import { db, user } from "../Fire";

const Item = List.Item;
const Brief = Item.Brief;

const segments = {
  PUBLIC_EVENTS: "Public Events",
  MY_EVENTS: "My Events",
};

export default class EventScreen extends React.Component {
  state = {
    searchText: "",
    eventType: segments.PUBLIC_EVENTS,
    eventName: "",
    evtCat: "",
    orgInfo: "",
    isEvtFormShow: false,
    loading: false,
    events: [],
  };

  clear = () => {
    this.setState({
      searchText: "",
    });
  };

  onChange = (value, stateVar) => {
    if (stateVar === undefined) return;

    this.setState({ [stateVar]: value });
  };

  addEvent = (evt) => {
    // console.log(this.state);
    this.setState({
      isEvtFormShow: true,
    });
  };

  onSubmit = () => {
    try {
      this.setState({ ...this.state, loading: true });
      const event = {
        name: this.state.eventName,
        category: this.state.evtCat,
        organiser: this.state.orgInfo,
      };
      db.collection("events")
        .add(event)
        .then((data) => {
          Alert.alert("Event added successfully");
          this.setState({ ...this.state, loading: false });
          this.onClose(undefined);
        })
        .catch((err) => {
          Alert.alert("Error: ", JSON.stringify(this.state));
        });
    } catch (error) {
      Alert.alert("Error Catched: ", JSON.stringify(this.state));
    }
  };

  onClose = (cls) => {
    this.setState({ isEvtFormShow: false });
  };
  componentDidMount() {
    db.collection("events")
      .get()
      .then((snapshot) => {
        const events = [];
        snapshot.forEach((event) => {
          events.push({ ...event.data(), id: event.id });
        });
        this.setState({ events: events.reverse() });
      });
    console.log("currentUser");
    console.log(user);
  }

  render() {
    const {
      searchText,
      eventType,
      isEvtFormShow,
      loading,
      events,
    } = this.state;

    const eventsList = events
      .filter((event) => event.name?.includes(this.state.searchText || ""))
      .map((evt) => {
        return (
          <Item
            key={evt.id}
            extra={evt.organiser || "--"}
            align="top"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            wrap
          >
            {evt.name || "--"}
            <Brief>{evt.category || "--"}</Brief>
          </Item>
        );
      });

    // const footerButtons = [
    //     { text: 'Cancel', onPress: () => this.onChange([value], cancel) },
    //     { text: 'Ok', onPress: () => this.onChange([value], ok) },
    // ];

    return (
      <>
        <Provider>
          <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10 }}>
            <SearchBar
              value={searchText}
              placeholder="Search events"
              onSubmit={(value) => Alert.alert(value)}
              onCancel={this.clear}
              onChange={(value) => this.onChange(value, "searchText")}
              showCancelButton
              cancelText="clear"
              style={{ height: 40 }}
            />
            <WhiteSpace size="lg" />
            <SegmentedControl
              values={[segments.PUBLIC_EVENTS, segments.MY_EVENTS]}
              onChange={this.onChange}
              onValueChange={(value) => this.onChange(value, "eventType")}
              style={{ height: 40 }}
            />
            {/* start - my events page */}
            {eventType === segments.MY_EVENTS && [
              <WhiteSpace size="lg" />,
              <Button
                type="primary"
                style={{ height: 40 }}
                onPress={this.addEvent}
              >
                Add Event
              </Button>,
            ]}
            {/* end - my events page */}
            {/* start - events list */}
            <WhiteSpace size="lg" />
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
            </ScrollView>
            {/* end - events list */}
            {/* start - event details modal */}
            <Modal
              title="Event Details"
              transparent
              onSubmit={(value) => Alert.alert(value)}
              onCancel={this.clear}
              onClose={this.onClose}
              maskClosable
              visible={isEvtFormShow}
              closable={true}
              // footer={footerButtons}
            >
              <View style={{ paddingVertical: 20 }}>
                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="Event name"
                  onChangeText={(eventName) => this.setState({ eventName })}
                  value={this.state.eventName}
                />

                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="Event category and info"
                  onChangeText={(evtCat) => this.setState({ evtCat })}
                  value={this.state.evtCat}
                />
                <TextInput
                  // secureTextEntry={true}
                  style={{ height: 40 }}
                  placeholder="Organiser info"
                  onChangeText={(orgInfo) => this.setState({ orgInfo })}
                  value={this.state.orgInfo}
                />
                {/* <Text style={{ textAlign: 'center' }}>Content...</Text> */}
              </View>
              <Button type="primary" onPress={this.onSubmit} disabled={loading}>
                Submit
              </Button>
              <WhiteSpace />
              <Button type="primary" onPress={this.onClose}>
                Close
              </Button>
            </Modal>
            {/* end - event details modal */}
          </View>
        </Provider>
      </>
    );
  }
}
