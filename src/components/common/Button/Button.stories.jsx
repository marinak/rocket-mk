import React from 'react';

import Button from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        variant: {
            text: '',
        },
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    text: 'Working...',
};
