/*global $,irApp */

irApp.InitDevices({
    avr: {
        dvcId: 0,
        name: "AVR",
        commands: {
            POWER: {cmdId: 0},
            POWER_ON: {cmdId: 1},
            POWER_OFF: {cmdId: 2},
            MASTER_VOL_UP: {cmdId: 3},
            MASTER_VOL_DOWN: {cmdId: 4},
            ZONE2_VOL_UP: {cmdId: 5},
            ZONE2_VOL_DOWN: {cmdId: 6},
            INPUT_PHONO: {cmdId: 7},
            INPUT_CD: {cmdId: 8},
            ZONE2_PHONO: {cmdId: 9},
            ZONE2_CD: {cmdId: 10},
            MUTE:  {cmdId: 11}
        }
    },
    cd: {
        dvcId: 1,
        name: "CD",
        commands: {
            POWER: {cmdId: 0},
            PLAY: {cmdId: 1},
            PAUSE: {cmdId: 2},
            STOP: {cmdId: 3},
            PREVIOUS: {cmdId: 4},
            NEXT: {cmdId: 5}
        }
    },
    tv: {
        dvcId: 2,
        name: "TV",
        commands: {
            POWER: {cmdId: 0},
            VOL_UP: {cmdId: 1},
            VOL_DOWN: {cmdId: 2},
            MUTE: {cmdId: 3}
        }
    },
    stb: {
        dvcId: 3,
        name: "STB",
        commands: {
            POWER: {cmdId: 0},
            CHANNEL_UP: {cmdId: 1},
            CHANNEL_DOWN: {cmdId: 2}
        }
    },
    hdmi: {
        dvcId: 4,
        name: "HDMI",
        commands: {
            POWER: {cmdId: 0},
            SWITCH_1: {cmdId: 1},
            SWITCH_2: {cmdId: 2},
            SWITCH_3: {cmdId: 3},
            SWITCH_4: {cmdId: 4}
        }
    }
});

var devices = irApp.devices(),
    avr = devices.avr,
    tv = devices.tv,
    stb = devices.stb,
    cd = devices.cd;

(function (buttons) {
    'use strict';
    console.log(buttons);

    var elButtonList = document.getElementById("buttonList");

    buttons.forEach(function (button) {
        var span = document.createElement("span");
        span.textContent = button.label;

        var itm = document.createElement("li");
        itm.setAttribute("data-display", button.command.dvcName + " : " + button.command.name);

        if (button.isPower) {
            itm.classList = "button power";
        } else {
            itm.className = "button";
        }
        itm.data = button.command.data;

        itm.appendChild(span);
        elButtonList.appendChild(itm);
    });

    $('.button').on('click', function (e) {
        $('.display').text(this.getAttribute("data-display"));

        console.log(this.data);
        $.ajax({
            type: "POST",
            url: "/api",
            data: JSON.stringify(this.data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });

        setTimeout(function () {
            $('.display').text('');
        }, 500);
    });
}([
    {
        command: avr.commands.POWER,
        isPower: true,
        label: "AVR"
    },
    {
        command: cd.commands.POWER,
        isPower: true,
        label: "CD"
    },
    {
        command: tv.commands.POWER,
        isPower: true,
        label: "TV"
    },
    {
        command: stb.commands.POWER,
        isPower: true,
        label: "STB"
    },
    {
        command: avr.commands.MUTE,
        label: "MUTE"
    },
    {
        command: avr.commands.MASTER_VOL_UP,
        label: "VOL +"
    },
    {
        command: avr.commands.MASTER_VOL_DOWN,
        label: "VOL -"
    },
    {
        command: avr.commands.ZONE2_VOL_UP,
        label: "VOL +"
    },
    {
        command: avr.commands.ZONE2_VOL_DOWN,
        label: "VOL -"
    },
    {
        command: cd.commands.PLAY,
        label: "PLAY"
    },
    {
        command: cd.commands.PAUSE,
        label: "PAUSE"
    },
    {
        command: cd.commands.STOP,
        label: "STOP"
    },
    {
        command: cd.commands.PREVIOUS,
        label: "PREV"
    },
    {
        command: cd.commands.NEXT,
        label: "NEXT"
    },
    {
        command: tv.commands.VOL_UP,
        label: "VOL +"
    },
    {
        command: tv.commands.VOL_DOWN,
        label: "VOL -"
    },
    {
        command: tv.commands.MUTE,
        label: "MUTE"
    },
    {
        command: stb.commands.CHANNEL_UP,
        label: "CH +"
    },
    {
        command: stb.commands.CHANNEL_DOWN,
        label: "CH -"
    }
]));