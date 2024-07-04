import React, { useState } from 'react';
import {
  List, ListItem, ListItemText, ListItemIcon, Collapse, Checkbox
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import departmentData from '../departmentData.json';

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleExpandClick = (department: string) => {
    setExpanded(expanded === department ? false : department);
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleDepartmentToggle = (department: string, subDepartments: string[]) => {
    const isDepartmentSelected = selected.includes(department);

    let newSelected: string[] = [];

    if (isDepartmentSelected) {
      newSelected = selected.filter((dep) => dep !== department && !subDepartments.includes(dep));
    } else {
      newSelected = [...selected, department, ...subDepartments];
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departmentData.map((department) => (
        <React.Fragment key={department.department}>
          <ListItem onClick={() => handleExpandClick(department.department)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.includes(department.department) || department.sub_departments.every((sub) => selected.includes(sub))}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': department.department }}
                onChange={() => handleDepartmentToggle(department.department, department.sub_departments)}
              />
            </ListItemIcon>
            <ListItemText primary={department.department.replace('_', ' ')} />
            {expanded === department.department ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded === department.department} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((sub) => (
                <ListItem key={sub} onClick={handleToggle(sub)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected.includes(sub)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': sub }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub.replace('_', ' ')} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
