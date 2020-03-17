import React from 'react';
import {Box, Toast} from 'gestalt';

const ToastMessage = ({ show, message }) =>
    show && (
        <Box
            dangerouslySetInlineStyle={{
                __style: {
                    bottom: 330,
                    left: '50%',
                    transform: "translatex(-50%)"
                }
            }}
            position="fixed"
            >
                <Toast color="orange" text={ message } />
        </Box>
    );

export default ToastMessage;
