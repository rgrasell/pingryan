import {useAuth0} from "@auth0/auth0-react";
import {Button, Text, Loader, Group} from "@mantine/core";

export function LoginWidget() {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    if (isLoading) {
        return <Loader size="sm" />;
    }

    let text = isAuthenticated ? user!.email : "";
    let loginButton = <Button
        onClick={() => loginWithRedirect()}
        variant="outline" color="teal" compact
    >
        Log In
    </Button>
    let logoutButton = <Button
        onClick={() => logout({returnTo: window.location.origin})}
        variant="subtle" color="red" compact
    >
        Log Out
    </Button>;

    return (<Group position="right">
        <Text size="sm">{text}</Text>
        {isAuthenticated ? logoutButton : loginButton}
    </Group>);
}