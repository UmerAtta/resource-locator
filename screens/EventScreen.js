import { Component } from "react"
import { View } from 'react-native';
import { Tag } from '@ant-design/react-native';

export default class EventScreen extends Component {
    render() {
        return (<>
            <View style={{ padding: 10 }}>
                <Tag selected>Event Screen</Tag>
            </View>
        </>)
    }
}