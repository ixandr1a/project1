import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';

export default function Home({ history }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerWrapper}>
                <Text>Привет, Никита!</Text>
                <Button onPress={() => history.push('/camera')} style={styles.button} block info>

                {/* <Button onPress={connect} style={styles.button} block info> */}
                    <Text>Камера</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
        width: 150,
    },

});
