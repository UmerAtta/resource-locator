import * as React from 'react';
import { StyleSheet, TextInput, View, Alert, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', phoneNumber: '' };
    }

    Signup = () => {
        Alert.alert('Signup Credentials', JSON.stringify(this.state))
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{ padding: 10 }}>
                    <TextInput
                        style={{ height: 40 }}
                        placeholder="someone@example.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 40 }}
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 40 }}
                        placeholder="Phone Number"
                        onChangeText={phoneNumber => this.setState({ phoneNumber })}
                        value={this.state.phoneNumber}
                    />
                    <Button
                        title="Signup"
                        color="#fed03d"
                        onPress={this.Signup}
                    />

                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});
