let $currentDay = $('#currentDay');
let $container = $('.container');
let hourCounter = moment().hour(9);

let currentTime = moment().format('H');

$currentDay.text(moment().format('dddd, MMMM Do'));



// Generates Initial Blocks in Container
const generateSchedule = () => {

    for (let i = 0; i < 9; i++) {
        let $row = $('<form>')
            .addClass('row time-block')
            .attr('id', `${hourCounter.format('H')}`);

        let $time = $('<div>')
            .addClass('col-2 hour')
            .text(hourCounter.format('hA'));

    // add id of mil-time to each block
        let $task = $('<div>')
            .addClass('col-8 description')
            .attr('id', `${hourCounter.format('H')}`);

        let $save = $('<button>')
            .addClass('col-2 saveBtn')
            .attr('id', `${hourCounter.format('H')}`)
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

        $(this).replaceWith($('<input>')
            .addClass('col-8 description')
            .attr('id', id))

        checkHour();
    })
    
    
    $('.saveBtn').on('click', function(event) {
        event.preventDefault();
        let id = $(this).attr('id');
        let input = $(`input[id="${id}"]`);
        let value = input.val();

        input.replaceWith($('<div>')
            .html(`<p>${value}</p>`)
            .addClass('col-8 description')
            .attr('id', id));        
        
        checkHour();
    })
}

generateSchedule();
setInterval(checkHour, (30*60*1000));
