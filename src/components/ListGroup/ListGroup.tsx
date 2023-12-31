import { useState } from "react";
import styles from './ListGroup.module.css';
import styled from 'styled-components';

const List = styled.ul`
background-color: #AFEEEE;
border-radius: 5px;
margin-top: 10px;
list-style: none;
`;
interface ListItemProps {
    active: boolean;
}
const ListItem = styled.li<ListItemProps>`
padding: 10px 0;
border-radius: 5px;
background: ${(props) => props.active ? '#ADD8E6' : 'none'}
`;

interface Props {
    items: string[];
    heading: string;

    onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {


    const [selectedIndex, setSelectedIndex] = useState(0);




    return (
        <>
            <h1>{heading}</h1>
            {/* {items.length === 0 ? <p>No item found</p> : null} */}
            {items.length === 0 && <p>No item found</p>}
            <List >
                {items.map((item, index) => (
                    <ListItem
                        active={index === selectedIndex}

                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}>
                        {item}</ListItem >
                ))
                }

            </List >
        </>
    );
}

export default ListGroup;