import React, {Component} from 'react';
import DisplayWeather from './DisplayWeather';

type Props = {

}

type State = {
    latitude: number,
    longitude: number,
    temperatureCel: number,
    temperatureFah: number, 
    description: string,
    place: string
}

export default class Display extends Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            latitude: NaN,
            longitude: NaN,
            temperatureCel: 0,
            temperatureFah: 0,
            description: '',
            place: ''
        }
    }

    successfulCoord = (obj: GeolocationPosition) => {
        this.setState({
            latitude: Math.round(obj.coords.latitude),
            longitude: Math.round(obj.coords.longitude)
        })
    }

    failedCoord = () => {
        console.log('User did not allow for location services')
    }
    
    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.successfulCoord, this.failedCoord);
        }
    }

    componentDidUpdate = (prevProps: [], prevState: State) => {
        if (prevState.latitude !== this.state.latitude && prevState.longitude !== this.state.longitude){
            this.fetchWeather();
        }
    }

    fetchWeather = () => {
        console.log(this.state.latitude, this.state.longitude);

        const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
        const key = '4e531f0413b09c60d9b522b5479f1ff1';

        if (this.state.latitude !== NaN && this.state.longitude !== NaN) {
            fetch(`${baseURL}?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${key}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                console.log(json.weather[0].description)
                this.setState({
                    temperatureCel: Math.floor(json.main.temp - 273.15),
                    temperatureFah: Math.floor((json.main.temp - 273.15)*(9/5)+32),
                    description: json.weather[0].description,
                    place: json.name
                })
            })
        }
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <h1>Your Local Weather</h1>
                <DisplayWeather temperatureCel={this.state.temperatureCel} temperatureFah={this.state.temperatureFah} description={this.state.description} place={this.state.place}/>
            </div>
        )
    }
}