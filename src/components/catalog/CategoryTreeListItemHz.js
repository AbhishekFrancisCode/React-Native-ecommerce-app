import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    View, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import { Icon } from 'react-native-elements';
import CategoryTreeListHz from './CategoryTreeListHz';
import { Text } from '../common';
import { setCurrentCategory, resetFilters } from '../../actions/index';
import { NAVIGATION_CATEGORY_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';

const CategoryTreeListItemHz = (props) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const switchAnimation = {
            duration: 150,
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        };
        LayoutAnimation.configureNext(switchAnimation);
    });

    const onExpandPress = () => setExpanded(!expanded);

    const onRowPress = () => {
        const { category } = props;
        dispatch(resetFilters());
        dispatch(setCurrentCategory({ category }));
        NavigationService.navigate(NAVIGATION_CATEGORY_PATH, {
            title: category.name,
        });

    };

    const renderItem = () => {
        const { category } = props;
        const titleStyle = {
            alignSelf: 'flex-start',
            paddingLeft: 10 * category.level,
        };

        return (
            <View>
                <TouchableOpacity
                    onPress={onRowPress}
                    style={styles.rowStyles(theme)}
                >
                    <Text type="heading" style={titleStyle}>{category.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderChildren = () => {
        if (expanded) {
            return (
                <View>
                    <CategoryTreeListHz categories={props.category?.children_data}  />
                </View>
            );
        }
    };

    return (
        <View>
            {renderItem()}
            {renderChildren()}
        </View>
    );
}

const styles = {
    rowStyles: theme => ({
        //flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 3,
        borderLeftWidth: 3,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 25,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        //backgroundColor: '#DDDDDD',
        borderRadius: 40,
        paddingTop: 8.8,
        paddingBottom: 8.8,
        marginRight: 5,
        marginLeft: 5,
        
    }),
    dropIcon: theme => ({
        height: 25,
        padding: 1,
        paddingRight: theme.spacing.large,
    }),
};
export default CategoryTreeListItemHz;
