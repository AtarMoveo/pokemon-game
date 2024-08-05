import React, { ReactElement, ReactNode, SyntheticEvent, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { colors, font, textStyle } from '../../../assets/style/setup/constants';

interface TabItem {
    label: string
    content: ReactNode
    icon?: ReactNode // Optional icon for each tab
    disabled?: boolean 
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
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{
                        
                        borderBottom: 0,
                        '.MuiTabs-flexContainer': {gap: '0.5rem'},
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
                            disabled={tab.disabled}
                            style={{ minWidth: 'auto', height: '2.375rem', padding: '0.25rem 0.5rem' }}
                            sx={{
                                gap: '0.5rem',
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
                                },
                                '&:disabled': {
                                    svg: {
                                    color: '#9fa1a2a1'
                                    }
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </>
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
            style={{ gridArea: '2 / 1 / -1 / -1' }}
            role="tabpanel"
            hidden={value !== index}
            className='simple-tabpanel'
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{}}>
                    {children}
                </Box>
            )}
        </div>
    )
}