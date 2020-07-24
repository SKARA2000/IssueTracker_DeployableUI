import React from 'react';

function displayFormat(date){
    return( date != null ? date.toDateString() : '' );
}

function editFormat(date){
    return( date != null ?  date.toISOString().substr(0,10) : '' );
}

function unformat(str){
    const value = new Date(str);
    return( Number.isNaN(value.getTime()) ? null : value );
}

export default class Dateinput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: editFormat(props.value),
            focused: false,
            valid: true
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onFocus(e){
        this.setState({
            focused: true
        });
    }

    onBlur(e){
        const { value, valid: oldValid } = this.state;
        const { onValidityChange, onChange } = this.props;
        const dateValue = unformat(value);
        const valid = value === '' || dateValue != null;
        if(valid !== oldValid && onValidityChange){
            onValidityChange(e, valid);
        }
        this.setState({
            focused: false,valid
        });
        if(valid){
            onChange(e, dateValue);
        }
    }

    onChange(e){
        if(e.target.value.match(/^[\d-]*$/)){
            this.setState({
                value: e.target.value
            });
        }
    }

    render(){
        const { value, focused, valid } = this.state;
        const { value: origVal, onValidityChange, ...props } = this.props;
        const displayValue = (focused || !valid) ? value : displayFormat(origVal);
        
        return(
            <input
                {...props}
                value={displayValue}
                placeholder={ focused ? 'yyyy-mm-dd' : null }
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange} />
        );
    }
}