import * as React from "react"
import { Alert } from 'react-native';
import {
    SegmentedControl,
    WhiteSpace,
    SearchBar,
    Button,
    View
} from '@ant-design/react-native';

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
        return (
            <>
                <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                    <SearchBar
                        value={this.state.searchText}
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
                    <WhiteSpace size="lg" />
                    {
                        this.state.eventType === segments.MY_EVENTS && <Button type="primary" style={{ height: 40 }} onPress={this.addEvent}>Add Event</Button>
                    }
                </View>
            </>
        )
    };
}