let $currentDay = $('#currentDay');
let $container = $('.container');
let hourCounter = moment().hour(9);

let currentTime = moment().format('H');

let tasks = []

$currentDay.text(moment().format('dddd, MMMM Do'));


if (!localStorage.getItem('schedule')) {
    localStorage.setItem('schedule', JSON.stringify(tasks));
};

// Generates Initial Blocks in Container
const generateSchedule = () => {

    for (let i = 0; i < 9; i++) {

        let milTime = hourCounter.format('H');
        let standTime = hourCounter.format('hA');
    
        let $row = $('<form>')
            .addClass('row time-block')
            .attr('id', `${milTime}`);

        let $time = $('<div>')
            .addClass('col-2 hour')
            .text(standTime);

    // add id of mil-time to each block
        let $task = $('<div>')
            .addClass('col-8 description')
            .attr('id', `${milTime}`)
            .text(populateFields(milTime, i));

        let $save = $('<button>')
            .addClass('col-2 saveBtn')
            .attr('id', `${milTime}`)
            .attr('data-index', `${i}`)
            .html('<i class="fas fa-save"></i>');
    
        $row.append($time, $task, $save);
        $container.append($row);


        hourCounter.add(1, 'h');
    }
    addEvents();
    checkHour();
}

// Check Schedule Hour if past, present, future 
const checkHour = () => {
    $('.description').each(function() {
        if (parseInt($(this).attr('id')) < parseInt(currentTime)) {
            $(this)
                .removeClass('present future')
                .addClass('past')
        } else if (parseInt($(this).attr('id')) === parseInt(currentTime)) {
            $(this)
                .removeClass('past future')
                .addClass('present')
        } else {
            $(this)
                .removeClass('past present')
                .addClass('future')
        }
    });

}


const addEvents = () => {
    // replaces initial div with textarea input on click
    $('.description').on('click', function() {
        let id = $(this).attr('id')
        let index = $(this).attr('data-index')

        $(this).replaceWith($('<input>')
            .addClass('col-8 description')
            .attr('id', id)
            .attr('data-index', index))

        checkHour();
    })
    
    
    $('.saveBtn').on('click', function(event) {
        event.preventDefault();
        let id = $(this).attr('id');
        let index = $(this).attr('data-index');
        let input = $(`input[id="${id}"]`);
        let value = input.val();

        input.replaceWith($('<div>')
            .html(`<p>${value}</p>`)
            .addClass('col-8 description')
            .attr('id', id)
            .attr('data-index', index));        
        
        saveToLocal(index, value);
        checkHour();


    })
}

const populateFields = (hour, index) => {
    let taskStore = localStorage.getItem('schedule');
    let taskArray = JSON.parse(taskStore)

    if (!taskArray[index]) {
        let taskObj = {
            hour: hour,
            value: ''
        }

        taskArray.push(taskObj)
        localStorage.setItem('schedule', JSON.stringify(taskArray))

    } else {

        return taskArray[index].value

    }
}

const saveToLocal = (index, value) => {
    let taskStore = localStorage.getItem('schedule');
    let taskArray = JSON.parse(taskStore);

    if (value) {

        taskArray[index].value = value;
        
        localStorage.setItem('schedule', JSON.stringify(taskArray));
    }
}

generateSchedule();
setInterval(checkHour(), (30*60*1000));
