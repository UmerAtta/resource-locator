import * as React from "react"
import { View } from 'react-native';
import { Tag } from '@ant-design/react-native';

export default class ResourceScreen extends React.Component {
    render() {
        return (<>
            <View style={{ padding: 10 }}>
                <Tag selected>Resource Screen</Tag>
            </View>
        </>)
    }
}