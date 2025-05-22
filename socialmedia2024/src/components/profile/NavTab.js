import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const NavTab = () => {
    const tabList = [
        { content: 'Tab 1', panel: 'Nội dung Tab 1' },
        { content: 'Tab 2', panel: 'Nội dung Tab 2' },
        { content: 'Tab 3', panel: 'Nội dung Tab 3' },
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className='flex justify-center mt-4'>
            <div className='w-9/12 bg-white p-4 rounded-lg shadow-md'>
                <Tabs selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
                    <TabList className='flex gap-4 mb-4 border-b-2 border-gray-200'>
                        {tabList.map((tab, index) => (
                            <Tab key={index} className={`px-4 py-2 cursor-pointer rounded-t-lg ${selectedIndex === index ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                                {tab.content}
                            </Tab>
                        ))}
                    </TabList>
                    {tabList.map((tab, index) => (
                        <TabPanel key={index} className='transition-all duration-300'>
                            <p>{tab.panel}</p>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default NavTab;
