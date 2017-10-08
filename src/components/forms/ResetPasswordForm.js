import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'

class ResetPasswordForm extends Component{
    state= {
        data : {
            token: this.props.token,
            password: '',
            passwordConfirmation: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true});
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({
                    errors: err.response.data.errors,
                    loading: false
                }));
        }
    };

    validate = (data) => {
        const errors = {};
        if(!data.password) errors.password = "can't be blanck";
        if(data.password != data.passwordConfirmation)
            errors.password = "password must match";

        return errors;
    };


    render(){
        const { data, errors, loading } = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           name="password"
                           placeholder="your new password"
                           value={data.password}
                           onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>

                <Form.Field error={!!errors.passwordConfirmation}>
                    <label htmlFor="passwordConfirmation">Confirm your Password</label>
                    <input type="password"
                           id="passwordConfirmation"
                           name="passwordConfirmation"
                           placeholder="type it again please"
                           value={data.passwordConfirmation}
                           onChange={this.onChange}
                    />
                    {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
                </Form.Field>

                <Button primary> Forgot Password </Button>
            </Form>
        )
    }
}

ResetPasswordForm.PropTypes = {
    submit: PropTypes.func.isRequired
};

export default ResetPasswordForm