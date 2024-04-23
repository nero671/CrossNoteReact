import React from "react";
import { action } from '@storybook/addon-actions';
import {EditableSpan} from "../../EditaleSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeCallback = action('EditableSpan change');

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Start value'} onChange={changeCallback} />
}
