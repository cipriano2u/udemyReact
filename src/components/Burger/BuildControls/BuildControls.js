import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { label: 'Salad', type: 'salad'},
   { label: 'Bacon', type: 'bacon'},
   { label: 'Cheese', type: 'cheese'},
   { label: 'Meat', type: 'meat'},  
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
       {/* price, fixed price to 2 decimal places     */}
        <p>Current Price: <strong>$ {props.price.toFixed(2)}</strong></p>
       {/* map the elements of control into an array */}
        {controls.map(ctrl => (
            <BuildControl 
               key={ctrl.label} 
               label={ctrl.label} 
               // create this Es6 function to pass back cntrl type as well as execute ingredientAdded
               added={ () => props.ingredientAdded(ctrl.type)} 
               removed={ () => props.ingredientRemoved(ctrl.type)}
               disabled={props.disabled[ctrl.type]}/>
        ))} 
        <button 
           className={classes.OrderButton}
           disabled={!props.purchasable}
           onClick={props.ordered}>ORDER NOW</button>
    </div>

);



export default buildControls;