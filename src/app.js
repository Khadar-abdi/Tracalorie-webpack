import calorieTracker from './Tracker';
import { meal, workOut } from './Item'

import { modal, Collapse } from 'bootstrap'
import '@fortawesome/fontawesome-free/js/all'
import './css/bootstrap.css';
import './css/style.css'




class App {
    constructor() {
        this._tracker = new calorieTracker();
        this._loadEventlisenners();
        this._tracker.loadItems()

    }


    _loadEventlisenners() {
        document
            .getElementById('meal-form')
            .addEventListener('submit', this._newItem.bind(this, 'meal'));
        document
            .getElementById('workout-form')
            .addEventListener('submit', this._newItem.bind(this, 'workout'));
        document
            .getElementById('meal-items')
            .addEventListener('click', this._removeitem.bind(this, 'meal'));
        document
            .getElementById('workout-items')
            .addEventListener('click', this._removeitem.bind(this, 'workout'));
        document
            .getElementById('filter-meals')
            .addEventListener('keyup', this._filterItem.bind(this, 'meal'));
        document
            .getElementById('filter-workouts')
            .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
        document
            .getElementById('reset')
            .addEventListener('click', this._Reset.bind(this));
        document
            .getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this));
    }


    _newItem(type, e) {
        e.preventDefault();

        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        if (name.value === '' || calories.value === '') {
            alert('Please fill All the fields')
            return;
        }


        if (type === "meal") {

            const Meal = new meal(name.value, +calories.value)
            this._tracker.addMeal(Meal)
        } else {

            const Workout = new workOut(name.value, +calories.value)
            this._tracker.addWorkOut(Workout)
        }

        name.value = ''
        calories.value = ''

        const collapse = document.getElementById(`collapse-${type}`)
        const bscollapse = new Collapse(collapse, {
            toggle: true
        });

    }

    _removeitem(type, e) {

        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if (confirm('Are You sure')) {
                const id = e.target.closest('.card').getAttribute('data-id')
                type === 'meal' ?
                    this._tracker._removeMeal(id) :
                    this._tracker._removeWorkout(id)

                e.target.closest('.card').remove();
            }
        }

    }

    _filterItem(type, e) {

        const text = e.target.value.toLowerCase()

        document.querySelectorAll(`#${type}-items .card`).forEach(item => {

            const name = item.firstElementChild.firstElementChild.textContent;


            if (name.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        });
    }


    _Reset() {
        this._tracker._reset();
        document.getElementById('meal-items').innerHTML = ''
        document.getElementById('workout-items').innerHTML = ''


        document.getElementById('filter-workouts').value = ''
        document.getElementById('filter-meals').value = ''
    }


    _setLimit(e) {

        e.preventDefault();
        const limit = document.getElementById('limit')

        if (limit.value === '') {
            alert('please add a limit')
            return
        }

        this._tracker.setLimit(+limit.value)
        limit.value = ''

        const modelEL = document.getElementById(`limit-modal`)
        const modal = new Collapse(modelEL, );
        modal.hide();
    }
}

const app = new App();