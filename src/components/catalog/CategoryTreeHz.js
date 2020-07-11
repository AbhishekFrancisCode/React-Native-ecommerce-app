import React, { useContext, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common/index';
import { initMagento, getCategoryTree } from '../../actions/index';
import CategoryTreeListHz from './CategoryTreeListHz';
import { ThemeContext } from '../../theme';

const CategoryTree = ({
    categoryTree,
    refreshing,
    getCategoryTree: _getCategoryTree,
}) => {
    const theme = useContext(ThemeContext);

    useEffect(() => {
        _getCategoryTree();
    },[]);

    const onRefresh = () => {
        _getCategoryTree(true);
    };

    const renderContent = () => {
        if (categoryTree) {
            return (
                <CategoryTreeListHz
                    categories={categoryTree.children_data}
                    refreshControl={(
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    )}
                />
            );
        }
        return <Spinner />;
    };

    return (
        <View style={styles.container(theme)}>
            {renderContent()}
        </View>
    );
};

const styles = {
    container: theme => ({
        flex: 0.08,
        backgroundColor: theme.colors.background,
    }),
};

const mapStateToProps = ({ categoryTree  }) => ({ categoryTree, refreshing: categoryTree.refreshing });

export default connect(mapStateToProps, { initMagento, getCategoryTree })(CategoryTree);
