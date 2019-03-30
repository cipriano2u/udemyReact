import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// create javascript object for prices. Global vairables should be in caps
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7,
}

// stateFull function, starts with uppercase letter
// build a class based component
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        // set burger base price
        totalPrice: 4,
        purchasable : false,
        purchasing : false
    }

    // method to check wheather to turn purchasable to true or false
    uodatePurchaseState (ingredients) {
        // const ingredients = {
            // create new object to create copy of state ingredients
        //     ...this.state.ingredients

        // };
        // create strings entries (salad, bacon, ) of the sum of ingedients, take keys and pass ingredients to it
        const sum = Object.keys(ingredients)
        // map into the array we need, map method recieves the key 
            .map(igKey => {
                // returnd an array of the amount value
                return ingredients[igKey];
            })
            // flatten array and turn into a single number: the sum of all ingredients.
            // get new sum and indiviual element, one executed on all array elments, sum is final result.
            .reduce((sum, el) => {
                // return current sum + element value
                return sum + el;

            }, 0);
            this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // since state must me updated in an immutable way,
        // therefore create new JS6 using the spread operator ...
        // to distribute the properties of the old ingredients state 
        // into the new ingredient state
        // call this set state to update ingredients  
        // update ingredients
        const updatedIngredients =  {
            ...this.state.ingredients
        };
        // update the prices
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.uodatePurchaseState(updatedIngredients);
        
    }

    removeIngredientHandler = (type) =>  {
        const oldCount = this.state.ingredients[type];
        // check to see of there is an existing ingredient tombe removed
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        // since state must me updated in an immutable way,
        // therefore create new JS6 using the spread operator ...
        // to distribute the properties of the old ingredients state 
        // into the new ingredient state
        // call this set state to update ingredients  
        // update ingredients
        const updatedIngredients =  {
            ...this.state.ingredients
        };
        // update the prices
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.uodatePurchaseState(updatedIngredients);
    } 

    purchasedHandler = () => {
        this.setState({purchasing: true});
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchasedContinueHandler = () => {
        alert('You continue!');
    }


    render () {
        // non display less ingredients buttons
        // create object to immutably ... distrubute  (copy from) state  ingredients
        const disabledInfo = {
            ...this.state.ingredients
        };
        // loop through all the keys in the disabledInfo array, and check if 0 or less. key contains the value.
        // then pass disabledInfor to buildControls below
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, etc. }
          return (
             <Aux>
                 <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>  
                     <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchasedCancelHandler}
                        purchasedContinued={this.purchasedContinueHandler}           
                        />
                 </Modal>
                 
                 <Burger ingredients={this.state.ingredients}/>
                 <BuildControls 
                     ingredientAdded={this.addIngredientHandler} 
                     ingredientRemoved={this.removeIngredientHandler}
                     disabled={disabledInfo}
                     purchasable={this.state.purchasable}
                     ordered={this.purchasedHandler}
                     price={this.state.totalPrice}              
                     />
             </Aux>   
          );
    }
};

export default BurgerBuilder;
