import React from 'react';
import {
	StyleSheet, Text, View,
} from 'react-native';

import UserDB from '../Controllers/UserDB';
import Utilities from '../Controllers/Utilities';

import UserInfo from '../Components/UserInfo';
import UserHistory from '../Components/UserHistory';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	history: {
		marginTop: 1,
	},
});

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user || {},
		};
	}

	async componentDidMount() {
		// If need local user, get from DB
		if (this.props.localUser) {
			// Load the user data into state
			const user = await UserDB.getLocalUser();
			this.setState({ user: (user.type === 'success' ? user.data : {}) });
		}
	}

	render() {
		// If user doesn't exist, render nothing
		if (Utilities.isNullOrEmpty(this.state.user)) {
			return (
				<View style={styles.container}>
					<Text>User not found.</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<UserInfo user={this.state.user} />
				<UserHistory history={this.state.user.history} />
			</View>
		);
	}
}

Profile.navigationOptions = {
	title: 'Profile',
};

export default Profile;
