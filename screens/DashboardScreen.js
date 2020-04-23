import * as React from 'react';
import {
    List,
    WingBlank,
    WhiteSpace,
    Card
} from '@ant-design/react-native';
const Item = List.Item;
export default class DashboardScreen extends React.Component {
    render() {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title="This is title"
                    // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    // extra={<span>this is extra</span>}
                    />
                    <Card.Body>
                        <List className="my-list">
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">Title</Item>
                        </List>
                    </Card.Body>


                    <Card.Footer content="rgtr" extra="dsjf" />
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        )
    }
}
