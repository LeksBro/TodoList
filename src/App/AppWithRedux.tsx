import React from "react";

import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";

import TodolistList from "../features/Todolists/TodolistList";



export const AppWithRedux = () => {


    return (<>

            <nav>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </nav>
            <Container fixed>
                <TodolistList/>
            </Container>
        </>
    );
}



