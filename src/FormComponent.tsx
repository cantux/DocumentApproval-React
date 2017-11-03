import * as React from "react";

import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

import {ErrorComponent} from "./ErrorComponent";

import * as rpn from 'request-promise-native';

// Types
import { match } from 'react-router-dom'
interface NavParam {
    documentId: number
};
interface FormProps{
    match: match<NavParam>
}
interface FormState{
    checked: boolean,
    citizenId: number,
    phone: string,
    motherMaidenName: string,
    isValid: boolean
};
// End of Types

export class FormComponent extends React.Component<FormProps, FormState>{
    constructor(props: FormProps) {
        super(props);
        this.state = {checked: false, citizenId: 0, phone: "", motherMaidenName: "", isValid: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkIsValid (match: match<NavParam>) {
        console.log(match);
        // rpn({
        //     uri: match.url,
        //     method: 'POST',
        //     json: true,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(match.params)}
        // ).then((response: any) => (response.json()));
    }

    componentWillMount () {
        this.checkIsValid(this.props.match);
    }

    handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        rpn( {
            uri: '/submitData',
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)}
        ).then(
            (response: any) => {
                console.log(response);
            }
        );
    }

    private handleCitizenIdChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({citizenId: Number(event.currentTarget.value)});
    }

    private handleMotherMaidenNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({motherMaidenName: event.currentTarget.value});
    }

    private handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                <ErrorComponent message={'Geçersiz döküman onay formu!'}/>}
            </div>

        );

    }
}
