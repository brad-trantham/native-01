import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState()
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationhandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation)
            return

        // goBack() doesn't accept parameters, so we use navigate()
        // navigate() is smart enough not to push this screen onto the stack,
        // since it already is, but we could force it with push()
        props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation})
        // normally you would list navigate() as a depdendency,
        // but this would start an infinite loop so we don't
    }, [selectedLocation])

    // this is necessary to pass the saved location to the header
    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler})
    }, [savePickedLocationHandler])

    let markerCoordinates
    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView region={mapRegion} style={styles.map} onPress={selectLocationhandler}>
            {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation')
    return {
        headerRight: () => <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen