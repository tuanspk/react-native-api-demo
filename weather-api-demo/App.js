import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import locationApi from "./api/locationApi";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { city: "", lstLocation: [], locationInfo: null };
    }

    getLocations = async () => {
        try {
            const response = await locationApi.search(this.state.city);
            const result = JSON.parse(JSON.stringify(response));
            const lstLocation = result.map((location) => {
                return {
                    woeid: location.woeid.toString(),
                    city: location.title,
                };
            });

            this.setState({ lstLocation: lstLocation, locationInfo: null });
        } catch (err) {
            console.log(err);
        }
    };

    getLocationInfo = async (woeid) => {
        try {
            const response = await locationApi.get(woeid);
            const result = JSON.parse(JSON.stringify(response));
            const consolidated_weather = result.consolidated_weather[0];
            const locationInfo = {
                woeid: result.woeid,
                locationType: result.location_type,
                locationName: result.title,
                date: consolidated_weather.applicable_date,
                weatherState: consolidated_weather.weather_state_name,
                minTemp: consolidated_weather.min_temp,
                maxTemp: consolidated_weather.max_temp,
            };

            this.setState({ locationInfo: locationInfo });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ city: text })}
                    placeholder="name of city"
                    placeholderTextColor="gray"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={
                        this.state.city.length == 0
                            ? styles.buttonSearchDisabled
                            : styles.buttonSearch
                    }
                    onPress={() => this.getLocations()}
                    disabled={this.state.city.length == 0}
                >
                    <Text style={styles.buttonSearchText}>Search</Text>
                </TouchableOpacity>
                <FlatList
                    styles={styles.lstData}
                    data={this.state.lstLocation}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.getLocationInfo(item.woeid)}
                        >
                            <Text>{item.city}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.woeid}
                />
                {this.state.locationInfo != null ? (
                    <View style={styles.info}>
                        <Text>{this.state.locationInfo.locationName}</Text>
                        <Text>{this.state.locationInfo.date}</Text>
                        <Text>{this.state.locationInfo.weatherState}</Text>
                        <Text>{this.state.locationInfo.minTemp}</Text>
                        <Text>{this.state.locationInfo.maxTemp}</Text>
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 100,
        marginBottom: 50,
        // justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        width: 200,
    },
    listData: {
        // width: 300,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 1,
        width: 300,
    },
    buttonSearch: {
        alignItems: "center",
        backgroundColor: "#0000FF",
        borderRadius: 10,
        margin: 10,
        padding: 5,
    },
    buttonSearchDisabled: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        margin: 10,
        padding: 5,
    },
    buttonSearchText: {
        color: "#FFFFFF",
    },
    info: {
        width: 300,
        marginTop: 20,
        padding: 10,
        borderWidth: 2,
    },
});

export default App;
