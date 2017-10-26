import * as React from "react";

import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

// import { RouteComponentProps } from 'react-router-dom'
import {ErrorComponent} from "./ErrorComponent";

interface NavParam {id: number};
interface FormProps{
    match: any//RouteComponentProps<NavParam>
}
interface FormState{
    checked: boolean,
    citizenId: number,
    phone: string,
    motherMaidenName: string,
    isValid: boolean
};

export class FormComponent extends React.Component<FormProps, FormState>{
    constructor(props: FormProps) {
        super(props);
        this.state = {checked: false, citizenId: 0, phone: "", motherMaidenName: "", isValid: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkIsValid (props: NavParam) {
        console.log(props);
        if(props.id == 112){
            this.setState({isValid: true});
        }
        // fetch('/customer-info/',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(props.match.params)}
        // ).then(
        //     function (response) {
        //         return response.json();
        //     }
        // ).then(function (json) {
        //     console.log(json);
        //     props.history.push('/FormComponent');
        //     //props.history.push('')
        // })
    }

    componentWillMount () {
        this.checkIsValid(this.props.match.params);
    }

    handleSubmit () {
        fetch('/submitData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)}
        ).then(
            function (response) {

            }, function (error) {

            }
        );
    }

    private handleCitizenIdChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({citizenId: Number(event.currentTarget.value)});
    }

    private handleMotherMaidenNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({motherMaidenName: event.currentTarget.value});
    }

    private handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({phone: event.currentTarget.value});
    }

    private onLicenseAgreed = () => {
        this.setState({checked: !this.state.checked});
    }

    public render (): JSX.Element {
        return (
            <div>
                {this.state.isValid ?
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="ui-g">
                            <div className="ui-md-12">
                                <div className="ui-g-6">
                                    <span>TCKN: </span>
                                </div>
                                <div className="ui-g-6">
                                    <InputText onChange={this.handleCitizenIdChange}/>
                                </div>
                            </div>
                            <div className="ui-md-12">
                                <div className="ui-g-6">
                                    <span>Telefon Numarası: </span>
                                </div>
                                <div className="ui-g-6">
                                    <InputText onChange={this.handlePhoneChange}/>
                                </div>
                            </div>
                            <div className="ui-md-12">
                                <div className="ui-g-6">
                                    <span>Anne Kızlık Soyadı: </span>
                                </div>
                                <div className="ui-g-6">
                                    <InputText onChange={this.handleMotherMaidenNameChange}/>
                                </div>
                            </div>
                            <div className="ui-md-12">
                                <Checkbox label="I accept the terms and conditions" onChange={this.onLicenseAgreed} checked={this.state.checked}></Checkbox>
                            </div>
                            <div className="ui-md-12">
                                <Button label="Gönder" type="submit"></Button>
                            </div>
                        </div>
                    </div>
                </form> :
                <ErrorComponent/>}
            </div>

        );

    }
}
