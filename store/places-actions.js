import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, image) => {
    // redux thunk internal dispatch function
    return async dispatch => {
        // pop() gets the last element from the array resulting from split()
        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
        } catch (err) {
            console.log(err)
            throw err
        }

        dispatch({type: ADD_PLACE, placeData: {title: title, image: newPath}})
    }
}