import React, {useEffect, useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";


const Menu = ({data}) => {
    const [menu, setMenu] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [areAllExpanded, setAreAllExpanded] = useState(false);
    const [allExpandableNodes, setAllExpandableNodes] = useState([]);

    let getAllNodes = [];

    useEffect(() => {
        setMenu(data);
        takeAllExpandableNodes(data);
    }, []);

    useEffect(() => {
        if (allExpandableNodes.length > 1)
            setAreAllExpanded(expanded.toString() === allExpandableNodes.toString());
    }, [expanded]);

    const displayTree =(jsonData) => {
        let newMenu = null;
        newMenu = jsonData.map((branch, index) => {
            return (
                <TreeItem nodeId={branch.id} label={branch.label} key={index}>
                    {branch.children ? newMenu = (displayTree(branch.children)) : null}
                </TreeItem>
            );
        });
        return newMenu;
    };

    const handleChange = (event, nodes) => {
        nodes.sort();
        setExpanded(nodes);
    };

    const takeAllExpandableNodes = (nodes) => {
        nodes.map((branch) => {
            if (branch.id && branch.children.length > 0)
                getAllNodes.push(branch.id);
            if (branch.children)
                takeAllExpandableNodes(branch.children)
        });
        setAllExpandableNodes(getAllNodes.sort());
    };

    const toggleExpandCollapseAll = (areAllExpanded) => {
        !areAllExpanded ? setExpanded(allExpandableNodes) : setExpanded([])
    };

    return (
        <React.Fragment>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                onNodeToggle={handleChange}
                expanded={expanded}
            >
                {displayTree(menu)}
            </TreeView>
            <Button variant="contained" color="secondary" className="btn"
                    onClick={() => toggleExpandCollapseAll(areAllExpanded)}>
                {!areAllExpanded ? "Expand All" : "Collapse All"}
            </Button>
        </React.Fragment>
    );

};

export default Menu;