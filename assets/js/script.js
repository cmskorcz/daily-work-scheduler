let $currentDay = $('#currentDay');
let $container = $('.container');
let hourCounter = 9;

const generateSchedule = () => {

    while(hourCounter < 18) {
        let $row = $('<div>').addClass('row time-block');
        let $time = $('<div>').addClass('col-2 hour');
        let $task = $('<div>').addClass('col-8 description');
        let $save = $('<button>').addClass('col-2 saveBtn').html('<i class="fas fa-save"></i>');
    
        $time
        .text(moment({hour:hourCounter}).format('hA'));

        $row.append($time, $task, $save);
        $container.append($row);

        hourCounter++;
    }
}

const checkSchedule = () => {
    
}


$currentDay.text(moment().format('dddd, MMMM Do'));
generateSchedule();