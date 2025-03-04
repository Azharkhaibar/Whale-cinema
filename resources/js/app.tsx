import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
    return (
        <div>
            <h1>Hello, React + TypeScript di Laravel!</h1>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
