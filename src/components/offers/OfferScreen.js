import React, { Component } from 'react';
//import styles from '../styles';
import PropTypes from 'prop-types';
import {
    ScrollView, View, StyleSheet, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MaterialHeaderButtons, Text, Item } from '../common';
import {
    NAVIGATION_HOME_PRODUCT_PATH,
    NAVIGATION_SEARCH_SCREEN_PATH,
    NAVIGATION_CART_PATH,
} from '../../navigation/routes';
import { getHomeData, setCurrentProduct } from '../../actions';
import FeaturedProducts from '../home/FeaturedProducts';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';


class OfferScreen extends Component {
    static contextType = ThemeContext;

    static navigationOptions = ({ navigation }) => ({
        title: translate('offer.title'),
     });

    onProductPress = (product) => {
        this.props.setCurrentProduct({ product });
        NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
            product,
            title: product.name,
        });
    };

    onRefresh = () => {
        this.props.getHomeData(true);
    };

    renderFeatured() {
        return _.map(this.props.featuredProducts, (value, key) => (
            <FeaturedProducts
                key={`featured${key}`}
                products={value}
                title={this.props.featuredCategories[key].title}
                onPress={this.onProductPress}
                currencySymbol={this.props.currencySymbol}
                currencyRate={this.props.currencyRate}
            />
        ));
    }

    render() {
        const theme = this.context;

        if (this.props.errorMessage) {
            return (
                <View style={styles.errorContainer}>
                    <Text>{this.props.errorMessage}</Text>
                </View>
            );
        }

        return (
            <ScrollView
                style={styles.container(theme)}
                refreshControl={(
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={this.onRefresh}
                    />
                )}
            >
                {this.renderFeatured()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme.colors.background,
    }),
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

OfferScreen.propTypes = {
    slider: PropTypes.array,
    getOfferData: PropTypes.func,
    navigation: PropTypes.object,
    featuredProducts: PropTypes.object,
    featuredCategories: PropTypes.object,
    setCurrentProduct: PropTypes.func,
    currencySymbol: PropTypes.string.isRequired,
    currencyRate: PropTypes.number.isRequired,
    refreshing: PropTypes.bool,
};

OfferScreen.defaultProps = {
    slider: [],
};


const mapStateToProps = (state) => {
    const { refreshing } = state.home;
    const {
        errorMessage,
        currency: {
            displayCurrencySymbol: currencySymbol,
            displayCurrencyExchangeRate: currencyRate,
        },
    } = state.magento;
    return {
        ...state.home,
        refreshing,
        errorMessage,
        currencySymbol,
        currencyRate,
    };
};

export default connect(mapStateToProps, { getHomeData, setCurrentProduct })(OfferScreen);

