import React, {Component} from 'react'
import {FormControl, Button} from 'react-bootstrap'

class SearchBox extends Component {
    handleSubmit = e => {
        this.props.onSubmit(this.state.query)
        e.preventDefault()
    }
    render() {
        return (
            <form className="row" onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <FormControl id="query" autoFocus alt='Search Box' placeholder='Input' onChange={event => this.setState({query: event.target.value})}/>
                    <span className="input-group-addon">
                        <Button bsStyle="link" type="submit" style={{padding:0}} onClick={this.submit}><i className="glyphicon glyphicon-search"></i></Button>
                    </span>
                </div>
            </form>
        );
    }
}
export default SearchBox
