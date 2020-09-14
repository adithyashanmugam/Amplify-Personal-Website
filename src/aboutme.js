import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles, AppBar, Toolbar, Typography, Grid, sizing, Button, ButtonGroup, Hidden,
         ThemeProvider } from '@material-ui/core'

         const beige = {color: '#cfc9c4'}


export default props => {

    let render = (
        <div className='content-intro'>
            <Grid container direction='column' spacing={5}>
                <Grid item>
                <Typography variant='h6' style={beige}>Hi, my name is</Typography>
                <Typography variant='h2' color='primary'>Adithya Shanmugam,</Typography>
                <Typography variant='h4' color='primary'>and I build things.</Typography>
                </Grid>

                <Grid item>
                <Typography variant='h4' color='secondary'>What kind of things?</Typography>
                <Typography variant='h4' color='secondary'>Click around to find out!</Typography>
                </Grid>
            </Grid>   
        </div>
    )
    return render
}