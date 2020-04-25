import * as React from "react"
import { Alert, ScrollView, Dimensions } from 'react-native';
import {
    SegmentedControl,
    WhiteSpace,
    SearchBar,
    Button,
    View,
    List
} from '@ant-design/react-native';

const Item = List.Item

const segments = {
    PUBLIC_EVENTS: 'Public Events',
    MY_EVENTS: 'My Events'
}

export default class EventScreen extends React.Component {
    state = {
        searchText: '',
        eventType: segments.PUBLIC_EVENTS
    }

    clear = () => {
        this.setState({
            searchText: ''
        })
    }

    onChange = (value, stateVar) => {
        if (stateVar === undefined) return

        this.setState({ [stateVar]: value })
    }

    addEvent = (evt) => {
        console.log(this.state);
    }

    render() {
        const { searchText, eventType } = this.state

        return (
            <>
                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10 }}>
                    <SearchBar
                        value={searchText}
                        placeholder="Search events"
                        onSubmit={value => Alert.alert(value)}
                        onCancel={this.clear}
                        onChange={(value) => this.onChange(value, 'searchText')}
                        showCancelButton
                        cancelText="Clear"
                        style={{ height: 40 }}
                    />
                    <WhiteSpace size="lg" />
                    <SegmentedControl
                        values={[segments.PUBLIC_EVENTS, segments.MY_EVENTS]}
                        onChange={this.onChange}
                        onValueChange={(value) => this.onChange(value, 'eventType')}
                        style={{ height: 40 }}
                    />
                    {/* start - my events page */}
                    {
                        eventType === segments.MY_EVENTS && [
                            <WhiteSpace size="lg" />, <Button type="primary" style={{ height: 40 }} onPress={this.addEvent}>Add Event</Button>
                        ]
                    }
                    {/* end - my events page */}
                    {/* start - events list */}
                    <WhiteSpace size="lg" />
                    <ScrollView
                        style={{
                            flex: 1,
                            maxHeight: Math.round(Dimensions.get('window').height -
                                (eventType === segments.MY_EVENTS ? 320 : 265))
                        }}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <List className="my-list" renderHeader={'Filtered events'}>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" wrap>Title</Item>
                        </List>
                    </ScrollView>
                    {/* end - events list */}
                    {/* start - event details modal */}

                    {/* end - event details modal */}

                </View>
            </>
        )
    };
}