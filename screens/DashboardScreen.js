import * as React from 'react';
import {
    WhiteSpace,
    Card,
    List
} from '@ant-design/react-native';
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
            number: ""
        };
        // Create a group of form controls with default values.
        this.registerForm = FormBuilder.group(
            {
                /**
                 * `username` control with `required` and `email` sync and one async validators.
                 *`blur` property is to set the onBlur updates of control.
                 */
                username: [
                    "",
                    [Validators.required, Validators.email],
                    this.asyncValidator
                ],
                password: ["", [Validators.required, Validators.minLength(8)]],
                confirm_password: ["", Validators.required],
                /**
                 * Nested address control
                 */
                address: FormBuilder.group({
                    city: ["Bangalore", Validators.required],
                    country: ["india"]
                }),
                gender: ["male"],
                terms: [false, Validators.requiredTrue]
            },
            {
                validators: this.checkIfMatchingPasswords(
                    "password",
                    "confirm_password"
                ),
                // updateOn: "submit"
            }
        );
    }
    handleReset(e) {
        e.preventDefault();
        console.log(this.registerForm.value);
        // this.registerForm.reset();
    }

    sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    asyncValidator = control => {
        return this.sleep(1000).then(() => {
            if (
                [
                    "jon@reactive.com",
                    "hodor@reactive.com",
                    "mountain@reactive.com"
                ].includes(control.value)
            ) {
                return null;
            } else {
                throw { isExist: true };
            }
        });
    };

    checkIfMatchingPasswords = (passwordKey, passwordConfirmationKey) => {
        return group => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                passwordConfirmationInput.setErrors({ notEquivalent: true });
            } else {
                passwordConfirmationInput.setErrors(null);
            }
            return null;
        };
    };

    render() {
        return (
            <>
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
                            <Item extra="extra content" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">Title</Item>
                        </List>
                    </Card.Body>


                    <Card.Footer content="rgtr" extra="dsjf" />
                </Card>
                <WhiteSpace size="lg" />
            </>
        )
    };
}
