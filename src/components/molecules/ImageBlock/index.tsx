import * as React from 'react';
import classNames from 'classnames';
import { Annotated } from '@/components/Annotated';

export default function ImageBlock(props) {
    const { elementId, className, url, altText = '', isEmbedded = false } = props;
    if (!url) {
        return null;
    }

    if(isEmbedded){
        return <Annotated content={props}>
                    <div
                        id={elementId || undefined}
                        className={classNames('sb-component', 'sb-component-block', className)}
                        style={{
                            fontFamily: 'Arial, sans-serif',
                            display: 'block',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                            margin: 0,
                            backgroundColor: 'transparent',
                        }}
                    >
                        <div
                            className="image-container"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                aspectRatio: '1',
                            }}
                        >
                            <style>
                                {`
                                    .image-container img {
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                        position: absolute;
                                        object-fit: contain;
                                        top: 0;
                                        left: 0;
                                        transition: opacity 0.3s ease;
                                    }

                                    .image-container img:first-child {
                                        z-index: 1;
                                    }

                                    .image-container img:hover {
                                        opacity: 0;
                                    }
                                `}
                            </style>
                            <img
                                src="/arunnura/images/monKEY.png"
                                alt="Modern Workspace"
                            />
                            <img
                                src="/arunnura/images/manKEY.png"
                                alt="Wireframe Design"
                            />
                        </div>
                    </div>
                </Annotated>;
    }

    return (
        <Annotated content={props}>
            <img
                id={elementId || null}
                className={classNames('sb-component', 'sb-component-block', 'sb-component-image-block', className)}
                src={url}
                alt={altText}
            />
        </Annotated>
    );
}
