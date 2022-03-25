import React from "react";
import {Title} from "@mantine/core";

export function HeaderContents() {
    return <ul style={{listStyleType: 'none', margin: 0, padding: 0}}>
        <li style={{display: 'inline'}}><Title order={1}>pingryan.com</Title></li>
        {/*<li style={{display: 'inline', float: 'right'}}><LoginWidget/></li>*/}
    </ul>
}