import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet, View,
    Text
} from 'react-native';
import { ArrowDownBlueIcon } from '@images/index'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export interface Props {
    type?: String
    code?: String
    date?: String
    name?: String
    position?: String
    number?: String
    address?: String
    description?: String
    isHeader?: boolean
}

const ItemNotiComponent = (props: Props) => {
    return (
        <View style={styles.noti}>
            {
                props.isHeader &&
                <>
                    <View style={styles.headerView}>
                        <ArrowDownBlueIcon />
                        <Text style={styles.type}>{props.type}</Text>
                        <View style={styles.numberView}>
                            <Text style={styles.number}>{props.number}</Text>
                        </View>
                    </View>
                    <View style={styles.devide} />
                </>
            }

            <View style={styles.codeView}>
                <Text style={styles.code}>{props.code}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.infoView}>
                <View style={styles.infoViewCard}>
                    <Text style={styles.name}>{props.name}</Text>
                </View>
                <View style={styles.infoViewCard}>
                    <Text style={styles.position}>{props.position}</Text>
                </View>
                <View style={styles.infoViewCard}>
                    <Text style={styles.address}>{props.address}</Text>
                </View>
            </View>
            <Text style={styles.description}>{props.description}</Text>
        </View>
    );
};

ItemNotiComponent.defaultProps = {

};

export default memo(ItemNotiComponent);

const styles = StyleSheet.create({
    noti: {
        padding: 12
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    type: {
        color: '#187779',
        fontFamily: 'arial',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        fontWeight: 'bold',
        marginLeft: moderateScale(5)
    },
    numberView: {
        backgroundColor: '#787878',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    number: {
        color: '#FFFFFF',
        fontFamily: 'arial',
        fontSize: moderateScale(11),
        lineHeight: moderateScale(13),
        marginHorizontal: 6,
        marginVertical: 2
    },
    devide: {
        width: '100%',
        height: 1,
        backgroundColor: '#FAFAFA',
        marginTop: moderateScale(11),
        marginBottom: moderateScale(8)
    },
    codeView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    code: {
        color: '#111111',
        fontFamily: 'arial',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        fontWeight: 'bold'
    },
    date: {
        color: '#B8B8B8',
        fontFamily: 'arial',
        fontSize: moderateScale(10),
        lineHeight: moderateScale(10),
        position: 'absolute',
        right: 0
    },
    name: {
        color: '#444444',
        fontFamily: 'arial',
        fontSize: moderateScale(11),
        lineHeight: moderateScale(13),
        marginHorizontal: 8,
        marginVertical: 4
    },
    position: {
        color: '#444444',
        fontFamily: 'arial',
        fontSize: moderateScale(11),
        lineHeight: moderateScale(13),
        marginHorizontal: 8,
        marginVertical: 4
    },
    address: {
        color: '#444444',
        fontFamily: 'arial',
        fontSize: moderateScale(11),
        lineHeight: moderateScale(13),
        marginHorizontal: 8,
        marginVertical: 4
    },
    description: {
        color: '#7C86A2',
        fontFamily: 'arial',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(18),
        marginTop: moderateScale(10)
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    infoViewCard: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        marginRight: moderateScale(8)
    }
});
