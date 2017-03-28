import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid} from 'react-bootstrap'
import Parse from 'parse'
import Product from './product.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: "false"
        };
    }

    componentDidMount() {
        this.setState({loading: "true"});

        Parse.initialize('aware02830');
        Parse.serverURL = 'http://awareserver.herokuapp.com/parse';
        let _this = this;
        Parse.Promise.as().then(function() {
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            return query.find().then(null, function(error) {
                console.log("There was an error searching for existing users");
                return Parse.Promise.error("There was an error searching for existing users. Please Try again")
            });
        }).then(function(results) {
            _this.setState({data: results, loading: "false"});

        }, function(error) {
            _this.setState({data: [], loading: "false"});
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <Grid>
                    <h1>
                        The
                        <span className="accentText">
                            easiest
                        </span>
                        and
                        <span className="accentText">
                            safest
                        </span>
                        way to buy and sell electronics locally. Now in manhattan.
                    </h1>
                    <h3>All sellers are vetted, every product is verified by our team of experts prior to sale, and we handle pickup + delivery.</h3>
                </Grid>
                <table>
                    <tr>

                        {this.state.data.map(function(product) {
                            return (
                                <td><Product user={product}/></td>
                            );
                        })}
                    </tr>
                </table>

                <p>data: {this.state.loading}</p>
            </div>

        );
    }
}

export default App;
