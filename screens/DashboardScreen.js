import * as React from "react";
import { WhiteSpace, Card, List, Button } from "@ant-design/react-native";
import firebase, { user } from "../Fire";
const Item = List.Item;

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      Textnum1: "",
      Textnum2: "",
      Textnum3: "",
      text: "",
      bankCard: "",
      phone: "",
      password: "",
      number: "",
    };
  }

  signOut = () => {
    console.log(this.state);

    // firebase.auth().signOut();
    firebase.auth().signOut().then();
  };
  render() {
    return (
      <>
        <Button title="signOut" color="#f194ff" onPress={this.signOut}>
          Signout
        </Button>
        {/* <WingBlank size="lg"> */}
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title="This is title"
            // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            // extra={<span>this is extra</span>}
          />
          <Card.Body>
            <List className="my-list">
              <Item
                extra="extra content"
                align="top"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              >
                Title
              </Item>
            </List>
          </Card.Body>

          <Card.Footer content="rgtr" extra="dsjf" />
        </Card>
        <WhiteSpace size="lg" />
      </>
    );
  }
}
