import React, {Component} from 'react';

class Product extends React.Component {
    render() {
        return (
            <div>
                <img className="Avatar" src={this.props.user.get('image').url()} alt={this.props.user.get('firstName')}/>
            </div>
        )
    }
}

export default Product;
