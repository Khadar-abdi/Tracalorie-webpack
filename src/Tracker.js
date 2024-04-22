import Storage from "./Storage";

class calorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalcalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkOuts();

        this._displayCalorieslimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesburned();
        this._displayCaloriesremaining();
        this._displayCaloriesprogress();

        document.getElementById('limit').value = this._calorieLimit;
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.UpdateTotalCalories(this._totalCalories)
        Storage.saveMeals(meal);
        this._displayNewMeal(meal);
        this._render()
    }
    addWorkOut(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.UpdateTotalCalories(this._totalCalories)
        Storage.saveWorkouts(workout);
        this._displayNewWorkOut(workout);
        this._render()
    }
    _removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id)

        if (index !== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories
            Storage.UpdateTotalCalories(this._totalCalories)
            this._meals.splice(index, 1);
            Storage.removeMeal(id);
            this._render();
        }

    }
    _removeWorkout(id) {
        const index = this._workouts.findIndex((workOut) => workOut.id === id)

        if (index !== -1) {
            const workOut = this._workouts[index];
            this._totalCalories -= workOut.calories
            Storage.UpdateTotalCalories(this._totalCalories)
            this._workouts.splice(index, 1);
            Storage.removeWorkout(id)
            this._render();
        }

    }

    _reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }
    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit)
        this._displayCalorieslimit();
        this._render()
    }

    loadItems() {
        this._meals.forEach(item => this._displayNewMeal(item))
        this._workouts.forEach(item => this._displayNewWorkOut(item))
    }
    _displayCaloriesTotal() {

        const caloriesTotalel = document.getElementById('calories-total');
        caloriesTotalel.innerHTML = this._totalCalories
    }
    _displayCalorieslimit() {

        const calorieslimitel = document.getElementById('calories-limit');

        calorieslimitel.innerHTML = this._calorieLimit
    }
    _displayCaloriesConsumed() {

        const caloriesconsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) =>
            total + meal.calories, 0);

        caloriesconsumedEl.innerHTML = consumed

    }
    _displayCaloriesburned() {

        const caloriesburnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workOut) =>
            total + workOut.calories, 0);

        caloriesburnedEl.innerHTML = burned

    }
    _displayCaloriesprogress() {
        const caloriesprogress = document.getElementById('calorie-progress');

        const percentage = (this._totalCalories / this._calorieLimit) * 100;

        const width = Math.min(percentage)

        caloriesprogress.style.width = `${percentage}%`

    }
    _displayCaloriesremaining() {

        const caloriesremainingEl = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories
        caloriesremainingEl.innerHTML = remaining
        const caloriesprogress = document.getElementById('calorie-progress');

        if (remaining <= 0) {
            caloriesremainingEl.parentElement.parentElement.classList.add('bg-danger')
            caloriesremainingEl.parentElement.parentElement.classList.remove('bg-light')
            caloriesprogress.classList.remove('bg-success')
            caloriesprogress.classList.add('bg-danger')
        } else {
            caloriesremainingEl.parentElement.parentElement.classList.add('bg-light')
            caloriesremainingEl.parentElement.parentElement.classList.remove('bg-danger')
            caloriesprogress.classList.remove('bg-danger')
            caloriesprogress.classList.add('bg-success')
        }
    }

    _displayNewMeal(meal) {
        const mealsEl = document.getElementById('meal-items')
        const mealEL = document.createElement('div')
        mealEL.classList.add('card', 'my-2')
        mealEL.setAttribute('data-id', meal.id)
        mealEL.innerHTML = `
        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="mx-1">${meal.name}</h4>
                                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                                ${meal.calories}
                                </div>
                                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark">  </i>
                  </button>
                            </div>
                        </div>
        `

        mealsEl.appendChild(mealEL)

    }
    _displayNewWorkOut(workout) {
        const workOutsEl = document.getElementById('workout-items')
        const workOutEl = document.createElement('div')
        workOutEl.classList.add('card', 'my-2')
        workOutEl.setAttribute('data-id', workout.id)
        workOutEl.innerHTML = `
        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="mx-1">${workout.name}</h4>
                                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                                ${workout.calories}
                                </div>
                                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"> </i>
                  </button>
                            </div>
                        </div>
        `

        workOutsEl.appendChild(workOutEl)

    }


    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesburned();
        this._displayCaloriesremaining();
        this._displayCaloriesprogress();

    }
}


export default calorieTracker;