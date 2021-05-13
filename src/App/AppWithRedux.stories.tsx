import {AppWithRedux} from "./AppWithRedux";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;

const Template:Story = (args) =><AppWithRedux {...args}/>

export const AppWithReduxExample = Template.bind({})

AppWithReduxExample.args = {}