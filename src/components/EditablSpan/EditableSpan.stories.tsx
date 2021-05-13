import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Value Editable Span Changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    changeTitle: action('Value EditableSpan changed'),
    title: 'HTML'
}