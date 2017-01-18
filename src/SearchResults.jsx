import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'

function Result(props) {
    return (
        <Col key={props.key} sm={4} lg={4} md={4} className='thumbnail'>
            <img src={props.img} alt='Search result'/>
            <div className={'caption'}>
                <h4 className={'pull-right'}>{props.price}</h4>
                <h4 className={'title'}>
                    <a href={props.href}>{props.title}</a>
                </h4>
                <p>{props.text}</p>
            </div>
        </Col>
    );
}

export default class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: props.results
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({results: nextProps.results});
    }
    render() {
        var results = this.state.results.map((result) => <Result key={result.href} href={result.href} img={result.img} title={result.title} text={result.text} price={result.price}/>)
        return <Row>{results}</Row>
    }
}
