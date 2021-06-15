import React from 'react';
import FastImage from 'react-native-fast-image';

export enum ResizeMode {
    contain = 'contain',
    cover = 'cover',
    stretch = 'stretch',
    center = 'center',
}

export enum Priority {
    low = 'low',
    normal = 'normal',
    high = 'high',
}

interface ImageComponentProps {
    uri: string|any;
    resizeMode?: ResizeMode;
    priority?: Priority;
    imageStyle?:{}
}

const ImageComponent = ({
    uri,
    resizeMode = ResizeMode.contain,
    priority = Priority.normal,
    imageStyle={}
}: ImageComponentProps) => {
    return (
        <FastImage
            resizeMode={resizeMode}
            source={{
                uri,
                priority,
            }}
            style={imageStyle}
        />
    );
};

export default ImageComponent;
