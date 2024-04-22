class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }

        return calorieLimit
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit)
    }
    static getTotalcalories(defaultCalories) {
        let TotalCalories;
        if (localStorage.getItem('TotalCalories') === null) {
            TotalCalories = defaultCalories
        } else {
            TotalCalories = +localStorage.getItem('TotalCalories');
        }

        return TotalCalories
    }

    static UpdateTotalCalories(calories) {

        localStorage.setItem('TotalCalories', calories)
    }



    static getMeals() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = []
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }

        return meals
    }


    static saveMeals(meal) {
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals))
    }

    static removeMeal(id) {
        const meals = Storage.getMeals();

        meals.forEach((meal, index) => {
            if (meal.id === id) {

                meals.splice(index, 1)

            }
        });
        localStorage.setItem('meals', JSON.stringify(meals))
    }




    static getWorkOuts() {
        let workout;
        if (localStorage.getItem('workouts') === null) {
            workout = []
        } else {
            workout = JSON.parse(localStorage.getItem('workouts'));

        }

        return workout
    }


    static saveWorkouts(workout) {
        const workouts = Storage.getWorkOuts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts))
    }

    static removeWorkout(id) {
        const workouts = Storage.getMeals();

        workouts.forEach((wotkout, index) => {
            if (wotkout.id === id) {

                workouts.splice(index, 1)


            }
        });
        localStorage.setItem('workouts', JSON.stringify(workouts))
    }

    static clearAll() {


        localStorage.clear();

    }
}

export default Storage