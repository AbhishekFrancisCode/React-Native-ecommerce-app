import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import CategoryTreeListItemHz from './CategoryTreeListItemHz';

const CategoryTreeListHz = ({
    categories,
    refreshControl,
}) => {
    const renderItem = (category) => {
        return <CategoryTreeListItemHz category={category.item} expanded={false} />;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                refreshControl={refreshControl}
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                itemStyles={{ width: 60, height: 60, borderRadius: 30 }}
                
            />
        </SafeAreaView>
    );
};

CategoryTreeListHz.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    refreshControl: PropTypes.element,
};

CategoryTreeListHz.defaultProps = {
    refreshControl: <></>,
};

export default CategoryTreeListHz;
