import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Tabs, Tab, Fade } from '@mui/material';

// Categorized Showcase Components
import { StatCards } from './components/StatCards';
import { RecentActivity } from './components/RecentActivity';
import { ProjectGallery } from './components/ProjectGallery';
import { UIControls } from './components/UIControls';
import { InputShowcase } from './components/InputShowcase';
import { DataDisplayShowcase } from './components/DataDisplayShowcase';
import { FeedbackShowcase } from './components/FeedbackShowcase';
import { SurfaceShowcase } from './components/SurfaceShowcase';
import { NavigationShowcase } from './components/NavigationShowcase';
import { UtilsShowcase } from './components/UtilsShowcase';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    <Fade in={true} timeout={500}>
                        <Box>{children}</Box>
                    </Fade>
                </Box>
            )}
        </div>
    );
}

export const DashboardPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        // Simulate initial loading for showcase
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                    MUI Component Showcase
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                    Explore all Material UI components categories at a glance.
                </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': { fontWeight: 600, px: 3 },
                        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' }
                    }}
                >
                    <Tab label="Overview" />
                    <Tab label="Inputs" />
                    <Tab label="Data Display" />
                    <Tab label="Feedback" />
                    <Tab label="Surfaces" />
                    <Tab label="Navigation" />
                    <Tab label="Utils" />
                </Tabs>
            </Box>

            <CustomTabPanel value={tabValue} index={0}>
                {/* 1. Statistics Section */}
                <Box sx={{ mb: 4 }}>
                    <StatCards isLoading={isLoading} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 4, mb: 4 }}>
                    <Box sx={{ minHeight: '100%' }}>
                        <RecentActivity isLoading={isLoading} />
                    </Box>
                    <Box>
                        <UIControls />
                    </Box>
                </Box>

                <Box>
                    <ProjectGallery isLoading={isLoading} />
                </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
                <InputShowcase isLoading={isLoading} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
                <DataDisplayShowcase isLoading={isLoading} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={3}>
                <FeedbackShowcase isLoading={isLoading} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={4}>
                <SurfaceShowcase isLoading={isLoading} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={5}>
                <NavigationShowcase isLoading={isLoading} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={6}>
                <UtilsShowcase isLoading={isLoading} />
            </CustomTabPanel>
        </Container>
    );
};


