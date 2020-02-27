import React from 'react';
import { uid } from "react-uid";
import './Settings.css';

class Settings extends React.Component {
	state = {}

	render() {
		return (
		<div className={ 'Settings dark-grey light-grey-text ' + (this.props.wide ? 'thin' : '') }>
			Settings
		</div>
	)}
};

export default Settings;
