import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
 


const orderSummary = (props) => {
           {/* map into a list of ingredients , transform into and array of keys  */}
                  {/* map into an array of jsx elements */ }
    const ingredientSummary = Object.keys( props.ingredients )

         .map(igKey => {
            return (
                <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                );
         });

            return (
            <Aux>
                <h3>Your order</h3>  
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchasedContinued}>CONTINUE</Button>
            </Aux>
            );
        };

export default orderSummary;