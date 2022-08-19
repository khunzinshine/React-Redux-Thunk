import React from "react";
import { Icon, Card} from "semantic-ui-react";


const CardSmall = ({item, onChecked, checked}) => {
    return (
        <>
            <Card name={item.key} onClick={()=>onChecked(item.key)} className={(item.key=== 'index') ? "select-all" : "trxn"}>
                <Card.Content  >
                    <div >
                        {checked && <Icon name="check circle" className="select-check"></Icon>}
                    </div>
                    <div>{item.label}</div>
                </Card.Content>
            </Card>
        </>
       )
}

export default CardSmall