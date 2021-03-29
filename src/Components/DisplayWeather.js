import React from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

const DisplayWeather = (props) => {
    return (
        <Card style={{margin: '3em'}}>
            <CardBody>
                {props.place
                    ? <CardTitle tag='h2'>{props.place}'s Weather Report</CardTitle>
                    : <CardTitle tag='h2'>Please Wait...</CardTitle>
                }
                <CardSubtitle tag="h4" className="mb-2 text-muted">This app uses Location Services, so please allow for the browser to track your location to view your local weather.</CardSubtitle>
                <br/>
                {(props.description !== '') ? <CardText>Weather Description: {props.description}</CardText> : <CardText>Please wait for weather description to load.</CardText>}
                {(props.temperatureCel === 0) ? <CardText>Please wait for temperature information to load.</CardText> : <CardText>Temperature (C°): {props.temperatureCel}</CardText>}
                {(props.temperatureFah === 0) ? <div></div> : <CardText>Temperature (F°): {props.temperatureFah}</CardText>}
            </CardBody>
        </Card>
    )
}

export default DisplayWeather;