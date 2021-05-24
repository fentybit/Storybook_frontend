import React from 'react';
import Box from '@material-ui/core/Box';
import CollectionsBookmarkTwoToneIcon from '@material-ui/icons/CollectionsBookmarkTwoTone';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Welcome = () => (
    <div align='center'>
        <Grid
            alignItems="center"
            container
            direction="column"
            fullWidth
            justify="center"
            spacing={0}
            style={{ minHeight: '90vh' }}
        >

            <Box fontFamily="Monospace" fontSize="h4.fontSize" fontWeight="fontWeightBold" letterSpacing={10} margin='15px' textAlign='left'>
                storybook
                <span style={{ color: '#e91e63' }}>.</span>
                <CollectionsBookmarkTwoToneIcon fontSize="small" />
                <Divider />
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Welcome to your journal.<br />
                Live your own story.<br />
                Your storybook.
            </Typography>
        </Grid>
    </div >
)

export default Welcome;