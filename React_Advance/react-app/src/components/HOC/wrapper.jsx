function wuthAuth(Component) {
    return function WithAuthComponent() {
        const isAuthenticated = false; 

        if (!isAuthenticated) {
            return <div>Please log in to view this content.</div>;
        }

        return <Component />;
    };
}

export default wuthAuth;