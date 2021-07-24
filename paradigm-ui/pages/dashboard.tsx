
import Box from '@material-ui/core/Box';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HelpIcon from '@material-ui/icons/Help';
import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";

export default function Dashboard() {
    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        padding: '5%'
        }
    })(Typography);   
    
    return (
        <Box display="flex" flexDirection="row" height="100%">
            <ProSidebar style={{position: "absolute", height: "100%"}}>
                <SidebarHeader>
                    {
                        <WhiteTextTypography variant="h4">Paradigm</WhiteTextTypography>
                    }
                </SidebarHeader>
                <Menu iconShape="square">
                <MenuItem >Dashboard</MenuItem>
                <MenuItem >New Scan</MenuItem>
                <SubMenu title="Components" >
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
                </Menu>
            </ProSidebar>
        </Box>
         
  )
}
