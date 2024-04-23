import {AddItemForm} from "../AddItemForm";
import React from "react";
import AppReactRedux from "../AppReactRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreDecorator} from "./ReduxStoreDecorator";

export default {
    title: "AppReactRedux Component",
    component: AppReactRedux,
    decorators: [ReduxStoreDecorator]
}

export const AppReactReduxBaseExample = () => {
    return <AppReactRedux  />
}
