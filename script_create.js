$(document).on("focus", ".ui-spinner-input", function() {

    $(this).closest(".ui-spinner").addClass("focus_spinner")
});
$(document).on("blur", ".ui-spinner-input", function() {

    $(this).closest(".ui-spinner").removeClass("focus_spinner")
});

// $(document).on("focus", ".listenSpinnerCh", function() {
//     $(this).addClass("borderSpinner")
// $(this).closest(".option_metka").find(".bbs__txt").addClass("redTextSpinner")
// });
// $(document).on("blur", ".listenSpinnerCh", function() {
//     $(this).removeClass("borderSpinner")
// $(this).closest(".option_metka").find(".bbs__txt").removeClass("redTextSpinner")
// });
$('#widget_spinner_settings').find('.listenSpinnerCh').on('change', function (e) {
    var $changed = $(e.target);
    var spinnerId = $('.item_selected .ui-spinner-input').attr('id');
    var $spinnerWidg = $('#' + spinnerId).spinner();
    if ($changed.attr('name') == 'spinnerTextAlign') {
        $('#' + spinnerId).css('text-align', $changed.val())
    }
    else {
        switch ($changed.attr('id')) {
            case 'enableSpinner':
                if ($changed.is(':checked')) {
                    $spinnerWidg.spinner("enable");
                } else {
                    $spinnerWidg.spinner("disable");
                }
                break;
            case 'spinnerValue':
                $spinnerWidg.spinner('value', parseInt($changed.val()));
                break;
            case 'spinnerMax':
                $spinnerWidg.spinner("option", "max", $changed.val());
                break;
            case 'spinnerMin':
                $spinnerWidg.spinner("option", "min", $changed.val());
                break;
            case 'spinnerStep':
                $spinnerWidg.spinner("option", "step", $changed.val());
                break;
            case 'spinnerOverflow':

                if ($changed.is(':checked')) {

                    $spinnerWidg.spinner({
                        spin: function (event, ui) {
                            if (ui.value == parseInt($(this).spinner("option", "min"))) {
                                $(this).spinner("value", parseInt($(this).spinner("option", "max")));
                                return false;
                            }
                            if (ui.value == parseInt($(this).spinner("option", "max"))) {
                                $(this).spinner("value", $(this).spinner("option", "min"));
                                return false;
                            }
                        }
                    })
                }
                else {
                    $spinnerWidg.spinner({
                        spin: function () {
                        }
                    })
                }
                break;
            case 'spinnerIcon':

                $spinnerWidg.spinner("option", "icons", {
                    down: ($changed.val()+ "down"),
                    up: ($changed.val() + "up")
                });
                break;
            case 'spinnerHeight':
                $('#' + spinnerId).closest('span').css('height', $changed.val() + '%');
                break;
            case 'spinnerWidth':
                $('#' + spinnerId).closest('span').css('width', $changed.val() + '%');
                break;

        }
    }
});
function saveBlockSpinner() {
    blocksWidget[currentBlockId] = {
        type: 'spinner',
        settings: {
            disabled: !$('#enableSpinner').prop('checked'),
            value: $('#spinnerValue').val(),
            min: $('#spinnerMax').val(),
            max: $('#spinnerMin').val(),
            step: $('#spinnerStep').val(),
            overflow: $('#spinnerOverflow').prop('checked'),
            control: $('#spinnerIcon').val(),
            align: $('input[name="spinnerTextAlign"]:checked').val(),
            width: $('#spinnerWidth').val(),
            height: $('#spinnerHeight').val()
        }
    };

    console.log(blocksWidget[currentBlockId]);
    setBlockWidget(currentBlockId, blocksWidget[currentBlockId])
}
function refreshSpinnerSet() {
    var id = currentBlockId;
    $('.spinnerBlockSettings input').prop('checked', false);
    if (blocksWidget.hasOwnProperty(id)) {
        $('#enableSpinner').prop('checked', !blocksWidget[currentBlockId].settings.disabled);
        $('#spinnerValue').attr('value', blocksWidget[id].settings.value);
        $('#spinnerMax').attr('value', blocksWidget[id].settings.max);
        $('#spinnerMin').attr('value', blocksWidget[id].settings.min);
        $('#spinnerStep').attr('value', blocksWidget[id].settings.step);
        $('#spinnerOverflow').prop('checked', blocksWidget[currentBlockId].settings.overflow);
        $('#spinnerIcon').attr('value', blocksWidget[id].settings.control);
        $('input[name="spinnerTextAlign"][value="' + blocksWidget[id].settings.align + '"]').prop('checked', true);
        $('#spinnerHeight').attr('value', blocksWidget[id].settings.height);
        $('#spinnerWidth').attr('value', blocksWidget[id].settings.width);
        initWidget(id);
    }
}


//============== widget Spinner END===============
var timerId
var keyeditor
$(document).on("keyup", ".editorAccordion", function(){
    var width=$(".item_selected").find(".akkord_menu").find(".ui-accordion-header")
    for(var i=0; i<$(".item_selected").find(".ui-accordion-header").length; i++){
        $(width[i]).width(""+ $(width[i]).find(".editorAccordion").width()+"px")
    }

    console.log( $(this).closest(".ui-accordion-header").width())

})


$(document).on("mousedown", ".ui-resizable-sw", function(){

    timerId = setInterval (function() {
        var width=$(".ui-resizable-resizing").find(".akkord_menu").find(".ui-accordion-header")
        console.log($(width[2]).width())

        for(var i=0; i<$(".ui-resizable-resizing").find(".ui-accordion-header").length; i++){
            $(width[i]).width(""+ $(width[i]).find(".editorAccordion").innerWidth()+"px")
        }
    }, 10)
})
$(document).on("mouseup", ".ui-resizable-sw", function(){
    clearInterval(timerId)
})
$(document).on("mousedown", ".ui-resizable-se", function(){
    timerId = setInterval (function() {
        var width=$(".ui-resizable-resizing").find(".akkord_menu").find(".ui-accordion-header")

        for(var i=0; i<$(".ui-resizable-resizing").find(".ui-accordion-header").length; i++){
            $(width[i]).width(""+ $(width[i]).find(".editorAccordion").innerWidth()+"px")
        }
    }, 10)
})
$(document).on("mouseup", ".ui-resizable-se", function(){
    clearInterval(timerId)
})

function toggleGridEditable(obj) {

    var $select = $(".item_selected")
    var currentBlockId = $select.attr("data-itemid")
    var $accordion = $("#accordion" + currentBlockId + "");


    var id = $(obj).attr("id")



    $(obj).toggleClass("activEditor")

    if ($(obj).hasClass("activEditor")) {
        $(obj).closest(".section_wrapper").find(".editorAccordion").attr("contenteditable", true)
        $(obj).closest(".section_wrapper").find(".editorAccordion").addClass("enableEdit")
        /*$(obj).closest(".section_wrapper").find(".editorAccordion").css("width", "auto")*/
        $accordion.sortable("disable");

        $(obj).css("color", "green")
        $('#work_space').data('gridstack').movable($('.item_selected'))
        $('#work_space').data('gridstack').resizable($('.item_selected'));
    }
    else {
        $(obj).closest(".section_wrapper").find(".editorAccordion").attr("contenteditable", false)
        $accordion.sortable("enable")

        $(obj).css("color", "red")
        $('#work_space').gridstack().data('gridstack').enable()
        $(obj).closest(".section_wrapper").find(".editorAccordion").removeClass("enableEdit")
    }
    console.log($($('.item_selected')[0]))
    /*$('#work_space').gridstack().data('gridstack').disable() */
    /*$('#work_space').data('gridstack').disable($('.item_selected'))*/

    /*$('#work_space').gridstack().data('gridstack').disable()*/

    // clear any active button if set before

    // tag a new button
    $(obj).toggleClass("down");


    console.log("grid stack movable");
}
/*
 $(document).on("click", ".redactorAccordion", function(){
 alert("ggggg")
 var $select=$(this).closest(".item_selected")
 var currentBlockId= $select.attr("data-itemid")
 alert(currentBlockId)
 var $accordion = $("#accordion" + currentBlockId+"");
 $accordion.sortable( "disable" )

 $('.grid-stack').data('gridstack').movable('.item_selected', $(this).hasClass("down") )
 $('.grid-stack').data('gridstack').resizable('.item_selected', $(this).hasClass("down"));
 $(this).toggleClass("down")
 })
 */
$.ui.accordion.prototype._originalKeyDown = $.ui.accordion.prototype._keydown;

$.ui.accordion.prototype._keydown = function (event) {
    var keyCode = $.ui.keyCode;
    if (event.keyCode == keyCode.SPACE || event.keyCode == keyCode.ENTER) {
        return;
    }
    this._originalKeyDown(event);
}

$(document).on("click", ".widget_control", function () {
    var $select = $(".item_selected")
    var currentBlockId = $select.attr("data-itemid")
    var $tabs = $("#tabs" + currentBlockId + "");
    $(this).toggleClass("activEditor")
    var label = $(this).closest(".ui-tabs-tab").attr("aria-controls")
    $tabs.tabs().find('.ui-tabs-nav li').off('keydown')
    if ($(this).hasClass("activEditor")) {
        $(this).closest(".ui-tabs-tab").find(".ui-tabs-anchor").attr("contenteditable", true)
        $tabs.find("ul").sortable("disable");

        $("#" + label + "").attr("contenteditable", true)
        $(this).css("color", "green")
        $(this).closest(".section_wrapper").find(".ui-tabs-anchor").addClass("enableEdit")
    }
    else {
        $(this).closest(".ui-tabs-tab").find(".ui-tabs-anchor").attr("contenteditable", false)
        $("#" + label + "").attr("contenteditable", false)
        $tabs.find("ul").sortable("enable")
        $(this).css("color", "red")
        $(this).closest(".section_wrapper").find(".ui-tabs-anchor").removeClass("enableEdit")
    }
    console.log($($('.item_selected')[0]))
    /*$('#work_space').gridstack().data('gridstack').disable() */
    /*$('#work_space').data('gridstack').disable($('.item_selected'))*/
    $('#work_space').data('gridstack').movable($('.item_selected'))
    $('#work_space').data('gridstack').resizable($('.item_selected'));
    /*$('#work_space').gridstack().data('gridstack').disable()*/

    // clear any active button if set before

    // tag a new button
    $(this).toggleClass("down");
})

function refreshButtonSet() {
    var id = currentBlockId;
    let current = $.find('.item_selected')[0];

    let textX = document.querySelector('#button_text_PosX');
    let textY = document.querySelector('#button_text_PosY');
    let buttonX = document.querySelector('#button_icon_PosX');
    let buttonY = document.querySelector('#button_icon_PosY');

    textX.value = 1;
    textY.value = 1;
    buttonX.value = 1;
    buttonY.value = 1;

    if (!current.children[0].children[0].style['background']) {
        current.children[0].children[0].style['background'] = 'transparent';
        current.children[0].children[0].style['border'] = '3px solid #f04924';
        current.children[0].children[0].style['border-radius'] = '4px';
    }
    else if (current.children[0].children[0].style['background'] != 'red') {
        return
    } else {
        current.children[0].children[0].style['background'] = 'red'
        return
    }


    let workSpace = $.find('#work_space');

    for (let i = 0; i < workSpace[0].children.length; i++) {
        let elem = workSpace[0].children[i];

        if( elem.getAttribute('data-itemid') === id) {
            cloneBlock = elem.cloneNode(true)
        }
    }

    initWidget(id);
}



function checkIconTextSelected(elem) {
    let current = $.find('.item_selected')[0];
    let toolText = $.find('.button-tools')[0];
    let toolIcon = $.find('.button-tools')[1];


    if (elem === 'text') {
        if (toolText.classList[3] === undefined) {
            current.children[0].children[0].children[0].children[1].children[1].style['display'] = 'block';
            return
        }

        if (toolIcon.classList[3] != undefined) {
            current.children[0].children[0].children[0].children[1].children[1].style['display'] = 'none';
            return
        }

        return
    } else {
        if (toolIcon.classList[3] === undefined) {
            current.children[0].children[0].children[0].children[1].children[0].style['display'] = 'block';
            return
        }

        if (toolText.classList[3] != undefined) {
            current.children[0].children[0].children[0].children[1].children[0].style['display'] = 'none';
            return
        }
    }

}

function selectButtonType(index) {
    switch (index) {
        case 0:
            $.find('.button-icon')[0].classList = 'fa fa-check-square-o button-icon';
            break;
        case 1:
            $.find('.button-icon')[0].classList = 'fa fa-plus button-icon';
            break;
        case 2:
            $.find('.button-icon')[0].classList = 'fa fa-trash-o button-icon';
            break;
        case 3:
            $.find('.button-icon')[0].classList = 'fa fa-pencil-square-o button-icon';
            break;
        case 4:
            $.find('.button-icon')[0].classList = 'fa fa-commenting-o button-icon';
            break;
        case 5:
            $.find('.button-icon')[0].classList = 'fa fa-phone button-icon';
            break;
    }
}

function saveButtonChanges() {
    var selected = $('.item_selected');

    $('#widget_button_settings').css('display', 'none');
    $('#tree_window').css('display', 'block');
}


function cancelButtonChanges() {
    var selected = $('.item_selected');

    $('#widget_button_settings').css('display', 'none');
    $('#tree_window').css('display', 'block');

    selected.innerHTML =  cloneBlock;
}



$(document).on("mouseover", ".button-block", (t) => {
    if (t.target.classList[1] != 'fa-link') {
    let current = $.find('.item_selected')[0];
    current.querySelector('.ui-button-item-wrapper').style['display'] = 'block'
    return
}
return

})

$(document).on("mouseout", ".button-block", (t) => {
    if (t.target.classList[1] != 'fa-link') {
    setTimeout(function() {
        let current = $.find('.item_selected')[0];
        current.querySelector('.ui-button-item-wrapper').style['display'] = 'none'
    }, 500);
    return
}
return
})


$('#widget_button_settings').on('change', '.listen_text', function (e) {
    var $targ = $(e.target);

    let current = $.find('.item_selected')[0];
    $elem = current.querySelector('.button_header');


    if ($targ.attr('id') === 'button_text_PosX' || $targ.attr('id') === 'button_text_PosX_unit') {
        $elem.style['margin-left'] = $('#button_text_PosX').val() + $('#button_text_PosX_unit').val();
    }
    else if ($targ.attr('id') === 'button_text_PosY' || $targ.attr('id') === 'button_text_PosY_unit') {
        $elem.style['margin-top'] = $('#button_text_PosY').val() + $('#button_text_PosY_unit').val();
    }
})

$('#widget_button_settings').on('change', '.listen_button_icon', function (e) {
    var $targ = $(e.target);

    let current = $.find('.item_selected')[0];
    $elem = current.querySelector('.button-icon');

    if ($targ.attr('id') === 'button_icon_PosX' || $targ.attr('id') === 'button_icon_PosX_unit') {
        $elem.style['margin-left'] = $('#button_icon_PosX').val() + $('#button_icon_PosX_unit').val();

    }
    else if ($targ.attr('id') === 'button_icon_PosY' || $targ.attr('id') === 'button_icon_PosY_unit') {
        $elem.style['margin-top'] = $('#button_icon_PosY').val() + $('#button_icon_PosY_unit').val();
    }
})