import React, {Component} from 'react'
import SearchResults from './SearchResults'
import SearchBox from './SearchBox'
import {Row, Navbar, Grid} from 'react-bootstrap'
const axios = require('axios')

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            searchResultsKey: 0
        }
    }
    handleSubmit = query => {
        axios.get('/api/search', {
            params: {
                q: query
            }
        }).then(response => {
            this.setState({results: response.data})
        }).catch(err => {
            this.setState({error: err})
        })
    }
    render() {
        return (
            <div>
                <Navbar fixedTop inverse role="navigation">
                    <div className="container">
                        <div className="navbar-header col-lg-3 col-md-3 col-xs-3">
                            <h2>Searchy App</h2>
                        </div>
                    </div>
                </Navbar>
                <Grid>
                    <Row>
                        <SearchBox onSubmit={this.handleSubmit}/>
                        <SearchResults results={this.state.results}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default App
