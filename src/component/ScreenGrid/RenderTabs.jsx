import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Input from "../Input";

const RenderTabs = ({ lineDetailFieldConfig, lineDetailData, onDataChange }) => {
  const tabKeys = Object.keys(lineDetailFieldConfig);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);

  const handleChange = (_, newValue) => setActiveTab(newValue);
  
  const handleInputChange = (fieldId, value) => {
    if (onDataChange) {
      onDataChange(fieldId, value);
    }
  };

  return (
    <Box style={{ width: "100%" }}>
      <Tabs value={activeTab} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="Dynamic Tabs">
        {tabKeys.map((groupKey) => (
          <Tab key={groupKey} value={groupKey} label={groupKey} />
        ))}
      </Tabs>
      {/* Tab Pannels */}
      <Box sx={{ my: 5, paddingLeft: "120px" }}>
        {tabKeys.map((groupKey) =>
          activeTab === groupKey ? (
            <div key={groupKey}>
              {lineDetailFieldConfig[groupKey].map((field, index) => (                
                <div key={field.fieldid || index}>
                  <Input
                    fieldid={field.fieldid}
                    value={lineDetailData[field.fieldid] || ""}
                    onChange={(value) => handleInputChange(field.fieldid, value)}
                  />
                </div>
              ))}
            </div>
          ) : null
        )}
      </Box>
    </Box>
  );
};

export default RenderTabs;
