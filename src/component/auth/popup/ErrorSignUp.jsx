import { Alert, Space } from 'antd';
import React, { useState } from 'react';


function ErrorSignUp() {
    const [isShowErr, setIsShowErr] = useState(false);

    const onClose = () => {
        console.log('Popup was closed.');
        setIsShowErr(false);
    };


    return (<div>
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <Alert
                message="Error Sign-Up"
                description="Email already Created"
                type="error"
                closable
                onClose={onClose}
            />
            
        </Space></div>
    );
}

export default ErrorSignUp;