import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon } from '@expo/vector-icons';
import AppList from './AppList';
import AppForm from './AppForm';

const { Navigator, Screen } = createBottomTabNavigator();

function AppTab() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#d420c5', // Set the color for active tab
                    tabBarInactiveTintColor: 'gray', // Set the color for inactive tabs
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    },
                    headerTitleContainerStyle: {
                        left: 0,
                        right: 0,
                    },
                    headerLeft: () => (
                        <Icon name="menu" type="font-awesome" style={{ marginLeft: 10 }} />
                    ),
                    headerRight: () => (
                        <Icon name="user" type="font-awesome" style={{ marginRight: 10 }} />
                    ),
                }}
            >
                <Screen
                    name="AppList"
                    component={AppList}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="home"
                                type="font-awesome"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Screen
                    name="AppForm"
                    component={AppForm}
                    options={{
                        tabBarLabel: 'Cadastrar novo produto',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="plus"
                                type="font-awesome"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppTab;
