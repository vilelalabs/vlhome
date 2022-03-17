import React, { useState } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

import SortableGrid from 'react-native-sortable-grid'

var getOrder = require('lodash.get');

const backgroundAreaColor = 'white';
const foregroundAreaColor = 'rgb(27,27,27)';

function ReorderList({ ambients }) {

    //const [tempList, setTempList] = useState(ambients);
    const [scrollState, setScrollState] = useState(true);

    return (
        <ScrollView
            scrollEnabled={scrollState}
            style={styles.container}
        >
            <SortableGrid
                onDragStart={() => {
                    setScrollState(false);
                }}
                onDragRelease={(itemOrder) => {
                    var finalOrder = getOrder(itemOrder, `itemOrder`);
                    finalOrder.map((item) => {
                        ambients[item.key].order = item.order;
                    });
                        
                    setScrollState(true);

                }}
                itemsPerRow={1}
                style={styles.grid}
                itemHeight={40}
                itemWidth={200}
                dragActivationTreshold={400}
            >
                {ambients.map((amb, index) =>
                    <Text
                        key={index}
                        style={styles.text}
                    >
                        {amb.name}
                    </Text>
                )}
            </SortableGrid>
        </ScrollView>
    )
}

export default ReorderList

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 15,
        paddingHorizontal: 15,

    },
    grid: {
        backgroundColor: foregroundAreaColor,
    },
    text: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#FFF',
        marginTop: 5,
        fontSize: 24,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    textSelected: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        color: '#FFF',
        backgroundColor: '#000',
        marginTop: 5,
        fontSize: 24,
    },
});