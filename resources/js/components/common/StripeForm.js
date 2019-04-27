import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeForm extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
    };

    update = async (e) => {
        const res = await this.props.stripe.createToken({ name: "Name" });

        this.props.changeHandler(res.token.id);
    };

    render () {
        return (
            <div className='row'>
                <div className='col-8 py-2'>
                    <CardElement />
                </div>
                <div className='col-4'>
                    <span className='btn btn-primary' onClick={this.update}>Update</span>
                </div>
            </div>
        );
    };
};

export default injectStripe(StripeForm);