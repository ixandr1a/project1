import React, { useState, useEffect, useRef } from "react";
import { Button } from 'native-base';
import { FileSystem, MediaLibrary, Permissions } from 'expo';
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from '../CameraPermissionsWrapper';

export default function Cam({ history }) {

    const [type, setType] = useState(Camera.Constants.Type.back);
    const [lastPhotoURI, setLastPhotoURI] = useState(null);
    const [resultApi, setResultApi] = useState(null);
    const cameraRef = useRef(null);
    if (lastPhotoURI !== null) {
        let localUri = lastPhotoURI;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        fetch('http://localhost:3000/123', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((response) => response.text())
            .then((res) => setResultApi(res))
        return (
            <ImageBackground
                source={{ uri: lastPhotoURI }}
                style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {resultApi ? <TouchableOpacity
                    style={{
                        color: '#000',
                        fontSize: 25,
                        backgroundColor: '#fff',
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        setLastPhotoURI(null);
                        setResultApi(null)
                    }}
                >
                    <Text style={{ fontSize: 30, padding: 10, color: "#000" }}>{resultApi}</Text>
                </TouchableOpacity> : <Text></Text>}
                {/* {resultApi ? <Text style={{
                    color: '#000',
                    fontSize: 25,
                    backgroundColor: '#fff',
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }} > {resultApi}</Text> : <Text
                ></Text>
                } */}

                {/* <Button onPress={() => history.push('/')} style={styles.button} block info>
                    <Text>Назад</Text>
                </Button> */}
                {/* <TouchableOpacity
                    style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#666",
                        marginBottom: 40,
                        marginLeft: 20,
                    }}
                    onPress={() => {
                        setLastPhotoURI(null);
                        setResultApi(null)
                    }}
                >
                    <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
                </TouchableOpacity> */}
            </ImageBackground >
        );
    }

    return (
        <CameraPermissionsWrapper>
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <Button onPress={() => history.push('/')} style={styles.button} block info>
                    <Text>Назад</Text>
                </Button>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: "flex-end",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#666",
                            marginBottom: 40,
                            marginLeft: 20,
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: "flex-end",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#666",
                            marginBottom: 40,
                            marginLeft: 20,
                        }}
                        onPress={async () => {
                            if (cameraRef.current) {
                                let photo = await cameraRef.current.takePictureAsync();
                                setLastPhotoURI(photo.uri);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 30, padding: 10, color: "white" }}>
                            📸
                        </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </CameraPermissionsWrapper>
    );
}
const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginTop: 50,
        width: 150,
    },
})