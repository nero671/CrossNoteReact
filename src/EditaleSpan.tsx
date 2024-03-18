import React, {ChangeEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type EditableSpanType = {
    title: string,
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditmode = () => {
        setEditMode(true);
        setTitle(props.title)
    }

    const activateViewmode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <input
                value={title}
                onBlur={activateViewmode}
                autoFocus={true}
                onChange={ onChangeTitleHandler }
            />
            :
            <span
                onDoubleClick={activateEditmode}
            >{props.title}</span>
    )
}
