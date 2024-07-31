import React, { ReactElement, ReactNode, SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { colors, font, textStyle } from '../../../assets/style/setup/constants';

interface TabItem {
    label: string
    content: ReactNode
    icon?: ReactNode // Optional icon for each tab
}

interface GenericTabsProps {
    tabs: TabItem[]
}

export function GenericTabs({ tabs }: GenericTabsProps) {
    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                sx={{
                    borderBottom: 0,
                    '.MuiTab-root': { minHeight: 'auto' },
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.neutrals.black
                    },
                    '.MuiTabs-scroller': {
                        height: 'fit-content'
                    }
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        icon={tab.icon as ReactElement} // Render the SVG icon
                        iconPosition="start" // Position the icon before the label
                        style={{ minWidth: 'auto', height: '38px', padding: '4px 8px' }}
                        sx={{
                            gap: '8px',
                            // paddingInline: '0',
                            fontFamily: font.primary.regular,
                            ...textStyle.body,
                            textTransform: 'none',
                            color: colors.neutrals.black,
                            '&.Mui-selected': {
                                fontFamily: font.primary.bold,
                                color: colors.neutrals.black,
                            },
                            '&:hover': {
                                backgroundColor: colors.primary[50],
                            }
                        }}
                    />
                ))}
            </Tabs>
            {tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    )
}

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}