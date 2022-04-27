let $currentDay = $('#currentDay');
let $container = $('.container');
let hourCounter = moment().hour(9);

let currentTime = moment().format('H');

$currentDay.text(moment().format('dddd, MMMM Do'));



// Generates Initial Blocks in Container
const generateSchedule = () => {

    for (let i = 0; i < 9; i++) {
        let $row = $('<div>')
            .addClass('row time-block');

        let $time = $('<div>')
            .addClass('col-2 hour')
            .text(hourCounter.format('hA'));

    // add id of mil-time to each block
        let $task = $('<div>')
            .addClass('col-8 description')
            .attr('id', `${hourCounter.format('H')}`);

        let $save = $('<button>')
            .addClass('col-2 saveBtn')
            .html('<i class="fas fa-save"></i>');
    
        $row.append($time, $task, $save);
        $container.append($row);

        hourCounter.add(1, 'h');
    }

    checkHour();
}

// Check Schedule Hour if past, present, future 
const checkHour = () => {
    $('.description').each(function() {
        if (parseInt($(this).attr('id')) < parseInt(currentTime)) {
            $(this).addClass('past')
        } else if (parseInt($(this).attr('id')) === parseInt(currentTime)) {
            $(this).addClass('present')
        } else {
            $(this).addClass('future')
        }
    });

    console.log('checked time')
}

generateSchedule();
setInterval(checkHour, (30*60*1000));
