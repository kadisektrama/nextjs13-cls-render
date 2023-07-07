import React from 'react';
import logger from './Logger/logger';

import Error404 from "../Error/error404";
import Error403 from "../Error/error403";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: false,
            errorInfo: false,
        };
    }

    static getDerivedStateFromError(error, errorInfo) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error, errorInfo: errorInfo };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        if (!error.message.startsWith('404') && !error.message.startsWith('403') && !error.message.includes('Loading chunk') && window.location.protocol === 'https:') {
            logger.push({
                orientation: window.screen.orientation,
                location: window.location,
                error: new String(error),
                info: errorInfo,
            });
        } else {
            console.log(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            if (this.state.error.message.startsWith('404')) {
                return (
                    <Error404 />
                )
            }

            if (this.state.error.message.startsWith('403')) {
                return (
                    <Error403 />
                )
            }

            if (this.state.error.message.includes('Loading chunk')) {
                window.location.reload()
            }

            return (
                <div style={{ padding: '16px', backgroundColor: '#fff2f0', border: '1px solid #ffccc7' }}>
                    <div>
                        Что-то пошло не так!
                    </div>
                    <br/>
                    <div>
                        Error: {this.state.error.message}
                    </div>
                    <br/>
                    <div>
                        <pre>
                            Error info: {this.state.error.stack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}